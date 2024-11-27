// server.js
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 80;

app.use(cors()); // CORS 허용

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.PORT) || 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// 기본 라우트 설정
app.get("/", (req, res) => {
  // user 테이블의 모든 데이터 가져오기
  connection.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.error("Error fetching data + test: " + err.stack);
      return res.status(500).send("Error fetching data");
    }
    res.json(results); // JSON 형식으로 응답
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
