const PORT = process.env.PORT || 4001
const host  = require("./lib/network.js")
const Express = require("./lib/router.js")
const fs = require("fs/promises")
const path = require("path")
const app = new Express()


app.get("/todos",async (req,res)=>{
	let file = await fs.readFile(path.join(__dirname,"database","todos.json"),"UTF-8") || "[]"
	res.writeHead(200,{"Content-Type":"application/json"})
	res.end(file)
})

app.post("/todos",async(req,res)=>{
	let data = ""
	req.on("data",(buffer)=>{data+=buffer})

	req.on("end",async ()=>{
		data = JSON.parse(data||"{}")
		const {userId,title,message,hours} = data
		if(!title || title.length>=100) return res.end("Invalid title")
		if(!message || message.length>=300) return res.end("Invalid message")

		let file = await fs.readFile(path.join(__dirname,"database","todos.json"),"UTF-8")||"[]"
		file = JSON.parse(file || '[]')
		let newtodos = {userId,title,message,hours}
		file.push(newtodos)
		await fs.writeFile(path.join(__dirname,"database","todos.json"),JSON.stringify(file,null,4))
		res.writeHead(200,{"Content-Type":"application/json"})
		return	res.end(JSON.stringify(newtodos))
	})

})


app.delete("/todos",async(req,res)=>{
	let data = ""
	req.on("data",(buffer)=>{data+=buffer})

	req.on("end",async ()=>{
		data = JSON.parse(data||"{}")
		const {userId,title,message,hours} = data
		let file = await fs.readFile(path.join(__dirname,"database","todos.json"),"UTF-8")||"[]"
		file = JSON.parse(file || '[]')
		let index = file.findIndex(el=>el.userId == userId && el.title== title && el.hours ==hours)
		let removedtodos =  file.splice(index,1)
		await fs.writeFile(path.join(__dirname,"database","todos.json"),JSON.stringify(file,null,4))
		res.writeHead(200,{"Content-Type":"application/json"})
		return	res.end(JSON.stringify(removedtodos))
	})

})




// ======================================dons ==================================

app.get("/dons",async (req,res)=>{
	let file = await fs.readFile(path.join(__dirname,"database","dons.json"),"UTF-8")||"[]"
	res.writeHead(200,{"Content-Type":"application/json"})
	res.end(file)
})

app.post("/dons",async(req,res)=>{
	let data = ""
	req.on("data",(buffer)=>{data+=buffer})

	req.on("end",async ()=>{
		data = JSON.parse(data||"{}")
		const {userId,title,message,hours} = data
		
		let file = await fs.readFile(path.join(__dirname,"database","dons.json"),"UTF-8") || "[]"
		file = JSON.parse(file || '[]')
		let newtodos = {userId,title,message,hours}
		file.push(newtodos)
		await fs.writeFile(path.join(__dirname,"database","dons.json"),JSON.stringify(file,null,4))
		res.writeHead(200,{"Content-Type":"application/json"})
		return	res.end(JSON.stringify(newtodos))
	})

})


app.delete("/dons",async(req,res)=>{
	let data = ""
	req.on("data",(buffer)=>{data+=buffer})

	req.on("end",async ()=>{
		data = JSON.parse(data||"{}")
		const {userId,title,message,hours} = data
		let file = await fs.readFile(path.join(__dirname,"database","dons.json"),"UTF-8") || '[]'
		file = JSON.parse(file || '[]')
		let index = file.findIndex(el=>el.userId == userId && el.title== title && el.hours ==hours)
		let removedtodos =  file.splice(index,1)
		await fs.writeFile(path.join(__dirname,"database","dons.json"),JSON.stringify(file,null,4))
		res.writeHead(200,{"Content-Type":"application/json"})
		return	res.end(JSON.stringify(removedtodos))
	})

})

// ======================================done ==================================



app.get("/done",async (req,res)=>{
	let file = await fs.readFile(path.join(__dirname,"database","done.json"),"UTF-8") || "[]"
	res.writeHead(200,{"Content-Type":"application/json"})
	res.end(file)
})

app.post("/done",async(req,res)=>{
	let data = ""
	req.on("data",(buffer)=>{data+=buffer})

	req.on("end",async ()=>{
		data = JSON.parse(data||"{}")
		const {userId,title,message,hours} = data

		let file = await fs.readFile(path.join(__dirname,"database","done.json"),"UTF-8") || "[]"
		file = JSON.parse(file || '[]')
		let newtodos = {userId,title,message,hours}
		file.push(newtodos)
		await fs.writeFile(path.join(__dirname,"database","done.json"),JSON.stringify(file,null,4))
		res.writeHead(200,{"Content-Type":"application/json"})
		return	res.end(JSON.stringify(newtodos))
	})

})


app.delete("/done",async(req,res)=>{
	let data = ""
	req.on("data",(buffer)=>{data+=buffer})

	req.on("end",async ()=>{
		data = JSON.parse(data||"{}")
		const {userId,title,message,hours} = data
		let file = await fs.readFile(path.join(__dirname,"database","done.json"),'UTF-8') || "[]"
		file = JSON.parse(file || '[]')
		let index = file.findIndex(el=>el.userId == userId && el.title== title && el.hours ==hours)
		let removedtodos =  file.splice(index,1)
		await fs.writeFile(path.join(__dirname,"database","done.json"),JSON.stringify(file,null,4))
		res.writeHead(200,{"Content-Type":"application/json"})
		return	res.end(JSON.stringify(removedtodos))
	})

})



app.listen(PORT,()=>console.log(`server on  http://${host}:${PORT}`))



// ======================================users====================================



app.get("/users",async (req,res)=>{
	let file = await fs.readFile(path.join(__dirname,"database","users.json"),"UTF-8")||"[]"
	res.writeHead(200,{"Content-Type":"application/json"})
	return res.end(file)
})


app.post("/users",async (req,res)=>{
	 let newUser = ''
    req.on('data',(buffer)=> newUser += buffer)
    req.on('end',async ()=>{
    	let obj= {}
      newUser = newUser ? JSON.parse(newUser) : {}
      let users = await fs.readFile(path.join(__dirname, "database", "users.json"),'UTF-8')
      users = users ? JSON.parse(users) : []
      if (newUser.userName.length > 50 || newUser.password.length != 8) return res.end("Error")
      if (!((/[0-9]/).test(newUser.password) && (/[a-z]/).test(newUser.password) && (/[A-Z]/).test(newUser.password) && (/[!,@,#,$,%,^,&,*,?,/,+,-]/).test(newUser.password))){
        return  res.end('Password cannot!')
      }


      newUser.userId = users.length ? users[users.length -1].userId +1 : 1
      newUser.logout = true
      users.push(newUser)
      await fs.writeFile(path.join(__dirname, "database", "users.json"),JSON.stringify(users,null,4))
      res.writeHead(200,{'Content-Type': 'application/json'})
      return res.end(JSON.stringify({message: "Received!",data: newUser}))

    })  
})



app.put("/users",async (req,res)=>{
	let updateUser = ''
    req.on('data',(buffer)=> updateUser += buffer)
    req.on('end',async ()=>{
      updateUser = updateUser ? JSON.parse(updateUser || "{}") : {}
      let users = await fs.readFile(path.join(__dirname, "database", "users.json"),'UTF-8')

      users = users ? JSON.parse(users || "[]") : []

      for (let user of users){
        if (updateUser.userId == user.userId){
          user.logout = updateUser.logout
        }
      }
      
      await fs.writeFile(path.join(__dirname, "database", "users.json"),JSON.stringify(users,null,4))
      res.writeHead(200,{'Content-Type':'application/json'})
      return res.end(JSON.stringify({message: "User updated!",data: updateUser}))
    })
})















