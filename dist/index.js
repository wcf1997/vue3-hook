(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.useInject = exports.createUseTable = void 0;
	const use_table_1 = require("./hooks/use-table/use-table");
	Object.defineProperty(exports, "createUseTable", { enumerable: true, get: function () { return use_table_1.createUseTable; } });
	const utils_1 = require("./hooks/utils");
	Object.defineProperty(exports, "useInject", { enumerable: true, get: function () { return utils_1.useInject; } });

}));
//# sourceMappingURL=index.js.map
