const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  getAll,
  create,
  update,
  archive,
  unarchive,
  remove
} = require('../controllers/vehicleController');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.patch('/:id_archive', auth, archive);
router.patch('/:id_unarchive', auth, unarchive);
router.delete('/:id', auth, remove);

module.exports = router;