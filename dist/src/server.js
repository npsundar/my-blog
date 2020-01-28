"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line
const BlogServer_1 = __importDefault(require("./BlogServer"));
const blogServer = new BlogServer_1.default();
blogServer.start(3000);
//# sourceMappingURL=server.js.map