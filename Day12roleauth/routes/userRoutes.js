const express = require("express")
const app = express.Router()
const userController = require('../controller/userController.js')

app.post("/register", userController.register)
app.post("/login", userController.login)
app.get("/logout", userController.logout)

module.exports = app