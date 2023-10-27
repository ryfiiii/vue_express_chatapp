# Vue.js + Express + TypeScript Chatアプリ
## 必要フレームワーク、ライブラリ、パッケージ、データベース,ミドルウェア
- **Frontend**
  - Vue.js (3.2)
  - TailwindCSS
  - DaisyUI
  - socket.io-client

- **Backend**
  - Express
  - TypeScript
  - NodeMon
  - socket.io
  - Prisma
  - CORS
  - dotenv
  
- **Database**
  - MySQL
  
- **Middleware**
  - express-session
  - express-static

## 機能
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

## ディレクトリ構造

/app

│ /backend (Express)

│ │ /controllers

│ │ │ - userController.ts

│ │ │ - messageController.ts

│ │ /prisma

│ │ │ /migrations

│ │ │ - schema.prisma

│ │ /models

│ │ │ - userModel.ts

│ │ │ - messageModel.ts

│ │ /routes

│ │ - route.ts

│ /uploads

│ │ /icons (アイコンを保存)

│ - server.ts

│

│ /frontend (Vue.js)

│ │ /src

│ │ │ /components

│ │ │ /views

│ │ │ - main.js (or main.ts)

│ │ - vue.config.js

│ - package.json

