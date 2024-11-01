// トーク画面用
'use strict';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved, update, onChildChanged } 
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { getAuth, signOut }
from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { firebaseConfig } from "./FB_myAuthKey.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);    // Realtimedatabaseに接続
const dbRef = ref(db, "chat");
console.log(firebaseConfig);

const $message = document.getElementById('message');
const ch = $message.clientHeight;   // メッセージの高さ
const $header = document.querySelector('header');
const hch = $header.clientHeight;   // ヘッダー全体の高さ
let loginMail;  // ログインしたメールアドレス
let partnerMail;    // トーク相手のメールアドレス
let myName;

// メールアドレスから名前を取得するためのオブジェクト
const userInfo = {
    userA: {mail: 'aaa@mail.com', name: '山田'},
    userB: {mail: 'bbb@mail.com', name: '田中'},
    userC: {mail: 'ccc@mail.com', name: '鈴木'},
    userD: {mail: 'ddd@mail.com', name: '高橋'},
    userE: {mail: 'eee@mail.com', name: '橋本'},
    userF: {mail: 'fff@mail.com', name: '長州'},
    userG: {mail: 'ggg@mail.com', name: '猪木'}
};

// ロード時（リロード時）処理
window.addEventListener('load', function(){
    // ログイン画面からのパラメータ（ログインメール、相手先メール）を受け取る
    const url = new URLSearchParams(location.search);
    loginMail = url.get('email');
    partnerMail = url.get('partnermail');
    // console.log(loginMail + '：' + partnerMail);
    
    // ログインメールに合致した名前を取得
    const userObj = Object.values(userInfo);
    const matchUserObj = userObj.find(({ mail }) => mail === loginMail);
    myName = matchUserObj.name;
    // console.log(myName);
    // 相手先メールに合致した名前を取得
    const matchPartnerObj = userObj.find(({ mail }) => mail === partnerMail);
    const partnerName = matchPartnerObj.name;
    $("#uname").val(partnerName);
});

// メッセージ入力時
// メッセージ改行時にメッセージの高さを自動調整する。
// また、ヘッダー部全体の高さも自動調整する。
$message.addEventListener('input', ()=>{
    $message.style.height = ch + 'px';
    const sh = $message.scrollHeight;
    $message.style.height = sh + 'px';

    $header.style.height = hch + 'px';
    const hsh = $header.scrollHeight;
    $header.style.height = hsh + 'px';
});

// 送信ボタンクリック
$("#send").on("click", function(){
    // 現在日付を取得
    const ymd = new Date().toLocaleDateString('ja-JP'); // yyyy/mm/dd形式で取得
    const time = new Date().toLocaleTimeString('ja-JP', {hour12: false});   // hh:mm:ss形式で取得
    const curDatetime = ymd + ' ' + time;
    // RealtimeDatabase（chatへの登録情報を設定）
    const talk = {
        uname: myName,   // 自分の名前
        text: $("#message").val(),  // トーク内容
        datetime: curDatetime,  // 投稿日付
        email: loginMail,   // 自分のメールアドレス
        partner: partnerMail    // トーク相手のメールアドレス
    }
    const id = push(dbRef); // ユニークKEY取得
    set(id, talk);
    // $("#uname").val("");
    // 登録後の初期化処理（メッセージを空白、メッセージとヘッダー全体の高さを初期化）
    $("#message").val("");
    $message.style.height = 'auto';
    $header.style.height = 'auto';
});

// サインアウトボタン押下時
// Authenticationのサインアウト機能
// サインアウト後、ログイン画面に遷移
$("#signout").on("click",function(){
    const auth = getAuth();
    signOut(auth).then(() => {
        alert('サインアウトしました。');
        location.href = 'index.html';
    }).catch((error) => {
        alert('サインアウトでエラーが発生しました！');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
    });
});

// 削除イベント（キー単位）
$("#output").on("click", ".remove", function(){
        // console.log(this);
        const key = $(this).attr("data-key");
        const remove_item = ref(db, "chat/" + key); // chatのキーを指定
        remove(remove_item);    // キーに該当するデータのみ削除
});

// 削除がFirebase側で実行したらイベント発生
onChildRemoved(dbRef, (data) => {
    $("#" + data.key).remove();
});

// 更新イベント
$("#output").on("click", ".update", function(){
    const key = $(this).attr("data-key");
    update(ref(db, "chat/" + key), {
        text: $("#" +key+ "_update").html()
    });
});

// 更新処理
onChildChanged(dbRef, (data) => {
    $("#" +data.key+ "_update").html(data.val().text);
    $("#" +data.key+ "_update").fadeOut(800).fadeIn(800);
});

// 受信処理
onChildAdded(dbRef, function(data){
    const talk = data.val();    // obj取得
    // console.log(talk);
    const key = data.key;   // ユニークkey取得
    // console.log(key);
    let timeLine = talkDisp(talk, key, loginMail);
    $("#output").append(timeLine);
});

// トーク履歴の表示内容を設定する。
function talkDisp(talk, key, loginMail){
    let timeLine;
        timeLine = `<div class="talk-container" id="${key}">`
    // ログインユーザーのトーク内容表示
    // トーク内容は画面右側に表示する
    // 表示条件：ログインしたメルアドがchat用DBのemailと合致　かつ
    // 　　　　　ログインで選択した相手先メルアドがchat用DBのpartner（相手先メルアド）と合致
    if(loginMail === talk.email && partnerMail === talk.partner) {
        timeLine += `<p class="mytalk right">`;
        timeLine += talk.uname;
        timeLine += "<br>";
        timeLine += `<span contentEditable="true" id="${key}_update">${talk.text}</span>`;
        timeLine += "</p>";
        timeLine += '<div class="mytalkupdatearea">';
        timeLine += `<p class="datetime">${talk.datetime}</p>`;
        timeLine += `<p class="remove" data-key="${key}"><img src="img/delete.svg" alt="削除ボタン"></p>`;
        timeLine += `<p class="update" data-key="${key}"><img src="img/update.svg" alt="更新ボタン"></p>`;
        timeLine += "</div>";
    // 相手先のトーク内容表示
    // 相手先トーク内容は画面左側に表示する
    // 表示条件：ログインで選択した相手先メルアドchat用DBのemailと合致　かつ
    // 　　　　　ログインしたメルアドががchat用DBのpartner（相手先メルアド）と合致
    // 相手先のトークは更新・削除不可
    } else if(partnerMail === talk.email && loginMail === talk.partner) {
        timeLine += '<div class="partner-area">';
        timeLine += `<img src="img/matagunayo.png" alt="長州力の「またぐなよ」class="riki-matagunayo">`
        timeLine += '<p class="yourtalk left">';
        timeLine += talk.uname;
        timeLine += "<br>";
        timeLine += `<span id="${key}_update">${talk.text}</span>`;
        timeLine += "</p>";
        timeLine += "</div>";
        timeLine += '<div class="yourtalkupdatearea">';
        timeLine += `<p class="datetime">${talk.datetime}</p>`;
        // timeLine += `<p class="remove" data-key="${key}">削除</p>`;
        // timeLine += `<p class="update" data-key="${key}">更新</p>`;
        timeLine += "</div>";
    } else {
        // 対象外のトーク情報は表示しない。
        timeLine = ""
        return timeLine;
    }
    timeLine += "</div>";
    return timeLine;
};

