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
const myName = prompt("Hi friend! What's you name?")

function clearInputField() {
    textareaEl.value = ""
}

function clearMessageEl() {
    messagesEl.innerHTML = ""
}

function appendMessageToApp(message){
    let messageID = message[0]
    let messageValue = message[1]

    let newEl = document.createElement("div")
    newEl.innerHTML = `
    <div class="message-added">
        <div id="name">${myName}:</div>
        <div id="message">${messageValue}</div>
    </div>
    `
    messagesEl.append(newEl)

    function messageDisappear() {
        let exactMessageInDB = ref(database, `messages/${messageID}`)
        remove(exactMessageInDB)
        messagesEl.classList.add('animate__animated', 'animate__fadeOutUp')
    }

    setTimeout(messageDisappear, 2000)    

}

sendButtonEl.addEventListener("click", function(){
    let inputValue = textareaEl.value

    push(messagesInDB, inputValue)

    clearInputField()

})

onValue(messagesInDB, function(snapshot){
    let messagesArray = Object.entries(snapshot.val())

    clearMessageEl()

    for( let i = 0; i < messagesArray.length; i++ ) {
        let currentMessage = messagesArray[i]

        appendMessageToApp(currentMessage)

    }

   

})

