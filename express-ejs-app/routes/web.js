const express = require("express")
const router = express.Router()
const { about, services, team, clients } = require("../public/data")
const Service = require("../models/Service")
const userController=require("../controller/userController")
const {checkAdminRole} = require("../middleware/checkrole")

router.get('/', async (req, res) => {
  try {
    const dbServices = await Service.find({ status: 'active' }).sort({ createdAt: -1 });
    res.render('index', {
      about,
      services: dbServices.length > 0 ? dbServices : services,
      team,
      clients
    });
  } catch (error) {
    console.error('Error loading home services:', error);
    res.render('index', { about, services, team, clients });
  }
})
router.get('/about', (req, res) => {
  res.render('about')
})
router.get('/service', async (req, res) => {
  try {
    const dbServices = await Service.find({ status: 'active' }).sort({ createdAt: -1 });
    res.render('service', { services: dbServices.length > 0 ? dbServices : services });
  } catch (error) {
    console.error('Error loading service page:', error);
    res.render('service', { services });
  }
})
router.get('/contact', (req, res) => {
  res.render('contact')
})


router.get("/login", (req, res) => {
    res.render("login")
})
router.get("/register", (req, res) => {
    res.render("register")
})
router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/logout",userController.logout)

// User dashboard route
router.get("/user/dashboard", (req, res) => {
    res.render("user-dashboard")
})
router.get("/admin/dashboard", (req, res) => {
    res.render("admin-dashboard")
})
router.get("/admin/login", (req, res) => {
    res.render("admin-login")
})

// Dashboard API endpoints
router.get("/dashboard-stats", checkAdminRole, userController.getDashboardStats)
router.get("/all-users", checkAdminRole, userController.getAllUsers)

// Order endpoints
router.post("/orders", userController.createOrder)
router.get("/orders", checkAdminRole, userController.getAllOrders)
router.get("/user/orders", userController.getUserOrders)
router.put("/orders/:id", checkAdminRole, userController.updateOrderStatus)
router.delete("/orders/:id", checkAdminRole, userController.deleteOrder)

// Service Management endpoints
router.post("/services", checkAdminRole, userController.addService)
router.get("/services", checkAdminRole, userController.getAllServices)
router.put("/services/:id", checkAdminRole, userController.updateService)
router.delete("/services/:id", checkAdminRole, userController.deleteService)

module.exports=router