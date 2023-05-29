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

sendButtonEl.addEventListener("click", function(message){
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
            <div id="name">${sender}:</div>
            <div id="message">${newMessage}</div>
        </div>
        `
        messagesEl.append(newEl)
    
})

function clearTextArea() {
    textareaEl.value = ""
}

function messageDisappear() {  

    //remove from DB
    let exactMessageInDB = ref(database, `messages/message`)   
    remove(exactMessageInDB)  

    // disappear from app
    let messageAdded = document.querySelector('.message-added')
    messageAdded.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__faster')
}

setTimeout(messageDisappear, 3000) 