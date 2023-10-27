import express from "express"
import session from "express-session"
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
if (!process.env.SESSION_SECRET_KEY) {
  throw new Error('SESSION_SECRET_KEY is not defined.')
}

const sessionSecretKey = process.env.SESSION_SECRET_KEY || 'default_secret_key'

app.use(session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true
}));

//ルーティング
app.use(router);

//サーバー
app.listen(port, () => {
    console.log(`Serverを起動しました🚀 port: ${port}`)
})