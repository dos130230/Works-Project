let admin = window.localStorage.getItem("user")
let js = JSON.parse(admin || "[]")

if(admin && js.user==true)  window.location = "/"


const backend = "http://192.168.43.94:4001" 


let username = document.querySelector('#username')
let password = document.querySelector('#psw')
let age = document.querySelector('#age')
let submit = document.querySelector('.all-page')
let select = document.querySelector('#gender')

let gender = ''
select.onchange = event =>{
    gender = event.target.value
}

submit.onsubmit = async (event)=>{
    event.preventDefault()

    let allUsers = await fetch(backend+"/users")
    let promise = await allUsers.json()
    let id = promise.length?promise[promise.length-1].userId+1:1


    if (username.value.length > 50) alert("Your name must be 50 letters long!")
    else if (password.value.length != 8) alert("Password must be 8 symbol!")
    else if (!((/[0-9]/).test(password.value) && (/[a-z]/).test(password.value) && (/[A-Z]/).test(password.value) && (/[!,@,#,$,%,^,&,*,?,/,+,-]/).test(password.value))){
        alert('The password (A, b, 1, &) must contain these symbols!')
    }
    else{
        gender = gender || 'male'
        
        let response = await fetch(backend + '/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                userName: username.value,
                password: password.value,
                gender,
                date: age.value
            })

        })

        window.localStorage.setItem("user",JSON.stringify({
            user:true,
            userId:id,
            userName:username.value
        }))

        username.value = null
        password.value = null
        age.value = null
    }
    
    window.location = "/"
}