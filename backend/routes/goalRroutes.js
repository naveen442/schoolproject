const express = require('express');
const router = express.Router();
const { getgoals, postgoals, updategoals, deletegoals } = require('../controllers/goalscontroller');

router.route('/').get(getgoals).post(postgoals);
router.route('/:id').put(updategoals).delete(deletegoals);

// router.get('/', getgoals);
// router.post('/', postgoals);
// router.put('/:id', updategoals);
// router.delete('/:id', deletegoals);

module.exports = router; 
