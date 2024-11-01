// ログイン画面用
'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword }
from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

// Your web app's Firebase configuration
import { firebaseConfig } from "./FB_myAuthKey.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(firebaseConfig);

// ログインボタンクリック時
// Authenticationのログイン機能
$("#login").on("click", function(){
    // console.log('ログイン実施');
    const myMail = document.getElementById("mymail").value;
    const myPass = document.getElementById("mypass").value;
    const $select = document.getElementById("select-partner").value;
    // メールとパスワードとトーク相手必須
    if(!myMail || !myPass || !$select){
        alert('メールアドレスとパスワードを入力してトーク相手を選んでください。');
        return;
    } 
    signInWithEmailAndPassword(auth, myMail, myPass)
    .then((userCredential) => {
        // console.log('ログイン成功');
        const user = userCredential.user;
        const userMail = user.email;
        // トーク画面に遷移
        // （email：ログインユーザメール、partnermail：プルダウン選択したパートナーのメール）
        location.href = `talk.html?email=${userMail}&partnermail=${$select}`;
    })
    .catch((error) => {
        alert('ログイン失敗');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
    });
});
