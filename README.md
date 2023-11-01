# Vue.js + Express + TypeScript Chatアプリ
Lineのグループチャットのようにリアルタイムでチャットできるアプリケーション

## ログイン画面
![loginpreview](/frontend/public/login.gif)

## チャット機能
![chatpreview](/frontend/public/chat.gif)

## 必要フレームワーク、ライブラリ、パッケージ、データベース,ミドルウェア
- **Frontend**
  - Vue.js (3.2)
  - TailwindCSS
  - socket.io-client (「チャットが送信された時」というイベントをキャッチするため)

- **Backend**
  - Express (フロントとバックで完全に独立。jsonでやり取り)
  - TypeScript
  - NodeMon
  - socket.io (「チャットが送信された時」というイベントを送信するため)
  - Prisma
  - CORS
  - dotenv
  
- **Database**
  - MySQL
  
- **Middleware**
  - express-session
  - express-static

## 機能
- フロントとバックを完全に独立させ、json形式でやり取りを行う
- ユーザーログイン機能
  - ユーザー名とアイコン画像をアップロードし、ログイン（login session作成）
  - ログイン画面でバリデーションを行う
- チャット機能
  - login sessionが存在する場合はチャットルーム、ない場合はログイン画面に遷移
  - リアルタイムグループチャットが可能
  - ログアウト機能（loginセッションの破棄）
- UI
  - 自分のチャットは右側、他人は左側に表示
  - スタイリングはTailwindCSS、DaisyUIを使用
- データ永続化
  - チャットの内容はDBに保存し永久化
  - Prismaを使用し、users, postsテーブルを作成

## DB構造
### users
- id (primary key, autoincrement)
- name
- image
- created_at

### posts
- id (primary key, autoincrement)
- user_id (foreign key, references users.id)
- message
- created_at

