const port = "http://192.168.43.94:4001/" 


const formList = document.querySelector("#formList")
const title = document.querySelector("#title")
const subject = document.querySelector("#subject")







formList.onsubmit =  (event)=>{
	event.preventDefault() 
	if(!title.value || !subject.value) return
	if(!title.value || title.value.length>=100) return 
	if(!subject || subject.value.length>=300) return 

	let id = window.localStorage.getItem("user")
	id = JSON.parse(id)

	const data = new Date()
	let hours = (data.getHours()+"").padStart(2,"0") + ":" + (data.getMinutes()+'').padStart(2,"0")
	let obj = {
		userId:+id.userId,
		title:title.value,
		message:subject.value,
		hours
	}

	fetch(port+"todos",{
		 method: "POST", 
		 headers: {
		  'Content-type': 'application/json' 
		},
		body: JSON.stringify(obj)
	})


	window.location = "/"
}