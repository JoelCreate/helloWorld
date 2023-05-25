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

function clearInputField(){
    inputFieldEl.value = ""
}

sendButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value

    push(messagesInDB, inputValue)

    clearInputField()

})

onValue(messagesInDB)