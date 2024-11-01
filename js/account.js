// アカウント管理画面用
'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword }
from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

// Your web app's Firebase configuration
import { firebaseConfig } from "./FB_myAuthKey.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

$("#account").on("click", function(){
    const mail = document.getElementById("mymail").value;
    const password = document.getElementById("mypass").value;

    // メールとパスワード必須
    if(!mail || !password){
        alert('メールアドレスとパスワードを入力してください。');
        return;
    } 

    createUserWithEmailAndPassword(auth, mail, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const email = user.email;
        alert('アカウント作成成功 email：' + email);
        location.href = 'index.html';
    })
    .catch((error) => {
        alert('アカウント作成失敗');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
    });
});

