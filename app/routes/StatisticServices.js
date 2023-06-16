const express = require('express'),
    router = express.Router(),
    apiAdaptor = require('./ApiAdaptor');

const BASE_URL = process.env.SENSOR_URL;
const api = apiAdaptor(BASE_URL);

router.get('/sensor_statistics', (req, res) => {
    api.get('/api/v1/sensors').then(response => {
        const resp = response.data;
        return res.status(200).json(resp);
    })
});

module.exports = router;