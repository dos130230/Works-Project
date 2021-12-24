let admin = window.localStorage.getItem("user")
let js = JSON.parse(admin || "[]")


let rend = window.localStorage.getItem("render")
let son = JSON.parse(rend || "[]")



if(!admin && !js.user==true)  window.location = "/login"


const UsName = document.querySelector("#Name")
const plus = document.querySelector(".logo")
UsName.textContent = son.ism || ""


const port = "http://192.168.43.94:4001/" 

function createElements(...array){
	return array.map((el)=> document.createElement(el))
}

let list = document.querySelector('#myMenu')
let plan = document.querySelectorAll("#plan")



async function renderUser(port){
	let response = await fetch(port+"users")
	let dataUsers = await response.json()
	list.innerHTML = null
	for (let user of dataUsers){

		if(user.logout){
			let li = document.createElement('li')
			let a = document.createElement('a')
			a.href = "#"
			a.textContent = user.userName
			li.append(a)
			list.append(li)
			
			li.onclick = (event)=>{
				let disbl = true;

				UsName.textContent = user.userName
				let usID = window.localStorage.getItem("user")
					usID = JSON.parse(usID||"{}")

				if(usID.userId == user.userId) {
					disbl =false

				}
					

				RENDER(user.userId,"todos",disbl)
				RENDER(user.userId,"dons",disbl)
				RENDER(user.userId,"done",disbl)
				plus.disabled = disbl

				window.localStorage.setItem("render",JSON.stringify({id:user.userId,ism:user.userName}))
			}


		}

	}

}

renderUser(port)

async function RENDER(userId,path,disbl=true){
	
	let response = await fetch(port + `${path}`)
	let dataTodos = await response.json()
	let todos = document.querySelector(`.${path}`)
	todos.innerHTML = null
	for (let todo of dataTodos){
		if (todo.userId == userId){
			const [
			div,
			title,
			hour,
			message,
			select,
			optionTodos,
			optionDons,
			optionDone
			] = createElements("div","h2","p","p","select","option","option","option")

			optionTodos.value = "todos"
			optionDons.value = "dons"
			optionDone.value = "done"

			

		
			optionTodos.disabled = disbl
			optionDons.disabled = disbl
			optionDone.disabled = disbl
			
			

			optionTodos.textContent = "todos"
			optionDons.textContent = "dons"
			optionDone.textContent = "done"


			if(path == "todos") optionTodos.selected = true
			else if(path == "dons") optionDons.selected = true
			else if(path == "done") optionDone.selected = true
			



			select.id = 'plan'

			select.append(optionTodos, optionDons, optionDone)
			title.textContent = todo.title
			hour.textContent = todo.hours
			message.textContent = todo.message
			hour.className = 'price'
			div.className = 'card'
			div.setAttribute("name",path)

			div.append(title,message,hour,select)
			todos.append(div)

		}
	}





	let plan = document.querySelectorAll("#plan")
	plan.forEach(el=>{
		el.onchange = (event) =>{

			let type = el.value
			let list = document.querySelector(`.${type}`)
			let postion = (el.parentNode.getAttribute("name"))
			let nodes = (el.parentNode.childNodes)
			let obj = {
				"userId":+userId,
				"title":nodes[0].textContent,
				"message":nodes[1].textContent,
				"hours":nodes[2].textContent
			}

			fetch(port+postion,{
					 method: "DELETE", 
					 headers: {
					  'Content-type': 'application/json' 
								},
					body: JSON.stringify(obj) 
			})

			fetch(port+type,{
					 method: "POST", 
					 headers: {
					  'Content-type': 'application/json'  
								},
					body: JSON.stringify(obj) 
			})
			el.parentNode.setAttribute("name",type)

			list.appendChild(el.parentNode)


		}
	})

}








RENDER(son.id,"done",js.userId!=son.id)
RENDER(son.id,"todos",js.userId!=son.id)
RENDER(son.id,"dons",js.userId!=son.id)




let logout = document.querySelector("#logout")
logout.onclick = ()=>{
	let userId = window.localStorage.getItem("user")
	userId = JSON.parse(userId || "{}")
	userId = userId.userId
	window.localStorage.setItem("user","")
	console.log(userId)
	 fetch(port+"users",{
		 method: "PUT", 
		 headers: {
		  'Content-type': 'application/json' 
		},
		body: JSON.stringify({
			userId,
			logout:false
		})
	})
	window.location = "/login"

}


plus.onclick = ()=>{
	window.location = "/create"
}





