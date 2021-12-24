const PORT = process.env.PORT || 4000
const host = require("./lib/network.js")
const fs = require("fs/promises")
const path = require("path")
const Experess = require("./lib/router.js")
const app = new Experess()


app.get("/",async (req,res)=>{
	console.log(req.url)
	res.writeHead(200,{"Content-Type":"text/html"})
	res.end(await fs.readFile(path.join(__dirname,"views","homePages.html")))


})

app.get("/css/style.css",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"text/css"})
	res.end(await fs.readFile(path.join(__dirname,"public","css","style.css")))
})

app.get("/js/main.js",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"application/js"})
	res.end(await fs.readFile(path.join(__dirname,"public","js","main.js")))
})

app.get("/js/render.js",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"application/js"})
	res.end(await fs.readFile(path.join(__dirname,"public","js","render.js")))
})


// -------------------login pages-------------------

app.get("/login",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"text/html"})
	res.end(await fs.readFile(path.join(__dirname,"views","login.html")))
})


app.get("/login.css",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"text/css"})
	res.end(await fs.readFile(path.join(__dirname,"public","css","login.css")))
})

app.get("/js/logAnaliz.js",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"application/js"})
	res.end(await fs.readFile(path.join(__dirname,"public","js","logAnaliz.js")))
})



// -------------------registr pages-------------------

app.get("/register",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"text/html"})
	res.end(await fs.readFile(path.join(__dirname,"views","register.html")))
})


app.get("/register.css",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"text/css"})
	res.end(await fs.readFile(path.join(__dirname,"public","css","register.css")))
})

app.get("/js/register.js",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"application/js"})
	res.end(await fs.readFile(path.join(__dirname,"public","js","register.js")))
})


// -------------------addTodos pages-------------------

app.get("/create",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"text/html"})
	res.end(await fs.readFile(path.join(__dirname,"views","addTodos.html")))
})


app.get("/addTodos.css",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"text/css"})
	res.end(await fs.readFile(path.join(__dirname,"public","css","addTodos.css")))
})

app.get("/js/addTodos.js",async (req,res)=>{
	res.writeHead(200,{"Content-Type":"application/js"})
	res.end(await fs.readFile(path.join(__dirname,"public","js","addTodos.js")))
})


























app.listen(PORT,()=>console.log(`Connect server on http://${host}:${PORT}`))
