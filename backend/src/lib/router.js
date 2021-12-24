const http = require("http")
const url = require("url")
const handlers = {}




function Server(req,res) {
	console.log(req.url)
	const reqUrl = url.parse(req.url).pathname
	  // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.43.94:4000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
   

	if(handlers[reqUrl] && handlers[reqUrl][req.method]){
		return	handlers[reqUrl][req.method](req,res)
	}else{
		return res.end("Cannot pages")
	}
}


function  Express() {
	this.server = http.createServer(Server)

	this.get = function(path,colbackHandler){
		handlers[path] = handlers[path] || {}
		return handlers[path]["GET"] = colbackHandler
	}

	this.post = function(path,colbackHandler){
		handlers[path] = handlers[path] || {}
		return handlers[path]["POST"] = colbackHandler
	}
	this.put = function(path,colbackHandler){
		handlers[path] = handlers[path] || {}
		return handlers[path]["PUT"] = colbackHandler
	}

	this.delete = function(path,colbackHandler){
		handlers[path] = handlers[path] || {}
		return handlers[path]["DELETE"] = colbackHandler
	}

	this.listen = function(PORT,colback){
		return this.server.listen(PORT,colback)
	}
}



module.exports = Express