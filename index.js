const { json } = require('express');
const e = require('express');
const express = require('express');
const PORT = 2004;
const app = express();
const { existsSync, writeFileSync, readFileSync, truncateSync } = require("fs")

app.use(express.json())




function registerUsers(req, res) {
    const user = req.body
    console.log("Данные которые пришли от клиента: ", user)

    const users = JSON.parse(readFileSync("dbUsers.json", "utf-8"))
    console.log("Пользователи JSON файла ", users)

    const userExists = users.find(oneUser => oneUser.email ===user.email)

    if (userExists) {
        return res.status(400).json("Пользователь уже зарегистрирован")
    }

    users.unshift(user)
    truncateSync("dbUsers.json")
    writeFileSync("dbUsers.json", JSON.stringify(users))

    res.status(201).json("Регистрация прошла успешно!")
}

app.post("/register", registerUsers)

app.listen (PORT, () => {
    if (!existsSync("dbUsers.json")) {
        console.log("Файл не найден!")
    } else {
        console.log("Файл найден!")
    }
    console.log("SERVER HAS BEEN STARTED ON PORT: " + PORT)
})


