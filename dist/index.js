(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createUseList = exports.createUseModal = exports.useInject = exports.createUseTable = void 0;
	const use_table_1 = require("./hooks/use-table/use-table");
	Object.defineProperty(exports, "createUseTable", { enumerable: true, get: function () { return use_table_1.createUseTable; } });
	const utils_1 = require("./hooks/utils");
	Object.defineProperty(exports, "useInject", { enumerable: true, get: function () { return utils_1.useInject; } });
	const use_modal_1 = require("./hooks/use-modal/use-modal");
	Object.defineProperty(exports, "createUseModal", { enumerable: true, get: function () { return use_modal_1.createUseModal; } });
	const use_list_1 = require("./hooks/use-list/use-list");
	Object.defineProperty(exports, "createUseList", { enumerable: true, get: function () { return use_list_1.createUseList; } });

}));
//# sourceMappingURL=index.js.map
