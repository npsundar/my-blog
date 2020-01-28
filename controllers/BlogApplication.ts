'use strict'
import fs from 'fs';
class BlogApplication{
    public getArticles():any{
    const myfile = require('fs');
    const rawdata = myfile.readFileSync('./source/Articles.json','utf8');
    const articles = JSON.parse(rawdata);
    // console.log(articles);
    return articles;
    }
}
export default BlogApplication;