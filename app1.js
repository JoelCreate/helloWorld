import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://helloworld-c09a1-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messagesInDB = ref(database, "messages")

const textareaEl = document.getElementById("textarea")
const sendButtonEl = document.getElementById("send-btn")
const messagesEl = document.getElementById("messages")
let myName = prompt("Hi friend! What's you name?")

const randomColor = Math.floor(Math.random()*16777215).toString(16)
const userName = document.querySelector(".name")


sendButtonEl.addEventListener("click", function(){
    let textValue = textareaEl.value

    set(messagesInDB, {
        sender: myName,
        message: textValue
    })

    clearTextArea()
})


onValue(messagesInDB, function(snapshot){
    let sender = snapshot.val().sender
    let newMessage = snapshot.val().message

    let newEl = document.createElement("div")
        newEl.innerHTML = `
        <div class="message-added">
            <div class="name">${sender}:</div>
            <div id="message">${newMessage}</div>
        </div>
        `
        messagesEl.append(newEl) 
 
})

function clearTextArea() {
    textareaEl.value = ""
}

function randomColorOfName() {
    userName.style.color = "#" + randomColor
}
randomColorOfName()

function messageDisappearInDB() {   
    //remove from DB
    let exactMessageInDB = ref(database, "messages")   
    remove(exactMessageInDB)  
}

// function messageDisappearInApp(){
//     let messageAdded = document.querySelector('.message-added')
//     messageAdded.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__faster')
// }

setTimeout(messageDisappearInDB, 3000) 

