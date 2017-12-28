
/* этот класс - модель сектора  для построения круговой диограммы */
/* на основе SVG графики                                          */
/* name        - название сектора                                 */
/* r           - радиус сектора                                   */
/* percent     - угол сектора в процентах                         */
/* start_angle - угол начала сектора в процентах                  */
/* center_xy   - абсолютнае координаты центра сектора             */
	var statstic = [
		{name: "Yandex-direct", percent: 40, start_angle: 0, r: 100, center_xy: [120, 120], fill: "rgba(0,0,0,0)", stroke: "rgba(11,238,249,1)", stroke_width: "3px"},
		{name: "Google-analitics", percent: 20, start_angle: 40, r: 100, center_xy: [120, 120], fill: "rgba(0,0,0,0)", stroke: "#FF0000", stroke_width: "3px"},
		{name: "Rotoban", percent: 20, start_angle: 60, r: 100, center_xy: [120, 120], fill: "rgba(0,0,0,0)", stroke: "#FFFF00", stroke_width: "3px"},
		{name: "Others", percent: 20, start_angle: 80, r: 100, center_xy: [120, 120], fill: "rgba(0,0,0,0)", stroke: "#00FF00", stroke_width: "3px"}	
	];
	var statstic_1 = [
		{name: "Yandex-direct", percent: 20, start_angle: 0, r: 100, center_xy: [120, 120], fill: "rgba(11,238,249,1)", stroke: "", stroke_width: ""},
		{name: "Google-analitics", percent: 40, start_angle: 20, r: 100, center_xy: [120, 120], fill: "rgba(255,0,0,1)", stroke: "", stroke_width: ""},
		{name: "Rotoban", percent: 20, start_angle: 60, r: 100, center_xy: [120, 120], fill: "rgba(255,255,0,1)", stroke: "", stroke_width: ""},
		{name: "Others", percent: 20, start_angle: 80, r: 100, center_xy: [120, 120], fill: "rgba(0,255,0,1)", stroke: "", stroke_width: ""}	
	];
	class Sector extends EventEmitter{
		constructor( data ){	
			super();
			
			this.prop = this.iniProp( data ); //формируем свойства сектора
		}
		
		/*------------------------------------------------------------------------*/
		/* этот метод инициализирует массив начальных свойств сектора             */
		iniProp( data ){
			if( !this.prop ){
				this.prop = {};
			}
			for( var key in data ){
				this.prop[key] = data[key];
			}
			this.prop["scal_factors"] = [0.4, 0.4, 1.2]; //коэффициенты масштабирования координат якорных точек для привязки справочной информации
			this.prop["n_points"] = 6; //количество опорных точек модели сектора
			this.prop["arc_data"] = this.getPointsOfSector(this.prop["arc_data"]).init(); //абсолютные координаты модели сектора
			this.prop["arc_shadow"] = this.getPointsOfSector(this.prop["arc_shadow"]).init();  //абсолютные координаты дуги тени сектора
									
			return this.prop;
		}
		
		/*----------------------------------------------------------------------  */
		/* этот метод расчитывает абсолютные координаты модели сектора            */
		getPointsOfSector( arc_data, axis_direction = [1,-1] ){
			if( !arc_data ){
				arc_data = [0,0,0,0,0,0,0,0,0,0,0,0];
			}
			
			return {
				init: initCoordinates.bind(this), //инициализируем модель
				move: getCoordinates.bind(this),   //смещаем модель в плоскости
				angle: changeAngle.bind(this)     //изменяем угол наклона выносной стрелки
			}
			/* этот метод расчитывает началтные абсолютные координаты модели */			
			function initCoordinates(){
				arc_data.forEach( callBack.bind(this) );
				function callBack( value, i, data ){
					if( i < 2 ){ //абсолютные координаты центра сектора
						if( !(i%2) ){
							data[0] = this.prop.center_xy[0]; 
						}else{
							data[1] = this.prop.center_xy[1]; 
						}
					}else if( i < 4 ){ //абсолютные координаты начала дуги сектора
						if( !(i%2) ){
							data[2] = Math.round( this.prop.center_xy[0] + axis_direction[0] * this.prop.r * Math.sin( Math.PI * this.prop.start_angle / 50 ) ); 
						}else{
							data[3] = Math.round( this.prop.center_xy[1] + axis_direction[1] * this.prop.r * Math.cos( Math.PI * this.prop.start_angle / 50 ) ); 
						}
					}else if( i < 6 ){ //абсолютные координаты конца дуги сектора
						if( !(i%2) ){
							data[4] = Math.round( this.prop.center_xy[0] + axis_direction[0] * this.prop.r * Math.sin( Math.PI * (this.prop.start_angle + this.prop.percent) / 50 ) ); 
						}else{
							data[5] = Math.round( this.prop.center_xy[1] + axis_direction[1] * this.prop.r * Math.cos( Math.PI * (this.prop.start_angle + this.prop.percent) / 50 ) ); 
						}
					}else if( i < 8 ){ //абсолютные координаты точки привязки вывода комментария
						if( !(i%2) ){
							data[6] = Math.round( this.prop.center_xy[0] + axis_direction[0] * this.prop.scal_factors[0] * this.prop.r * Math.sin( Math.PI * (this.prop.start_angle + this.prop.percent/2) / 50 ) ); 
						}else{
							data[7] = Math.round( this.prop.center_xy[1] + axis_direction[1] * this.prop.scal_factors[0] * this.prop.r * Math.cos( Math.PI * (this.prop.start_angle + this.prop.percent/2) / 50 ) ); 
						}
					}else if( i < 10 ){ //абсолютные координаты точки привязки начала выносной линии
						if( !(i%2) ){
							data[8] = Math.round( this.prop.center_xy[0] + axis_direction[0] * this.prop.scal_factors[1] * this.prop.r * Math.sin( Math.PI * (this.prop.start_angle + this.prop.percent/2) / 50 ) ); 
						}else{
							data[9] = Math.round( this.prop.center_xy[1] + axis_direction[1] * this.prop.scal_factors[1] * this.prop.r * Math.cos( Math.PI * (this.prop.start_angle + this.prop.percent/2) / 50 ) );
						}
					}else if( i < 12 ){ //абсолютные координаты точки привязки конца выносной линии
						if( !(i%2) ){
							data[10] = Math.round( this.prop.center_xy[0] + axis_direction[0] * this.prop.scal_factors[2] * this.prop.r * Math.sin( Math.PI * (this.prop.start_angle + this.prop.percent/2) / 50 ) ); 
						}else{
							data[11] = Math.round( this.prop.center_xy[1] + axis_direction[1] * this.prop.scal_factors[2] * this.prop.r * Math.cos( Math.PI * (this.prop.start_angle + this.prop.percent/2) / 50 ) );
						}
					}
				}
				return arc_data;
			}

			/* этод метод расчитывае координаты смещения модели */
			function getCoordinates( parallax = 0, fi_percent = 0 ){
				/* переводим угол из процентов в радианы*/
				if( fi_percent == 0){
					fi_percent = this.prop.start_angle+this.prop.percent/2;
				}
				let fi_rad = Math.PI * fi_percent / 50;
				/* расчитываем относительные координаты смещения */
				let x = Math.round( parallax * Math.sin( fi_rad ) );
				let y = Math.round( parallax * Math.cos( fi_rad ) );
				/* пересчитываем координаты модели в абсолютные координаты */
				arc_data.forEach( function(v, i, data){
					!(i%2) ? data[i] += x : data[i] -= y;
				} );
				return arc_data;
			}	
			
			function changeAngle( angle ){
				/* переводим угол из процентов в радианы*/
				let fi_rad = Math.PI * angle / 50;
				arc_data[10] = Math.round( this.prop.center_xy[0] + axis_direction[0] * this.prop.scal_factors[2] * this.prop.r * Math.sin( Math.PI * (fi_rad) ) );
				arc_data[11] = Math.round( this.prop.center_xy[1] + axis_direction[1] * this.prop.scal_factors[2] * this.prop.r * Math.cos( Math.PI * (fi_rad) ) );
			}	
		}
	}
//export default Sector;