const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/User");
const Service = require("../models/Service");
const Order = require("../models/Order");

const getUserFromToken = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }

  return user;
};

//Register
exports.register = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.json({ message: "user already exists" });
        }
        
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullname,
            email,
            password: hashpassword,
            role
        });
        
        res.json({ message: "user registered successfully", user });
    } catch (error) {
        res.json({ error: error.message });
    }
};

//Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Send Success Response
        res.status(200).json({
            token,
            users: {
                fullname: user.fullname,
                role: user.role
            }
        });

    } catch (error) {
        console.error("🔥 Detailed Server Error:", error.message);
        res.status(500).json({ error: "Server error during login" });
    }
};

//Logout (client side token remove)
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ message: "Logout successful" });
    });
};

// Get Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const totalRegularUsers = await User.countDocuments({ role: 'user' });
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

        res.json({
            totalUsers,
            totalAdmins,
            totalRegularUsers,
            recentUsers
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Service Management Methods

// Add Service
exports.addService = async (req, res) => {
    try {
        const { title, description, image, price, duration } = req.body;
        
        if (!title) {
            return res.status(400).json({ message: "Service title is required" });
        }

        const newService = await Service.create({
            title,
            description: description || '',
            image: image || '/images/default-service.jpg',
            price: price || 0,
            duration: duration || '1 hour'
        });

        res.json({ message: "Service added successfully", service: newService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json({ services });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Service
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, price, duration, status } = req.body;

        const updatedService = await Service.findByIdAndUpdate(
            id,
            { title, description, image, price, duration, status },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json({ message: "Service updated successfully", service: updatedService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create Order
exports.createOrder = async (req, res) => {
    try {
        const { items, totalCost, totalTime } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const user = await getUserFromToken(req);
        console.log('Creating order for user:', user._id, user.fullname);

        const newOrder = await Order.create({
            userId: user._id,
            userName: user.fullname,
            userEmail: user.email,
            items,
            totalCost: Number(totalCost) || 0,
            totalTime: totalTime || '0m',
            status: 'pending'
        });

        console.log('Order created successfully:', newOrder._id);
        res.json({ 
            message: "Booking request submitted successfully!", 
            order: newOrder 
        });
    } catch (error) {
        console.error('Order creation error:', error.message);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError' || error.status === 401) {
            return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
        }
        res.status(500).json({ error: error.message || 'Failed to create order' });
    }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        console.log('Admin fetched', orders.length, 'total orders');
        res.json({ orders });
    } catch (error) {
        console.error('Error fetching all orders:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get User Orders
exports.getUserOrders = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        console.log('Fetching orders for user:', user._id, user.fullname);
        
        const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 });
        console.log('Found', orders.length, 'orders for user');
        
        res.json({ orders });
    } catch (error) {
        console.error('Error retrieving user orders:', error.message);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError' || error.status === 401) {
            return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
        }
        res.status(500).json({ error: error.message || 'Failed to retrieve orders' });
    }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'in progress', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        console.log('Updating order', id, 'to status:', status);

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        console.log('Order updated successfully');
        res.json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order status:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Delete Order (Service Request)
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Admin attempting to delete order:', id);

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Only allow deletion of completed or cancelled orders
        if (order.status !== 'completed' && order.status !== 'cancelled') {
            return res.status(400).json({ 
                message: 'Can only delete completed or cancelled orders. Current status: ' + order.status 
            });
        }

        const deletedOrder = await Order.findByIdAndDelete(id);
        console.log('Order deleted successfully:', id);

        res.json({ 
            message: 'Service request deleted successfully',
            order: deletedOrder
        });
    } catch (error) {
        console.error('Error deleting order:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Delete Service
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
