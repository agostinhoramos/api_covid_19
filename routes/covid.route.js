const express = require("express");
const router = express.Router();

const covid = require("../controllers/covid.controller");

router.get('/register', covid.register);
router.get('/day_more_cases', covid.day_more_cases);
router.get('/day_less_cases', covid.day_less_cases);
router.get('/between_dates/:start_date/:end_date', covid.between_dates);
router.post('/register', covid.set_register);

module.exports = router;