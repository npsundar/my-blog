"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
let MongoDBController = class MongoDBController {
    WithDB(operations, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const MongoClient = require('mongodb').MongoClient;
                // tslint:disable-next-line: max-line-length
                const client = yield MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true, useNewUrlParser: true });
                const db = client.db('my-blog');
                yield operations(db, res);
                client.close();
            }
            catch (error) {
                res.status(500).json({ message: 'Error Connecting DB', error });
            }
        });
    }
    getArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.WithDB((db) => __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Info(req.params.name);
                const articleName = req.params.name;
                const articleInfo = yield db.collection('articles').findOne({ name: articleName });
                res.status(200).send(articleInfo);
            }), res);
        });
    }
    getMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const MongoClient = require('mongodb').MongoClient;
                logger_1.Logger.Info(req.params.name);
                const articleName = req.params.name;
                const client = yield MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
                const db = client.db('my-blog');
                const articleInfo = yield db.collection('articles').findOne({ name: articleName });
                /* res.status(200).json(
                    {message:'Hello from Server'+req.params.name}
                 )*/
                res.status(200).send(articleInfo);
                client.close();
            }
            catch (error) {
                res.status(500).json({ message: 'Error Connecting DB', error });
            }
        });
    }
    postUpvote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const MongoClient = require('mongodb').MongoClient;
                logger_1.Logger.Info(req.params.name);
                const articleName = req.params.name;
                // tslint:disable-next-line: max-line-length
                const client = yield MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
                const db = client.db('my-blog');
                const articleInfo = yield db.collection('articles').findOne({ name: articleName });
                if (articleInfo) {
                    yield db.collection('articles').updateOne({ name: articleName }, { '$set': {
                            upvotes: articleInfo.upvotes + 1
                        },
                    });
                }
                const updatedArticleInfo = yield db.collection('articles').findOne({ name: articleName });
                res.status(200).send(updatedArticleInfo);
                client.close();
            }
            catch (error) {
                res.status(500).json({ message: 'Error Connecting DB', error });
            }
        });
    }
    AddComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.WithDB((db) => __awaiter(this, void 0, void 0, function* () {
                logger_1.Logger.Info(req.params.name);
                logger_1.Logger.Info(req.body);
                const articleName = req.params.name;
                const { username, text } = req.body;
                const articleInfo = yield db.collection('articles').findOne({ name: articleName });
                if (articleInfo) {
                    yield db.collection('articles').updateOne({ name: articleName }, { '$addToSet': {
                            comments: { username, text }
                        },
                    });
                }
                const updatedArticleInfo = yield db.collection('articles').findOne({ name: articleName });
                res.status(200).send(updatedArticleInfo);
            }), res);
        });
    }
    putMessage(req, res) {
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
    core_1.Get(':name')
], MongoDBController.prototype, "getArticle", null);
__decorate([
    core_1.Get(':myname')
], MongoDBController.prototype, "getMessage", null);
__decorate([
    core_1.Post('upvote/:name')
], MongoDBController.prototype, "postUpvote", null);
__decorate([
    core_1.Post('addcomment/:name')
], MongoDBController.prototype, "AddComment", null);
__decorate([
    core_1.Put(':msg')
], MongoDBController.prototype, "putMessage", null);
__decorate([
    core_1.Delete(':msg')
], MongoDBController.prototype, "delMessage", null);
MongoDBController = __decorate([
    core_1.Controller('api/articles/')
], MongoDBController);
exports.MongoDBController = MongoDBController;
//# sourceMappingURL=MongoDBController.js.map