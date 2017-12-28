"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* этот класс - модель сектора  для построения круговой диограммы */
/* на основе SVG графики                                          */
window.onload = function () {
	var data = [{ name: "Yandex-direct", percent: 40, start_angle: 0, r: 100, center_xy: [120, 120], fill: "rgba(0,0,0,0)", stroke: "#808080", stroke_width: "3px" }, { name: "Google-analitics", percent: 20, start_angle: 40, r: 100, center_xy: [120, 120], fill: "rgba(0,0,0,0)", stroke: "#FF0000", stroke_width: "3px" }, { name: "Rotoban", percent: 20, start_angle: 60, r: 100, center_xy: [120, 120], fill: "rgba(0,0,0,0)", stroke: "#FFFF00", stroke_width: "3px" }, { name: "Others", percent: 20, start_angle: 80, r: 100, center_xy: [120, 120], fill: "rgba(0,0,0,0)", stroke: "#00FF00", stroke_width: "3px" }];

	var Sector = function () {
		function Sector(data) {
			_classCallCheck(this, Sector);

			this.name = data.name; //название сектора
			this.r = data.r; //радиус сектора
			this.percent = data.percent; //угол сектора в процентах
			this.start_angle = data.start_angle; //угол начала сектора в процентах
			this.center_xy = [data.center_xy[0], data.center_xy[1]]; //абсолютнае координаты центра сектора
			this.scal_factors = [0.4, 0.4, 0.9]; //коэффициенты масштабирования координат якорных точек для привязки справочной информации
			this.n_points = 6; //количество опорных точек модели сектора
			this.arc_data = this.getPointsOfSector().init(); //абсолютные координаты модели сектора
			this.arc_shadow; //абсолютные координаты дуги тени сектора
		}

		/*----------------------------------------------------------------------  */
		/* этот метод расчитывает абсолютные координаты модели сектора            */


		_createClass(Sector, [{
			key: "getPointsOfSector",
			value: function getPointsOfSector() {
				var arc_data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.arc_data;
				var axis_direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [1, -1];

				if (!arc_data) {
					arc_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				}

				return {
					init: initCoordinates.bind(this), //инициализируем модель
					move: getCoordinates.bind(this) //смещаем модель в плоскости

					/* этот метод расчитывает началтные абсолютные координаты модели */
				};function initCoordinates() {
					arc_data.forEach(callBack.bind(this));
					function callBack(value, i, data) {
						if (i < 2) {
							//абсолютные координаты центра сектора
							if (!(i % 2)) {
								data[0] = this.center_xy[0];
							} else {
								data[1] = this.center_xy[1];
							}
						} else if (i < 4) {
							//абсолютные координаты начала дуги сектора
							if (!(i % 2)) {
								data[2] = Math.round(this.center_xy[0] + axis_direction[0] * this.r * Math.sin(Math.PI * this.start_angle / 50));
							} else {
								data[3] = Math.round(this.center_xy[1] + axis_direction[1] * this.r * Math.cos(Math.PI * this.start_angle / 50));
							}
						} else if (i < 6) {
							//абсолютные координаты конца дуги сектора
							if (!(i % 2)) {
								data[4] = Math.round(this.center_xy[0] + axis_direction[0] * this.r * Math.sin(Math.PI * (this.start_angle + this.percent) / 50));
							} else {
								data[5] = Math.round(this.center_xy[1] + axis_direction[1] * this.r * Math.cos(Math.PI * (this.start_angle + this.percent) / 50));
							}
						} else if (i < 8) {
							//абсолютные координаты точки привязки вывода комментария
							if (!(i % 2)) {
								data[6] = Math.round(this.center_xy[0] + axis_direction[0] * this.scal_factors[0] * this.r * Math.sin(Math.PI * (this.start_angle + this.percent / 2) / 50));
							} else {
								data[7] = Math.round(this.center_xy[1] + axis_direction[1] * this.scal_factors[0] * this.r * Math.cos(Math.PI * (this.start_angle + this.percent / 2) / 50));
							}
						} else if (i < 10) {
							//абсолютные координаты точки привязки начала выносной линии
							if (!(i % 2)) {
								data[8] = Math.round(this.center_xy[0] + axis_direction[0] * this.scal_factors[1] * this.r * Math.sin(Math.PI * (this.start_angle + this.percent / 2) / 50));
							} else {
								data[9] = Math.round(this.center_xy[1] + axis_direction[1] * this.scal_factors[1] * this.r * Math.cos(Math.PI * (this.start_angle + this.percent / 2) / 50));
							}
						} else if (i < 12) {
							//абсолютные координаты точки привязки конца выносной линии
							if (!(i % 2)) {
								data[10] = Math.round(this.center_xy[0] + axis_direction[0] * this.scal_factors[2] * this.r * Math.sin(Math.PI * (this.start_angle + this.percent / 2) / 50));
							} else {
								data[11] = Math.round(this.center_xy[1] + axis_direction[1] * this.scal_factors[2] * this.r * Math.cos(Math.PI * (this.start_angle + this.percent / 2) / 50));
							}
						}
					}
					return arc_data;
				}

				/* этод метод расчитывае координаты смещения модели */
				function getCoordinates() {
					var parallax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
					var fi_percent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

					/* переводим угол из процентов в радианы*/
					var fi_rad = Math.PI * fi_percent / 50;
					/* расчитываем относительные координаты смещения */
					var x = Math.round(parallax * Math.sin(fi_rad));
					var y = Math.round(parallax * Math.cos(fi_rad));
					/* пересчитываем координаты модели в абсолютные координаты */
					arc_data.forEach(function (v, i, data) {
						!(i % 2) ? data[i] += x : data[i] -= y;
					});
					return arc_data;
				}
			}
		}]);

		return Sector;
	}();

	/*=======================================================================*/
	/* вывод модели */


	var sector = new Sector(data[1]);

	sector.getPointsOfSector().init();
	console.log(sector.arc_data.length);
	console.log(sector.arc_data);
	sector.getPointsOfSector().move(2, 50);
	console.log(sector.arc_data);
};
exports.default = Sector;