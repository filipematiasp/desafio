const express = require('express')
const router = express.Router()
const { validateSeachDates } = require('../middlewares/validate')
const BrowserService = require('../services/BrowserService')

router.get('/', (req, res) => {
    res.send('Hello Asksuite World!');
});

router.post('/search', validateSeachDates, async (req, res) => {
    const { checkin, checkout } = req.body;
    const responseBroser = await BrowserService.getBrowser(checkin, checkout)
    return res.status(200).send(responseBroser)
});

module.exports = router;
