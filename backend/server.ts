import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import router from "./routes/route"

const port = 3000
const app = express()

//env設定
dotenv.config()

//cors設定
app.use(cors())

//json
app.use(express.json())

//画像のホスティング
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//セッション
const session = require("express-session")

declare module 'express-session' {
  interface SessionData {
    user: {
      name: string
      avatar: string 
    }
  }
}

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

//ルーティング
app.use(router);

//サーバー
app.listen(port, () => {
    console.log(`Serverを起動しました🚀 port: ${port}`)
})