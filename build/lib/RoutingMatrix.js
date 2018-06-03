"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var e = React.createElement;
var RoutingMatrix = /** @class */ (function (_super) {
    __extends(RoutingMatrix, _super);
    function RoutingMatrix() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoutingMatrix.prototype.render = function () {
        return e('div', this.props);
    };
    return RoutingMatrix;
}(React.Component));
exports.RoutingMatrix = RoutingMatrix;
//# sourceMappingURL=RoutingMatrix.js.map