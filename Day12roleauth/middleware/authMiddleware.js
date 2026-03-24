const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        const token = req.session.token   // session se token

        if (!token) {
            return res.status(401).json({ message: "Unauthorized ❌" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded   // { id, role }

        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid token ❌" })
    }
}

module.exports = authMiddleware