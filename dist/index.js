(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createModalComponent = exports.createUseList = exports.createUseModal = exports.useInject = exports.createUseTable = void 0;
	var use_table_1 = require("./hooks/use-table/use-table");
	Object.defineProperty(exports, "createUseTable", {
	  enumerable: true,
	  get: function get() {
	    return use_table_1.createUseTable;
	  }
	});
	var utils_1 = require("./hooks/utils");
	Object.defineProperty(exports, "useInject", {
	  enumerable: true,
	  get: function get() {
	    return utils_1.useInject;
	  }
	});
	var use_modal_1 = require("./hooks/use-modal/use-modal");
	Object.defineProperty(exports, "createModalComponent", {
	  enumerable: true,
	  get: function get() {
	    return use_modal_1.createModalComponent;
	  }
	});
	Object.defineProperty(exports, "createUseModal", {
	  enumerable: true,
	  get: function get() {
	    return use_modal_1.createUseModal;
	  }
	});
	var use_list_1 = require("./hooks/use-list/use-list");
	Object.defineProperty(exports, "createUseList", {
	  enumerable: true,
	  get: function get() {
	    return use_list_1.createUseList;
	  }
	});

}));
//# sourceMappingURL=index.js.map
