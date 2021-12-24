const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs/promises")
const handlers = {}



function Server(req,res){
	const reqUrl = url.parse(req.url).pathname
	console.log(req.url)
	if(handlers[reqUrl]){
		return handlers[reqUrl][req.method](req,res)
	}else{
		return res.end("Cannot metod error")
		// return renderFile(req,res,reqUrl,req.method)
	}
}


function Express() {
	this.server = http.createServer(Server)
	this.get = function(path,colbackHandler){
		handlers[path] = handlers[path] || {}
		handlers[path]["GET"] = colbackHandler
	}


	this.listen = function(PORT,colback){
		this.server.listen(PORT,colback)
	}
}



module.exports = Express