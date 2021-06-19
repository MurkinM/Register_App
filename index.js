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

    const userExists = users.find(oneUser => oneUser.email === user.email)

    if (userExists) {
        return res.status(400).json("Пользователь уже зарегистрирован")
    }

    users.unshift(user)
    truncateSync("dbUsers.json")
    writeFileSync("dbUsers.json", JSON.stringify(users))

    res.status(201).json("Регистрация прошла успешно!")
}

function loginUsers (req, res) {
    const login = req.body
    console.log("Логин и пароль клиента: ", login)

    const users = JSON.parse(readFileSync("dbUsers.json", "utf-8"))
    console.log("Пользователи JSON файла ", users)

    const loginCheck = users.find(userLogin => userLogin.email === login.email)
    if (loginCheck) {
        res.status(201).json("Вы успешно авторизовались!")
    } else if (userLogin => userLogin.email !== login.email) {
        res.status(400).json("Неправилный логин или пароль, попробуйте снова!")
    } else if (userLogin => userLogin.password !== login.password) {
        res.status(400).json("Такого пароля не существует!")
    } 
    
}


function deleteLogin (req, res) {
    const deletingLogin = req.body
    console.log("Логин и пароль клиента: ", deletingLogin)

    const users = JSON.parse(readFileSync("dbUsers.json", "utf-8"))
    console.log("Пользователи JSON файла ", users)

    const existingLogin = users.find(
        (item) => item.email === deletingLogin.email);

    const loginDelete = users.filter((oneLogin) => oneLogin.email !== users.email);


	if (!existingLogin) {
		return res.status(400).json('Логин не найден!');
	} else {
        res.status(202).json(loginDelete)
    }
}

app.delete("/delete", deleteLogin)
app.post("/login", loginUsers)
app.post("/register", registerUsers)

app.listen (PORT, () => {
    if (!existsSync("dbUsers.json")) {
        console.log("Файл не найден!")
    } else {
        console.log("Файл найден!")
    }
    console.log("SERVER HAS BEEN STARTED ON PORT: " + PORT)
})


