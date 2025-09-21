const express = require('express');
const router = express.Router();
const CollegeAI = require('../services/collegeAI');

const collegeAI = new CollegeAI();

// POST /ask - Main endpoint for college AI queries
router.post('/ask', async (req, res) => {
    try {
        const { message, sessionId, name, email } = req.body;
        
        // Validate input
        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            });
        }
        
        // Update context if user info provided
        if (sessionId && (name || email)) {
            collegeAI.updateContext(sessionId, { name, email });
        }
        
        // Process the query
        const response = await collegeAI.processQuery(message, sessionId || 'api');
        
        res.json({
            success: true,
            response: response,
            timestamp: new Date().toISOString(),
            sessionId: sessionId || 'api'
        });
        
    } catch (error) {
        console.error('Error in /ask endpoint:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Unable to process your query at the moment. Please try again later.'
        });
    }
});

// GET /departments - Get all department information
router.get('/departments', (req, res) => {
    try {
        const departments = collegeAI.config.departments;
        res.json({
            success: true,
            departments: departments,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// GET /fees - Get fee structure
router.get('/fees', (req, res) => {
    try {
        const fees = collegeAI.config.fees;
        res.json({
            success: true,
            fees: fees,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching fees:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// GET /admission - Get admission information
router.get('/admission', (req, res) => {
    try {
        const admission = collegeAI.config.admission;
        res.json({
            success: true,
            admission: admission,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching admission info:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// GET /contact - Get contact information
router.get('/contact', (req, res) => {
    try {
        const contact = {
            phone: '+91-80-1234-5678',
            email: 'admissions@saividya.edu.in',
            website: collegeAI.config.college.website,
            address: 'Electronic City, Phase 2, Bangalore - 560100, Karnataka',
            officeHours: {
                weekdays: '9:00 AM - 5:00 PM',
                saturday: '9:00 AM - 1:00 PM',
                sunday: 'Closed'
            }
        };
        
        res.json({
            success: true,
            contact: contact,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching contact info:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// GET /college - Get college information
router.get('/college', (req, res) => {
    try {
        const college = collegeAI.config.college;
        res.json({
            success: true,
            college: college,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching college info:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        service: 'Sai Vidya Institute of Technology AI Receptionist',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

module.exports = router;
