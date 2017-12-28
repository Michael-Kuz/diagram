class Controller{
	constructor( sector, view ){
		this.sector = sector;
		this.view = view;
						
		this.view.on("active-sector-pie-outline", this.getActiveSectorPieOutline.bind(this) ); //подписываемся на событие
		this.view.on("active-sector-pie", this.getActiveSectorPie.bind(this) ); //подписываемся на событие
	}
	/*----------------------------------------------------------------------------*/
	/* этод метод управлят обработкой события активации/деактивации сектора       */
	/* при наведении на него мышки (для сектора реализованного с аутлайном)       */
	getActiveSectorPieOutline( event ){
		let length = Math.ceil( this.view.path_note.getTotalLength() );
		this.view.cancelAnimation(this.view.path);
		this.view.cancelAnimation(this.view.path_shadow);
		
		if( event.type === "mouseover" ){
			this.sector.getPointsOfSector(this.sector.prop.arc_data).move(4);
			this.sector.getPointsOfSector(this.sector.prop.arc_shadow).move(4);
			this.view.drawPath();
			this.view.drawPathShadow();
			this.view.drawText().text();
			this.view.camp.style = "opacity: 1; transition: all 0.5s ease;";
			this.view.path_note.style = "stroke: rgba(0,0,0,1); stroke-width: 1px; stroke-dasharray: "+length+" 0; transition: all 0.5s ease 0s;";
		}else if( event.type === "mouseout" ){
			this.sector.getPointsOfSector(this.sector.prop.arc_data).move(-4);
			this.sector.getPointsOfSector(this.sector.prop.arc_shadow).move(-4);
			this.view.drawPath();
			this.view.drawPathShadow();
			this.view.drawText().text();
			this.view.camp.style = "opacity: 0; transition: all 0.5s ease;";
			this.view.path_note.style = "stroke: rgba(0,0,0,1); stroke-width: 1px; stroke-dasharray: 0 "+length+"; transition: all 0.5s ease 0s;";
		}
	}
	/*----------------------------------------------------------------------------*/
	/* этод метод управлят обработкой события активации/деактивации сектора       */
	/* при наведении на него мышки (для сектора обычного вида без аутлайна)       */
	getActiveSectorPie( event ){
		let length = Math.ceil( this.view.path_note.getTotalLength() );
		this.view.cancelAnimation(this.view.path);
		this.view.cancelAnimation(this.view.path_shadow);
		this.view.path_note.classList.add("active-sector");
		
		if( event.type === "mouseover" ){
			this.sector.getPointsOfSector(this.sector.prop.arc_data).move(4);
			this.view.drawPath();
			this.view.drawPathShadow().style({fill: 'rgba(0,0,0,0.9)', filter: 'url("#pathFilter")'});
			this.view.camp.style = "opacity: 1.0; transition: all 0.5s ease;";
			this.view.path_note.style = "stroke: rgba(0,0,0,1); stroke-width: 1px; stroke-dasharray: "+length+" 0;";
		}else if( event.type === "mouseout" ){
			this.sector.getPointsOfSector(this.sector.prop.arc_data).move(-4);
			this.view.drawPath();
			this.view.drawPathShadow().style( {fill: 'rgba(100,100,100,0)', filter: ''} );
			this.view.camp.style = "opacity: 0.0; transition: all 0.5s ease;";
			this.view.path_note.style = "stroke: rgba(0,0,0,1); stroke-width: 1px; stroke-dasharray: 0 "+length+";";
		}
	}
}
//export default Controller;