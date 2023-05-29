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

sendButtonEl.addEventListener("click", function(){
    let textValue = textareaEl.value

    set(messagesInDB, {
        sender: myName,
        message: textValue
    })

    clearTextArea()
})


onValue(messagesInDB, function(snapshot){
    let messagesArray = Object.entries(snapshot.val())

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
    
    for( let i = 0; i < messagesArray.length; i++ ) {
        let currentMessage = messagesArray[i]
        let currentMessageID = [0]
        let currentMessageValue = [1]  
        removeMessage(currentMessage)
    }  
 
})

function clearTextArea() {
    textareaEl.value = ""
}



function removeMessage(message){
    let messageID = message[0]
    let messageValue = message[1]
    
    function messageDisappear() {      
        let exactMessageInDB = ref(database, `messages/${messageID}`)   
        remove(exactMessageInDB)  
        //messagesEl.classList.add('animate__animated', 'animate__fadeOutUp')             
        
        let messageAdded = document.querySelector('.message-added')
        messageAdded.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__faster')
    }
    setTimeout(messageDisappear, 3000) 
}



// function messageDisappearInApp(){
//     let messageAdded = document.querySelector('.message-added')
//     messageAdded.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__faster')
// }