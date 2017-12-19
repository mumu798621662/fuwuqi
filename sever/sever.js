var http = require('http');
var config=require('./config.json');
var path = require('path')
var fs=require('fs');
http.createServer(function (req,res) {
   var url = req.url;  //定义请求的路径
    if(url=="/favicon.ico"){//如果请求的路径是icon图标，什么都不显示
        res.end()
    }else{//如果请求的不是图标
        var root = path.resolve(config.root) //定义root为配置文件的根目录
        fs.readdir(root,function(err,data){ //异步地读取路径root的www
            if(err){ //如果读取不到，返回一个404的头信息
                res.writeHead(404,{"content-type":"text/html;charset=utf-8"});
                res.end("根目录不存在")
            }else{//能读取到www

                if(path.extname(url)){//就判断请求的路径是否带后缀，如果请求路径带后缀名，就访问这个带后缀名的路径
                    var fullUrl = path.join(__dirname,config.root,"."+url)
                }else{//否则默认访问配置文件中的index.html
                    var fullUrl = path.join(__dirname,config.root,"."+url+"/"+config.index)
                }

                //读取到www后读www下的文件
               fs.readFile(fullUrl,function(err,data){
                   if(err) {//www下如果没有文件，返回404头信息
                       res.writeHead(404, {"content-type": "text/html;charset=utf-8"});
                       res.end("页面不存在")
                   }else{//如果有文件，返回200成功头信息，
                       res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
                       res.end(data)//write到页面中
                   }
               })

            }

        })
    }
}).listen('8888')
