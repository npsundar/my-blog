'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class BlogApplication {
    getArticles() {
        const myfile = require('fs');
        const rawdata = myfile.readFileSync('./source/Articles.json', 'utf8');
        const articles = JSON.parse(rawdata);
        // console.log(articles);
        return articles;
    }
}
exports.default = BlogApplication;
//# sourceMappingURL=BlogApplication.js.map