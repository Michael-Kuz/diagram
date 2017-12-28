"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
	function Controller(sector, view) {
		_classCallCheck(this, Controller);

		this.sector = sector;
		this.view = view;

		this.view.on("active", this.activeSector.bind(this));

		this.view.drawPath(this.sector.arc_data);
		this.view.drawPathShadow(this.sector.arc_shadow);
	}

	_createClass(Controller, [{
		key: "getActiveSector",
		value: function getActiveSector() {}
	}]);

	return Controller;
}();

exports.default = Controller;