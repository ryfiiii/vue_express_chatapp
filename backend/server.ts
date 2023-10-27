import express from "express"
import session from "express-session"
import cors from "cors"
import path from "path"
import router from "./routes/route"

const port = 3000
const app = express()

//cors設定
app.use(cors())

//json
app.use(express.json())

//画像のホスティング
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//セッション
app.use(session({
    secret: env(""),
    resave: false,
    saveUninitialized: true
  }));

// ルートの設定
app.use(router);

// // エラーハンドリング
// app.use((err, req, res, next) => {
//   res.status(500).send(err.message);
// });

app.listen(port, () => {
    console.log(`Serverを起動しました🚀 port: ${port}`)
})