// tslint:disable-next-line: no-unused-expression
import {Request,Response} from 'express';
import {Controller,Middleware,Get,Put,Post,Delete} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import { request } from 'http';
import BlogApplication from './BlogApplication';
import { json } from 'body-parser';
@Controller('api')
export class BlogController{
    @Get(':msg')
private getMessage(req:Request,res:Response) {
    Logger.Info(req.params.msg)    ;
    const blogapplicaion=new BlogApplication();
    const jsonData =blogapplicaion.getArticles();
    let retvalue=jsonData;
    jsonData.map((item:any,key:any)=>{
        if(item.name===req.params.msg)
        retvalue= item;
    });

    // console.log(retvalue);
    res.status(200).json(retvalue);
    /*res.status(200).json(
        {message:'Hello from Server'+req.params.msg}
    )*/
}
@Put(':msg')
    private putMessage(req: Request, res: Response) {
        Logger.Info(req.body.msg);
        return res.status(400).json({
            error: req.body.msg,
        });
    }

    @Post(':msg')
    private postMessage(req: Request, res: Response) {
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