# ①課題名
- チャットアプリ（Line簡易版風）

## ②課題内容（どんな作品か）
授業で行ったRealtime Database全件表示、登録以外に下記機能を実装。

- ログイン画面・アカウント作成画面（Authentication機能）
- トーク画面で自分のトークを右側、相手のトークを左側に表示（Lineっぽく）
- トーク画面のトーク内容更新・削除機能（ラーニングシステムの動画を参考に）
- トーク画面でのサインアウト機能（Authentication機能）
- トーク画面で自分と相手のトークのみ表示する。
（他の相手先とのトーク内容は表示しないように制御）
- 画面遷移のパラメータ設定（前回は1つだけだったが今回は2つあるので実装方法変えてます）

## ③アプリのデプロイURL
デプロイしている場合はURLを記入（任意）
Slackの03_課題関連参照。

## ④アプリのログイン用IDまたはPassword（ある場合）
- ID: aaa@mail.com（山田）、bbb@mail.com（田中）、ccc@mail.com（鈴木）、ddd@mail.com（高橋）
- PW: firebase（共通）

## ⑤工夫した点・こだわった点
- 授業で習ったものをベースによりLineチャットっぽい感じに仕上げたのがこだわったところになります。  
※詳細は②課題内容に記載してます。

## ⑥難しかった点・次回トライしたいこと（又は機能）
【難しかった点】
- 授業ではHTMLファイルのscriptタグ内で書いてたのを
独自jsファイルでやりたかったのですが、Firebaseの機能がうんともすんとも言わず気づいたら数時間経っていたので、諦めて授業と同じ形でFirebase機能を実装しました。
- ログイン画面にトーク相手のプルダウンを用意したのですが、今回は固定表示となってます。  
Authenticationで全ユーザーの情報を取得する方法を調べたのですが、  
どうもAuthentication自体がセキュリティ重視で他ユーザーの情報取得不可っぽいので、  
動的にするのは諦めて固定表示にしました。

【次回トライしたいこと】
- よりLineっぽくするために既読機能やスタンプ（画像）投稿機能を実装したいです。
- 今後はCDNやnpmでインストールする手法で実装を進めるのがマストな気がするので、お作法をしっかり覚えたいです。
- 画面遷移をGETではなくPOSTで行うようにしたい。
- レスポンシブ・・・・・・・・・・・・・・・・。

## ⑦フリー項目（感想、シェアしたいこと等なんでも）
- 自分だけ課題の進め方が違う方向に向いている気がしますが・・・。  
今回は自分のスマホのLineを見てトークの表示位置が気になったので、  
チャットアプリを進めようと思いました。

- [参考記事]
  - 1. JavaScriptでページ遷移＆値渡し！5つの使い方を徹底解説
  　　 [https://jp-seemore.com/web/4885/]
  - 2. JavaScriptを使ってtextareaの高さを入力された内容に合わせて自動で可変させる方法
  　　　[https://urakata.me/blog/js-textarea-auto-height/]
  - 3. Firebase Authenticationドキュメント
  　　　[https://firebase.google.com/docs/auth?hl=ja&_gl=1*kit31t*_up*MQ..*_ga*MTM5NjMwNzk4Ny4xNzMwMTA2NDQ4*_ga_CW55HF8NVT*MTczMDEwNjQ0OC4xLjAuMTczMDEwNjQ0OC4wLjAuMA..]