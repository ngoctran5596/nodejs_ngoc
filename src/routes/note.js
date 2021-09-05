const express = require ('express');
const router = express.Router();

const NoteController = require('../app/controllers/NoteController');

// newController.index;
router.get('/:id',NoteController.getByIdNote);
router.post('/create',NoteController.createNote);
// router.get('/stored/post',meController.postApp);


module.exports = router;