//'use strict'

class View extends EventEmitter{
	constructor( svg, prop ){
		super();
		
		this.svg = svg; //ссылка на структуру DOM обьекта
		this.prop = prop; //Свойства модели обьекта
		this.path;
		this.path_shadow;
		this.circle;
		this.path_note;
		this.text;
		this.camp;
		
		if( this.svg.classList.contains('diagram-pie-outline') ){
			this.drawPath();  //команда на вывод сектора
			this.onloadAnimation(this.path);     //команда на анимацию сектора при выводе
			this.drawPathShadow().style({stroke: 'rgba(0,0,0,1)', 'stroke-width': 3, fill: 'rgba(0,0,0,0)'});  //команда на вывод тени
			this.onloadAnimation(this.path_shadow);     //команда на анимацию тени при выводе
			this.setPathFilter(this.path_shadow, "pathFilter-1");
			this.drawText().text(); //команда на вывод комментария
			this.drawText().camp({ opacity: 0, 	transition: 'all 0.5s ease 0s'}); //команда на вывод названия сектора
			this.drawPathNote();    //скоманда на вывод ссылочной стрелки
			this.addEventListner( this.handleActivePieOutline.bind(this) );                   //посоединяем нужные обработчики к DOM
		}else if( this.svg.classList.contains('diagram-pie') ){
			this.drawPath(); 	   //команда на вывод сектора
			this.onloadAnimation(this.path);     //команда на анимацию сектора при выводе
			this.drawPathShadow().style({stroke: 'rgba(200,200,200,0)', 'stroke-width': 0, fill: 'rgba(100,100,100,0)'});  //команда на вывод тени
			this.onloadAnimation(this.path_shadow);     //команда на анимацию тени при выводе
			this.drawText().text(); //команда на вывод комментария
			this.drawText().camp({opacity: 0}); //команда на вывод названия сектора
			this.drawPathNote();    //скоманда на вывод ссылочной стрелки
			this.addEventListner( this.handleActivePie.bind(this) );                   //посоединяем нужные обработчики к DOM
		}
	}
	
	/*-----------------------------------------------------------------------------*/
	/* этод метод присединяет к элементам их обработчики событий                   */
	addEventListner( callBack ) {
		this.path.addEventListener( "mouseover", callBack );
		this.path.addEventListener( "mouseout", callBack );
	}
	/*-----------------------------------------------------------------------------*/
	/* этот метод обрабатывает событие при наведение/убирании курсора для модели   */
    /* сектор реализованной "аутлайном"                                            */ 
    handleActivePieOutline( event ){
		this.emit("active-sector-pie-outline", event );		
	}
	
	/*-----------------------------------------------------------------------------*/
	/* этот метод обрабатывает событие при наведение/убирании курсора для модели   */
    /* сектор реализованной без аутлайна (в обычном стандартном виде)              */ 
    handleActivePie( event ){
		this.emit("active-sector-pie", event );		
	}
	
	/*-------------------------------------------------*/
	/* этот метод создает элемент контура модели       */
	/* и вставляет его в html документ                 */
	drawPath(){
		if( !this.path ){
			this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
			this.svg.appendChild(this.path);
		}
		let param = 'M '+this.prop.arc_data[2]+' '+this.prop.arc_data[3]+' A '+this.prop.r+' '+this.prop.r+', 0, 0, 1, '+this.prop.arc_data[4]+' '+this.prop.arc_data[5]+' L '+this.prop.arc_data[0]+' '+this.prop.arc_data[1]+' Z';
		this.path.setAttribute("d", param);
		this.path.setAttribute("fill",this.prop.fill);
		this.path.style = "stroke: "+this.prop.stroke+"; stroke-width: "+this.prop.stroke_width;
		
		return this.path;
	}
	
	/*--------------------------------------------------------------------------------*/
	/* этод метод создает елемент "path" для линии выноски и вставляет его в html     */
	drawPathNote(){
		if( !this.path_note ){
			this.path_note = document.createElementNS("http://www.w3.org/2000/svg", "path");
		}
		let param = 'M '+this.prop.arc_data[8]+' '+this.prop.arc_data[9]+' L '+this.prop.arc_data[10]+' '+this.prop.arc_data[11];
		this.path_note.setAttribute( "d", param );
		let length = Math.ceil( this.path_note.getTotalLength() );
		this.path_note.style = "stroke: rgba(0,0,0,1); stroke-width: 1px; stroke-dasharray: 0 "+length+";";
		this.svg.appendChild(this.path_note);
		
		return this.path_note;
	}
	
	/*-------------------------------------------------*/
	/* этот метод создает элемент контура тени  модели */
	/* и вставляет его в html документ                 */
	drawPathShadow(){
		if( !this.path_shadow ){
			this.path_shadow = document.createElementNS("http://www.w3.org/2000/svg", "path");
			this.svg.insertBefore(this.path_shadow, this.path);
		}
		let param = 'M '+this.prop.arc_shadow[2]+' '+this.prop.arc_shadow[3]+' A '+this.prop.r+' '+this.prop.r+', 0, 0, 1, '+this.prop.arc_shadow[4]+' '+this.prop.arc_shadow[5]+' L '+this.prop.arc_shadow[0]+' '+this.prop.arc_shadow[1]+' Z';
		this.path_shadow.setAttribute("d", param);
		return{
			style: function(arg=[]){
				Object.keys(arg).forEach( key => {this.path_shadow.style[key] = arg[key] } );
			}.bind(this)
		}
	}
	
	/*------------------------------------------------------------------*/
	/* этот метод выводит точку в заданных координатах                  */
	drawDot( x, y, r ){
		if( !this.circle ){
			this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			this.svg.appendChild(this.circle);
		}
		this.circle.setAttribute("cx", x);
		this.circle.setAttribute("cy", y);
		this.circle.setAttribute("r", r);
	}
	
	/*-------------------------------------------------------------------------------------*/
	/* этот метод создает элемент "text" и выводит его в теге SVG по координатам якорной   */
	/* точки                                                                               */
	drawText(){
		return {
			text: (function(){
				if( !this.text ){
					this.text = document.createElementNS("http://www.w3.org/2000/svg", "text");
					this.svg.appendChild(this.text);
				}
				let tmp = this.prop.start_angle + this.prop.percent / 2;
				if( tmp <= 50 ){
					this.text.setAttribute("text-anchor", "start");
				}else {
					this.text.setAttribute("text-anchor", "end");
				}
				this.text.setAttribute( "x", this.prop.arc_data[6] );
				this.text.setAttribute( "y", this.prop.arc_data[7] );
				this.text.textContent = this.prop.percent+"%";
			}).bind(this),
			camp: (function(arg=[]){
				if( !this.camp ){
					this.camp = document.createElementNS("http://www.w3.org/2000/svg", "text");
					this.svg.appendChild(this.camp);
				}
				let tmp = this.prop.start_angle + this.prop.percent / 2;
				if( tmp <= 50 ){
					this.camp.setAttribute("text-anchor", "start");
				}else {
					this.camp.setAttribute("text-anchor", "end");
				}
				this.camp.setAttribute( "x", this.prop.arc_data[10] );
				this.camp.setAttribute( "y", this.prop.arc_data[11] );
				this.camp.textContent = this.prop.name;
				Object.keys(arg).forEach( key => {this.camp.style[key] = arg[key]} );
			}).bind(this)
		}
	}
	
	/*---------------------------------------------------------*/
	/* этот метод задает атрибут(filter) - фильтр размытия     */
	/* для элемента path                                       */
	setPathFilter( element, filter ){
		if( !element || !filter ){
			return false;
		}
		element.setAttribute("filter", "url('#"+filter+"')"); 
	}
	
	/*----------------------------------------------------------------------*/
	/* этод метод измеряет длинну линии и добавляет класс animated для      */
	/* выполнения  анимации                                                 */
	onloadAnimation( path ){
		let path_len = Math.ceil( path.getTotalLength() );
		path.setAttribute("stroke-dasharray",path_len);
		path.setAttribute("stroke-dashoffset",path_len);
		path.classList.add("animated");
	}
	
	/*----------------------------------------------------------------------*/
	/* этод метод отменяет анимацию(вырисовки линии) для сектора path       */
	cancelAnimation( path ){
		let path_len = Math.ceil( path.getTotalLength() );
		path.setAttribute("stroke-dasharray",path_len);
		path.setAttribute("stroke-dashoffset",0);
		path.classList.remove("animated");
	}
}
//export default View;