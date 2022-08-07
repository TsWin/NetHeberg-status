const { Router } = require('express');

const router = require('express').Router();
const v1Routes = require('./v1/Routes');

router.get("/", (req, res) => {
    res.status(200).send("Different API Versions Available:\n-v1/");
})

router.use('/v1/', v1Routes)
module.exports = router;