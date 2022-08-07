const { Router } = require('express');

const router = require('express').Router();
const status = require('./status');

router.get("/", (req, res) => {
    res.status(200).send("Different API Routes Available:\nstatus/");
})

router.use('/status', status)
module.exports = router;