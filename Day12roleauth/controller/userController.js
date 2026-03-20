const User = require("../model/user.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Register
const register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body
          if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.json({ message: "User already exists" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullName,
            email,
            password: hashPassword,
            role
        })

        res.json({
            message: "User successfully registered ✅"
        })

    } catch (err) {
        res.json({ message: err.message })
    }
}

// Login (basic fix)
const login = async (req, res) => {
    try{
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ message: "User not found ❌" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.json({message:"invalid password"})
    }
    const token = jwt.sign({
        id:user._id,
        role:user.role
    },
    process.env.JWT_SECRET,{expiresIn:"1d"})
    req.session.token=token

    res.json({ message: "Login successfu;;y",token })
}  catch(err){
    res.json({message:"err", err})
}
}
const logout = async(req,res)=>{
    req.session.destroy(()=>{
        res.clearCookie("connect.sid")
        res.json({message:"Logout succesfully"})
    })
}
module.exports = { register, login ,logout }