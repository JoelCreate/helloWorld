import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://helloworld-c09a1-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messagesInDB = ref(database, "messages")

const inputFieldEl = document.getElementById("input-field")
const sendButtonEl = document.getElementById("send-btn")
const messagesEl = document.getElementById("messages")

function clearInputField() {
    inputFieldEl.value = ""
}

function clearMessageEl() {
    messagesEl.innerHTML = ""
}

function appendMessageToApp(message){
    let messageID = message[0]
    let messageValue = message[1]

    let newEl = document.createElement("div")
    newEl.className = "message-added"
    newEl.textContent = messageValue

    messagesEl.append(newEl)

    function messageDisappear() {
        let exactLocationOfItemInDB = ref(database, `messages/${messageID}`)
        remove(exactLocationOfItemInDB)
        messagesEl.classList.add('animate__animated', 'animate__bounceOut')
    }

    setTimeout(messageDisappear, 2000)    

}

sendButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value

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

