const express = require('express')
const app = express()

app.set("view engine", 'ejs')
app.use(express.static('public'))
// app.get("/", (req, res) => {
//     res.render("index", {
//         fullName: "Shail",
//         isLoggedIn: true
//     });
// });
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/service", (req, res) => {
    res.render("service");
});
app.get("/contact", (req, res) => {
    res.render("contact");
});
const PORT =5000
app.listen(PORT, (req,res)=>{
    console.log(`server is running on ${PORT}`)
})