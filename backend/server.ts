import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/route"
import fileUpload from "express-fileupload"
import http from "http"
import { Server } from "socket.io"
import path from "path"
import session from "express-session"

const port = 3000
const app = express()


//uploadsフォルダ公開設定
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

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
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}));

//HTTPサーバーの作成
const server = http.createServer(app)

//socket.ioの設定
export const io = new Server(server, {
  cors: {
    origin: "*",
  }
})

io.on("connection", (socket) => {
  console.log("ユーザーが接続しました！")

  socket.on("disconnect", () => {
    console.log("ユーザーが退出しました")
  })
})

//ルーティング
app.use(router);

//サーバー
server.listen(port, () => {
    console.log(`Serverを起動しました🚀 port: ${port}`)
})