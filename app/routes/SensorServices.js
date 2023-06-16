const express = require('express'),
    router = express.Router(),
    apiAdaptor = require('./ApiAdaptor');


const BASE_URL = process.env.SENSOR_URL;
const api = apiAdaptor(BASE_URL);

router.get('/sensors', (req, res) => {
    api.get('/api/v1/sensors').then(response => {
        const resp = response.data;
        return res.status(200).json(resp);
    })
});

router.post('/sensors', (req, res) => {

    if(req.body.sensor_name === '' || req.body.value === '' || req.body == ''){
        return res.status(500).json({
            message: "Sensor data can't be empty!"
        });
    }

    if (!req.headers.authorization) {
        return res.status(500).json({
            message: "Authorization key not defined!"
        });
    }

    api.post('/api/v1/sensors', req.body, {
        headers:{
            'Authorization': `${req.headers.authorization}`
        }
    }).then(response => {

        return res.status(200).json(req.body);
    }).catch(err => {
        console.log('eror here');
        return res.status(500).json({
            message: "Authorization key not defined!"
        });
    })
})


module.exports = router;