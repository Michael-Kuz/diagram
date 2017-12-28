'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.onload = function () {
	var in_data = [{ camp: "Yandex-direct", per: 40, offset: 0, r: 100, xc: 120, yc: 120, fill: "rgba(0,0,0,0)", stroke: "#808080", stroke_width: "3px" }, { camp: "Google-analitics", per: 20, offset: 40, r: 100, xc: 120, yc: 120, fill: "rgba(0,0,0,0)", stroke: "#FF0000", stroke_width: "3px" }, { camp: "Rotoban", per: 20, offset: 60, r: 100, xc: 120, yc: 120, fill: "rgba(0,0,0,0)", stroke: "#FFFF00", stroke_width: "3px" }, { camp: "Others", per: 20, offset: 80, r: 100, xc: 120, yc: 120, fill: "rgba(0,0,0,0)", stroke: "#00FF00", stroke_width: "3px" }];
	/* этот класс обьединяет свойства и методы для построения отдельных секторов */
	/* для круговой диаграммы на основе SVG графики                              */

	var Sector = function () {
		function Sector(svg, data_obj) {
			_classCallCheck(this, Sector);

			this.svg = svg;
			this.camp = data_obj.camp;
			this.r = data_obj.r;
			this.percent = data_obj.per;
			this.offset = data_obj.offset;
			this.xc = data_obj.xc;
			this.yc = data_obj.yc;
			this.fill = data_obj.fill;
			this.stroke = data_obj.stroke;
			this.stroke_width = data_obj.stroke_width;
			this.arc_data = this.initStartSector();
			this.copy = this.getCopyCoordinats();
			this.ancor = this.getPointAnchorForRef_1();
			this.ref_1 = this.getOutputRef_1();
			this.ref_data = this.getPathForRef_2();
			this.path_ref_2 = this.getOutputPathForRef_2();
			//this.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 0 100; ";
			this.text_ref_2 = this.getOutputRef_2();
			this.path = this.getDraw();
			this.path_shadow = this.getShadow();
		}

		/*----------------------------------------------------------------------*/
		/* этот метод делает копию координат сектора                            */


		_createClass(Sector, [{
			key: "getCopyCoordinats",
			value: function getCopyCoordinats() {
				if (!this.copy) {
					this.copy = { center: [], p_from: [], p_to: [] };
				}
				this.copy.center[0] = this.arc_data.center[0];
				this.copy.center[1] = this.arc_data.center[1];
				this.copy.p_from[0] = this.arc_data.p_from[0];
				this.copy.p_from[1] = this.arc_data.p_from[1];
				this.copy.p_to[0] = this.arc_data.p_to[0];
				this.copy.p_to[1] = this.arc_data.p_to[1];

				return this.copy;
			}
			/*----------------------------------------------------------------------*/
			/* этод метод создает элемент играющий роль тени                        */

		}, {
			key: "getShadow",
			value: function getShadow() {
				if (!this.path_shadow) {
					this.path_shadow = document.createElementNS("http://www.w3.org/2000/svg", "path");
				}
				var id = this.svg.querySelector("filter").getAttribute("id");
				var class_shadow_path = this.svg.querySelector("filter").getAttribute("class");

				if (!id) {
					return false;
				}
				var param = 'M ' + this.arc_data.p_from[0] + ' ' + this.arc_data.p_from[1] + ' A ' + this.r + ' ' + this.r + ', 0, 0, 1, ' + this.arc_data.p_to[0] + ' ' + this.arc_data.p_to[1] + ' L ' + this.arc_data.center[0] + ' ' + this.arc_data.center[1] + ' Z';
				this.path_shadow.setAttribute("d", param);
				this.path_shadow.classList.remove("pointer");
				this.path_shadow.classList.add(class_shadow_path);
				this.path_shadow.style = "fill: " + this.fill + "; stroke: #000; stroke-width: 3px; filter: url(#" + id + ");";
				this.showShadow();
				return this.path_shadow;
			}

			/*----------------------------------------------------------------------*/
			/* этод метод добавляет элемент тени в svg элемент                      */

		}, {
			key: "showShadow",
			value: function showShadow() {
				if (!this.path_shadow) {
					console.log("Отсутствует элемент тени.");
					return false;
				}
				this.svg.insertBefore(this.path_shadow, this.path);
			}

			/*----------------------------------------------------------------------*/
			/* этод метод измеряет длинну сектора и запускает анимацию при загрузке */

		}, {
			key: "onloadAnimation",
			value: function onloadAnimation() {
				var path_len = Math.ceil(this.path.getTotalLength());
				this.path.setAttribute("stroke-dasharray", path_len);
				this.path.setAttribute("stroke-dashoffset", path_len);
				this.path.classList.add("animated");
			}

			/*------------------------------------------------------------------*/
			/* этот метод задает стартовые тоски сектора                        */

		}, {
			key: "initStartSector",
			value: function initStartSector() {
				if (!this.arc_data) {
					this.arc_data = {};
				}
				return this.arc_data = {
					center: [this.xc, this.yc],
					p_from: [this.xc, this.yc - this.r],
					p_to: [Math.round(this.xc + this.r * Math.sin(Math.PI * this.percent / 50)), Math.round(this.yc - this.r * Math.cos(Math.PI * this.percent / 50))]
				};
			}

			/*------------------------------------------------------------------*/
			/* этот метод выводит точку в центре диограммы                      */

		}, {
			key: "getDrawDotInPoint",
			value: function getDrawDotInPoint(x, y) {
				this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
				this.circle.setAttribute("cx", x);
				this.circle.setAttribute("cy", y);
				this.circle.setAttribute("r", 2);
				this.svg.appendChild(this.circle);
				return this.circle;
			}

			/*------------------------------------------------------------------*/
			/* этод метод пересчитывает координаты сектора this.arc_data        */
			/* c учетом его смещения по плоскости                               */

		}, {
			key: "getArcDataAfterParallax",
			value: function getArcDataAfterParallax() {
				var parallax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var fi_percent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.arc_data;

				/* переводим угол в процентах в радианы*/
				var fi_rad = Math.PI * fi_percent / 50;
				/* расчитываем относительные координаты смещения */
				var x = Math.round(parallax * Math.sin(fi_rad));
				var y = Math.round(parallax * Math.cos(fi_rad));
				/* пересчитываем абсолютные координаты сектора */
				for (var name in data) {
					data[name][0] += x;
					data[name][1] -= y;
				}
			}

			/*------------------------------------------------------------------*/
			/* этод метод выводит сектор на экран                               */

		}, {
			key: "getDraw",
			value: function getDraw() {
				if (!this.path) {
					this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
				}
				this.getRotate();
				var param = 'M ' + this.arc_data.p_from[0] + ' ' + this.arc_data.p_from[1] + ' A ' + this.r + ' ' + this.r + ', 0, 0, 1, ' + this.arc_data.p_to[0] + ' ' + this.arc_data.p_to[1] + ' L ' + this.arc_data.center[0] + ' ' + this.arc_data.center[1] + ' Z';
				this.path.setAttribute("d", param);
				this.path.setAttribute("fill", this.fill);
				this.path.style = "stroke: " + this.stroke + "; stroke-width: " + this.stroke_width;
				this.svg.appendChild(this.path);
				this.getShadow();
				this.showShadow();

				if (this.ref_1) {
					this.getOutputRef_1();
				}
				if (this.ref_data) {
					this.getPathForRef_2();
				}
				if (this.path_ref_2) {
					this.getOutputPathForRef_2();
				}
				this.onloadAnimation();
				return this.path;
			}

			/*------------------------------------------------------------------*/
			/* этод метод поворачивает сектор на нужный угол                    */

		}, {
			key: "getRotate",
			value: function getRotate() {
				var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.arc_data;

				var fi_rot = 360 * this.offset / 100;
				var fi_rad = [];
				fi_rad[0] = Math.PI * this.offset / 50; //перевод % в радианы угла докрутки для первой точки
				fi_rad[1] = Math.PI * (this.offset + this.percent) / 50; //перевод % в радианы угла докрутки для второй точки
				var fi_rad_anchor = Math.PI * (this.offset + this.percent / 2) / 50; //перевод % в радианы угла биссектрисы сектора
				/* делаем поворот через css */
				this.path.setAttribute('transform-origin', data.center[0] + 'px ' + data.center[1] + 'px');
				this.path.style.transform = 'rotate(' + fi_rot + 'deg)';
				/* пересчитываем все координаты фигуры и якорных точек */
				var i = 0;
				for (var name in data) {
					if (name == "center" || i >= 2) continue;
					data[name][0] = data.center[0] + Math.round(this.r * Math.sin(fi_rad[i]));
					data[name][1] = data.center[1] - Math.round(this.r * Math.cos(fi_rad[i]));
					i++;
				}

				var x_a = this.anchor[0] - data.center[0];
				var y_a = data.center[1] - this.anchor[1];
				var r_anchor = Math.sqrt(Math.pow(x_a, 2) + Math.pow(y_a, 2));

				this.anchor[0] = Math.round(this.arc_data.center[0] + r_anchor * Math.sin(fi_rad_anchor));
				this.anchor[1] = Math.round(this.arc_data.center[1] - r_anchor * Math.cos(fi_rad_anchor));
				//this.getDrawDotInPoint( this.anchor_x, this.anchor_y );
			}

			/*-------------------------------------------------------------------------------------*/
			/* этот метод расчитывает точку привязки справочного текста (например процент сектора) */
			/* точка начала вывода привязана к бессектрисе угла сектора                            */

		}, {
			key: "getPointAnchorForRef_1",
			value: function getPointAnchorForRef_1() {
				var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.4;

				if (!this.anchor) {
					this.anchor = [];
				}
				/* перевод угла бессектрисы сектора в радианы */
				var fi_rad = Math.PI * (this.percent / 2) / 50;

				this.anchor[0] = Math.round(this.arc_data.center[0] + distance * this.r * Math.sin(fi_rad));
				this.anchor[1] = Math.round(this.arc_data.center[1] - distance * this.r * Math.cos(fi_rad));
				//this.getDrawDotInPoint( this.anchor_x, this.anchor_y );
				return this.anchor;
			}
			/*-------------------------------------------------------------------------------------*/
			/* этот метод создает элемент "text" ref_1 и добавляет его в родительский элемент SVG  */

		}, {
			key: "getOutputRef_1",
			value: function getOutputRef_1() {
				if (!this.ref_1) {
					this.ref_1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
				}
				var tmp = this.offset + this.percent / 2;
				if (tmp <= 50) {
					this.ref_1.setAttribute("text-anchor", "start");
				} else {
					this.ref_1.setAttribute("text-anchor", "end");
				}
				this.ref_1.setAttribute("x", this.anchor[0]);
				this.ref_1.setAttribute("y", this.anchor[1]);
				this.ref_1.innerHTML = this.percent + "%";
				this.svg.appendChild(this.ref_1);
				return this.ref_1;
			}
			/*-------------------------------------------------------------------------------------*/
			/* этот методрасчитывает координаты рисования для справочной выноски                   */
			/* точка начала кривой привязана к бессектрисе угла сектора                            */

		}, {
			key: "getPathForRef_2",
			value: function getPathForRef_2() {
				var l_from_c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.4;
				var l_of_r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.9;

				if (!this.ref_data) {
					this.ref_data = {
						p_from: [],
						p_to: []
					};
				}
				/*расчет координат точки привязки текста*/
				var fi_rad = Math.PI * (this.offset + this.percent / 2) / 50;
				this.ref_data.p_from[0] = Math.round(this.arc_data.center[0] + l_from_c * this.r * Math.sin(fi_rad));
				this.ref_data.p_from[1] = Math.round(this.arc_data.center[1] - l_from_c * this.r * Math.cos(fi_rad));
				var tmp = this.offset + this.percent / 2;
				if (tmp > 0 && tmp <= 25) {
					var fi = 20 * Math.PI / 180;
					fi ? fi : fi_rad;
					this.ref_data.p_to[0] = Math.round(this.ref_data.p_from[0] + l_of_r * this.r * Math.sin(fi));
					this.ref_data.p_to[1] = Math.round(this.ref_data.p_from[1] - l_of_r * this.r * Math.cos(fi));
				} else if (tmp > 25 && tmp <= 50) {
					var _fi = 150 * Math.PI / 180;
					_fi ? _fi : fi_rad;
					this.ref_data.p_to[0] = Math.round(this.ref_data.p_from[0] + l_of_r * this.r * Math.sin(_fi));
					this.ref_data.p_to[1] = Math.round(this.ref_data.p_from[1] - l_of_r * this.r * Math.cos(_fi));
				} else if (tmp > 50 && tmp <= 75) {
					var _fi2 = 210 * Math.PI / 180;
					_fi2 ? _fi2 : fi_rad;
					this.ref_data.p_to[0] = Math.round(this.ref_data.p_from[0] + l_of_r * this.r * Math.sin(_fi2));
					this.ref_data.p_to[1] = Math.round(this.ref_data.p_from[1] - l_of_r * this.r * Math.cos(_fi2));
				} else if (tmp > 75 && tmp <= 100) {
					var _fi3 = 320 * Math.PI / 180;
					_fi3 ? _fi3 : fi_rad;
					this.ref_data.p_to[0] = Math.round(this.ref_data.p_from[0] + l_of_r * this.r * Math.sin(_fi3));
					this.ref_data.p_to[1] = Math.round(this.ref_data.p_from[1] - l_of_r * this.r * Math.cos(_fi3));
				}
				//this.getDrawDotInPoint( this.ref_data.p_from[0], this.ref_data.p_from[1] );
				return this.ref_data;
			}
			/*--------------------------------------------------------------------------------*/
			/* этод метод создает елемент "path" для Ref_2 и добавляет его в родительский     */
			/* элемент                                                                        */

		}, {
			key: "getOutputPathForRef_2",
			value: function getOutputPathForRef_2() {
				if (!this.path_ref_2) {
					this.path_ref_2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
				}
				var param = 'M ' + this.ref_data.p_from[0] + ' ' + this.ref_data.p_from[1] + ' L ' + this.ref_data.p_to[0] + ' ' + this.ref_data.p_to[1];
				this.path_ref_2.setAttribute("d", param);
				this.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 0 100; ";
				this.svg.appendChild(this.path_ref_2);
				//this.getDrawDotInPoint( this.ref_data.p_from[0], this.ref_data.p_from[1] );
				return this.path_ref_2;
			}
			/*--------------------------------------------------------------------------------*/
			/* этод метод создает элемент "text" для вывода Ref_2 и добавляет его в           */
			/* родительский элемент SVG                                                       */

		}, {
			key: "getOutputRef_2",
			value: function getOutputRef_2() {
				if (!this.text_ref_2) {
					this.text_ref_2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
				}
				var tmp = this.offset + this.percent / 2;
				if (tmp > 0 && tmp <= 25) {
					this.text_ref_2.setAttribute("text-anchor", "start");
				} else if (tmp > 25 && tmp <= 50) {
					this.text_ref_2.setAttribute("text-anchor", "start");
				} else if (tmp > 50 && tmp <= 75) {
					this.text_ref_2.setAttribute("text-anchor", "end");
				} else if (tmp > 75 && tmp <= 100) {
					this.text_ref_2.setAttribute("text-anchor", "end");
				}
				this.text_ref_2.setAttribute("x", this.ref_data.p_to[0]);
				this.text_ref_2.setAttribute("y", this.ref_data.p_to[1]);
				this.text_ref_2.style = "opacity: 0.0;";
				this.text_ref_2.innerHTML = this.camp;
				this.svg.appendChild(this.text_ref_2);
				return this.text_ref_2;
			}
		}]);

		return Sector;
	}();

	/*------------------------------------------------------------------------*/
	/* Секция формирования круговой диаграммы #1                              */


	var svg = document.querySelector("svg.diagram-pie");
	var sector = new Sector(svg, in_data[0]);
	//sector.getDrawDotInPoint( sector.xc, sector.yc );
	sector.getArcDataAfterParallax(5, 20);
	sector.getRotate(sector.copy);
	//sector.getOutputRef_1();
	sector.getDraw();
	sector.path.classList.add("pointer");
	sector.path_ref_2.classList.add("trans-type-1");
	sector.text_ref_2.classList.add("trans-type-1");

	var sector_1 = new Sector(svg, in_data[1]);
	sector_1.getArcDataAfterParallax(5, 50);
	sector_1.getRotate(sector_1.copy);
	//sector_1.getShadow();
	//sector_1.getOutputRef_1();
	sector_1.getDraw();
	sector_1.path.classList.add("pointer");
	sector_1.path_ref_2.classList.add("trans-type-1");
	sector_1.text_ref_2.classList.add("trans-type-1");

	var sector_2 = new Sector(svg, in_data[2]);
	sector_2.getArcDataAfterParallax(5, 70);
	//sector_2.getRotate();
	sector_2.getDraw();
	//sector_2.getShadow();
	//sector_2.getOutputRef_1()
	sector_2.path.classList.add("pointer");
	sector_2.path_ref_2.classList.add("trans-type-1");
	sector_2.text_ref_2.classList.add("trans-type-1");

	var sector_3 = new Sector(svg, in_data[3]);
	sector_3.getArcDataAfterParallax(5, 90);
	//sector_3.getRotate();
	sector_3.getDraw();
	//sector_3.getShadow();
	//sector_3.getOutputRef_1();
	sector_3.path.classList.add("pointer");
	sector_3.path_ref_2.classList.add("trans-type-1");
	sector_3.text_ref_2.classList.add("trans-type-1");

	/*------------------------------------------------*/
	/* секция обработки событий на круговой диаграмме */

	sector.path.addEventListener("mouseover", function (event) {
		sector.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 100 0; ";
		sector.text_ref_2.style = "opacity: 1.0;";
	});
	sector.path.addEventListener("mouseout", function (event) {
		sector.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 0 100; ";
		sector.text_ref_2.style = "opacity: 0.0;";
	});
	sector_1.path.addEventListener("mouseover", function (event) {
		sector_1.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 100 0; ";
		sector_1.text_ref_2.style = "opacity: 1.0;";
	});
	sector_1.path.addEventListener("mouseout", function (event) {
		sector_1.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 0 100; ";
		sector_1.text_ref_2.style = "opacity: 0.0;";
	});
	sector_2.path.addEventListener("mouseover", function (event) {
		sector_2.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 100 0; ";
		sector_2.text_ref_2.style = "opacity: 1.0;";
	});
	sector_2.path.addEventListener("mouseout", function (event) {
		sector_2.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 0 100; ";
		sector_2.text_ref_2.style = "opacity: 0.0;";
	});
	sector_3.path.addEventListener("mouseover", function (event) {
		sector_3.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 100 0; ";
		sector_3.text_ref_2.style = "opacity: 1.0;";
	});
	sector_3.path.addEventListener("mouseout", function (event) {
		sector_3.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 0 100; ";
		sector_3.text_ref_2.style = "opacity: 0.0;";
	});
	/*------------------------------------------------------------------------*/
	/* Секция формирования круговой диаграммы #2                                */
	var in_data_outline = [{ camp: "Yandex-direct", per: 40, offset: 0, r: 100, xc: 120, yc: 120, fill: "#808080", stroke: "", stroke_width: "0" }, { camp: "Google-analitics", per: 20, offset: 40, r: 100, xc: 120, yc: 120, fill: "#FF0000", stroke: "", stroke_width: "0" }, { camp: "Rotoban", per: 20, offset: 60, r: 100, xc: 120, yc: 120, fill: "#FFFF00", stroke: "", stroke_width: "0" }, { camp: "Others", per: 20, offset: 80, r: 100, xc: 120, yc: 120, fill: "#00FF00", stroke: "", stroke_width: "0" }];
	var svg_2 = document.querySelector("svg.diagram-pie-outline");
	var sector_4 = new Sector(svg_2, in_data_outline[0]);
	//sector_4.getRotate();
	sector_4.getDraw();
	sector_4.path.classList.add("pointer");
	sector_4.path_ref_2.classList.add("trans-type-1");
	sector_4.text_ref_2.classList.add("trans-type-1");

	var sector_5 = new Sector(svg_2, in_data_outline[1]);
	//sector_5.getRotate();
	sector_5.getDraw();
	sector_5.path.classList.add("pointer");
	//sector_5.getOutputRef_1();
	sector_5.path_ref_2.classList.add("trans-type-1");
	sector_5.text_ref_2.classList.add("trans-type-1");

	var sector_6 = new Sector(svg_2, in_data_outline[2]);
	//sector_6.getRotate();
	sector_6.getDraw();
	sector_6.path.classList.add("pointer");
	//sector_6.getOutputRef_1();
	sector_6.path_ref_2.classList.add("trans-type-1");
	sector_6.text_ref_2.classList.add("trans-type-1");

	var sector_7 = new Sector(svg_2, in_data_outline[3]);
	//sector_7.getRotate();
	sector_7.getDraw();
	sector_7.path.classList.add("pointer");
	//sector_7.getOutputRef_1();
	sector_7.path_ref_2.classList.add("trans-type-1");
	sector_7.text_ref_2.classList.add("trans-type-1");

	/*------------------------------------------------*/
	/* секция обработки событий на круговой диаграмме */
	sector_4.path.addEventListener("mouseover", function (event) {
		//sector_4.getArcDataAfterParallax(-2, 20, this.copy);
		//console.log("arc= "+sector_4.arc_data.p_to);
		//console.log("copy= "+sector_4.copy.p_to);
		sector_4.getDraw();
		sector_4.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 100 0; ";
		sector_4.text_ref_2.style = "opacity: 1.0;";
		//sector_4.path_shadow.style="display: block; fill: #000;";
		//sector_4.path_shadow.setAttribute("fill", "black");
		//sector_4.path.classList.add("move");
	});
	sector_4.path.addEventListener("mouseout", function (event) {
		sector_4.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 0 100; ";
		sector_4.text_ref_2.style = "opacity: 0.0;";
		//sector_4.path_shadow.style="display: none;";
		//sector_4.getArcDataAfterParallax( -2, 20 );
		//sector_4.getArcDataAfterParallax(2, 20, this.copy);
		sector_4.getDraw();
		//sector_4.path.classList.remove("move");
	});
	sector_5.path.addEventListener("mouseover", function (event) {
		sector_5.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 100 0; ";
		sector_5.text_ref_2.style = "opacity: 1.0;";
	});
	sector_5.path.addEventListener("mouseout", function (event) {
		sector_5.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 0 100; ";
		sector_5.text_ref_2.style = "opacity: 0.0;";
	});
	sector_6.path.addEventListener("mouseover", function (event) {
		sector_6.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 100 0; ";
		sector_6.text_ref_2.style = "opacity: 1.0;";
	});
	sector_6.path.addEventListener("mouseout", function (event) {
		sector_6.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 0 100; ";
		sector_6.text_ref_2.style = "opacity: 0.0;";
	});
	sector_7.path.addEventListener("mouseover", function (event) {
		sector_7.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 100 0; ";
		sector_7.text_ref_2.style = "opacity: 1.0;";
	});
	sector_7.path.addEventListener("mouseout", function (event) {
		sector_7.path_ref_2.style = "stroke: black; stroke-width: 1px; stroke-dasharray: 0 100; ";
		sector_7.text_ref_2.style = "opacity: 0.0;";
	});
};