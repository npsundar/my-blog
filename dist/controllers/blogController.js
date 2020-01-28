"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const BlogApplication_1 = __importDefault(require("./BlogApplication"));
let BlogController = class BlogController {
    getMessage(req, res) {
        logger_1.Logger.Info(req.params.msg);
        const blogapplicaion = new BlogApplication_1.default();
        const jsonData = blogapplicaion.getArticles();
        let retvalue = jsonData;
        jsonData.map((item, key) => {
            if (item.name === req.params.msg)
                retvalue = item;
        });
        // console.log(retvalue);
        res.status(200).json(retvalue);
        /*res.status(200).json(
            {message:'Hello from Server'+req.params.msg}
        )*/
    }
    putMessage(req, res) {
        logger_1.Logger.Info(req.body.msg);
        return res.status(400).json({
            error: req.body.msg,
        });
    }
    postMessage(req, res) {
        logger_1.Logger.Info(req.body.msg);
        return res.status(400).json({
            error: req.body.msg,
        });
    }
    delMessage(req, res) {
        try {
            throw new Error(req.body.msg);
        }
        catch (err) {
            logger_1.Logger.Err(err, true);
            return res.status(400).json({
                error: req.body.msg,
            });
        }
    }
};
__decorate([
    core_1.Get(':msg')
], BlogController.prototype, "getMessage", null);
__decorate([
    core_1.Put(':msg')
], BlogController.prototype, "putMessage", null);
__decorate([
    core_1.Post(':msg')
], BlogController.prototype, "postMessage", null);
__decorate([
    core_1.Delete(':msg')
], BlogController.prototype, "delMessage", null);
BlogController = __decorate([
    core_1.Controller('api')
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=BlogController.js.map