// backend/routes/events.js
const router = require('express').Router();
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', getEvents);
router.post('/', authMiddleware, createEvent);  // Only logged-in users (faculty) can create
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

module.exports = router;
