const Employee = require("../models/employee");

// Create employee
exports.createEmployee = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const resume = req.file ? req.file.path : null;

        const employee = await Employee.create({ name, email, role, resume });
        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate("role");
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get employee by ID
exports.get
