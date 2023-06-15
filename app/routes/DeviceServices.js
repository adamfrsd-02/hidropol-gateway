const express = require("express"),
    router = express.Router(),
    apiAdaptor = require("./ApiAdaptor");

const BASE_URL = process.env.DEVICE_URL;
const api = apiAdaptor(BASE_URL);


router.get('/devices', async (req, res) => {
    api.get('/api/v1/devices').then(response => {
        const resp = response.data;
        return res.status(200).json(resp);
    })
});

module.exports = router;