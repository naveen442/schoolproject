const express = require('express');
const router = express.Router();
const { getgoals, postgoals, updategoals, deletegoals } = require('../controllers/goalscontroller');
const {protect}=require('../middleware/authmiddleware');
router.route('/').get(protect,getgoals).post(protect,postgoals);
router.route('/:id').put(protect,updategoals).delete(protect,deletegoals);

// router.get('/', getgoals);
// router.post('/', postgoals);
// router.put('/:id', updategoals);
// router.delete('/:id', deletegoals);

module.exports = router; 
