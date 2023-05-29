import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

sendButtonEl.addEventListener("click", function(){
    let textValue = textareaEl.value
    let sender = myName
    let messageID = message[0]
    let locationInDB = ref(database, `messages/${messageID}`)
    

    push(messagesInDB, textValue)
    push(locationInDB, sender)

    clearInputField()
})

function sendMessage(){

}


// function appendMessageToApp(message){
//     let messageID = message[0]
//     let messageValue = message[1]

//     let newEl = document.createElement("div")
//     newEl.innerHTML = `
//     <div class="message-added">
//         <div id="name">${myName}:</div>
//         <div id="message">${messageValue}</div>
//     </div>
//     `
//     messagesEl.append(newEl)
// }
