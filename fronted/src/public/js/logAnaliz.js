const title = document.querySelector("#title")
const forma = document.querySelector(".all-page")
const pasw = document.querySelector("#pasw")

let admin = window.localStorage.getItem("user")
let js = JSON.parse(admin || "[]")

if(admin && js.user==true)  window.location = "/"



	const port = "http://192.168.43.94:4001/" 

forma.onsubmit= async (event)=> {
	event.preventDefault()
	let response = await fetch(port + 'users')
	let dataUsers = await response.json()

	let user = dataUsers.find(el=>(el.userName == title.value && el.password == pasw.value))
	if(!user) return window.location = "/login"

	window.localStorage.setItem("user",JSON.stringify({user:true,userId:user.userId,userName:user.userName}))

	let res = await fetch(port+"users",{
			method: "PUT", 
			headers: {
				'Content-type': 'application/json' 
			},
			body: JSON.stringify({
				userId:+user.userId,
				logout:true
			})
		})

	console.log(res)

	if(user){
		window.location ="/"
	}
}