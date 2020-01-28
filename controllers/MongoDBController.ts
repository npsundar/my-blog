// tslint:disable-next-line: no-unused-expression
import {Request,Response} from 'express';
import {Controller,Middleware,Get,Put,Post,Delete} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import { request } from 'http';
import { json } from 'body-parser';
import { cpus } from 'os';
@Controller('api/articles/')
export class MongoDBController{
    private client:any;


    private async WithDB(operations:any,res:Response){
        try{
            const MongoClient = require('mongodb').MongoClient;
             // tslint:disable-next-line: max-line-length
             const client=await MongoClient.connect('mongodb://localhost:27017',{useUnifiedTopology:true,useNewUrlParser:true});
             const db=client.db('my-blog');
             await operations(db,res);
              client.close();
             }catch(error)
             {
                res.status(500).json({message:'Error Connecting DB',error});
             }

    }
    @Get(':name')
    private async getArticle(req:Request,res:Response) {
        this.WithDB(async(db:any)=>{
            Logger.Info(req.params.name)    ;
            const  articleName=req.params.name;
            const articleInfo=await db.collection('articles').findOne({name:articleName});
            res.status(200).send(articleInfo);
        },res);
    }

    @Get(':myname')
    private async getMessage(req:Request,res:Response) {
    try{
   const MongoClient = require('mongodb').MongoClient;
    Logger.Info(req.params.name)    ;
    const  articleName=req.params.name;
    const client=await MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true});
    const db=client.db('my-blog');
    const articleInfo=await db.collection('articles').findOne({name:articleName});
    /* res.status(200).json(
        {message:'Hello from Server'+req.params.name}
     )*/
     res.status(200).send(articleInfo);
     client.close();
    }catch(error)
    {
        res.status(500).json({message:'Error Connecting DB',error});
    }
}
    @Post('upvote/:name')
    private async postUpvote(req: Request, res: Response) {
        try{
            const MongoClient = require('mongodb').MongoClient;
             Logger.Info(req.params.name)    ;
             const  articleName=req.params.name;
             // tslint:disable-next-line: max-line-length
             const client=await MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true});
             const db=client.db('my-blog');
             const articleInfo=await db.collection('articles').findOne({name:articleName});
             if(articleInfo)
             {
                 await db.collection('articles').updateOne({name:articleName},
                    {'$set':{
                        upvotes:articleInfo.upvotes+1
                    },
                });
             }
             const updatedArticleInfo=await db.collection('articles').findOne({name:articleName});
              res.status(200).send(updatedArticleInfo);
              client.close();
             }catch(error)
             {
                 res.status(500).json({message:'Error Connecting DB',error});
             }
    }

    @Post('addcomment/:name')
    private async AddComment(req:Request,res:Response) {
        this.WithDB(async(db:any)=>{
            Logger.Info(req.params.name)    ;
            Logger.Info(req.body)    ;
            const  articleName=req.params.name;
            const {username,text}=req.body;
            const articleInfo=await db.collection('articles').findOne({name:articleName});
            if(articleInfo)
            {
                await db.collection('articles').updateOne({name:articleName},
                   {'$addToSet':{
                       comments:{username,text}
                   },
               });
            }
            const updatedArticleInfo=await db.collection('articles').findOne({name:articleName});
            res.status(200).send(updatedArticleInfo);
        },res);
    }
    @Put(':msg')
    private putMessage(req: Request, res: Response) {
        Logger.Info(req.body.msg);
        return res.status(400).json({
            error: req.body.msg,
        });
    }



    @Delete(':msg')
    private delMessage(req: Request, res: Response) {
        try {
            throw new Error(req.body.msg);
        } catch (err) {
            Logger.Err(err, true);
            return res.status(400).json({
                error: req.body.msg,
            });
        }
    }
}