import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/route"
import fileUpload, { UploadedFile } from "express-fileupload"

const port = 3000
const app = express()

//fileupload設定
app.use(fileUpload())

//env設定
dotenv.config()

//cors設定
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

//json
app.use(express.json())

//セッション
const session = require("express-session")

declare module 'express-session' {
  interface SessionData {
    user: {
      id: number
      name: string
      avatar: string 
    }
  }
}

app.use(session({
  secret: 'session_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 30
  }
}));

//ルーティング
app.use(router);

//サーバー
app.listen(port, () => {
    console.log(`Serverを起動しました🚀 port: ${port}`)
})