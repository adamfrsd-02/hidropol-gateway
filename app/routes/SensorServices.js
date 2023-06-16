const express = require('express'),
    router = express.Router(),
    apiAdaptor = require('./ApiAdaptor');


const BASE_URL = process.env.SENSOR_URL;
const api = apiAdaptor(BASE_URL);

router.get('/latest_sensor', (req, res) => {
    api.get('/api/v1/sensors').then(response => {
        const resp = response.data;
        //get latest data from each key in data and exclude the undefined key
        const latest = resp.data.reduce((acc, cur) => {
            if (cur.value !== undefined) {
                acc[cur.sensor_name] = cur.value;
            }
            return acc;
        }, {});

        // const latest = resp.data.reduce((acc, cur) => {
        //     if (acc[cur.sensor_name] != undefined) {
        //         if (acc[cur.sensor_name].timestamp < cur.timestamp) {
        //             acc[cur.sensor_name] = cur;
        //         }
        //     } else {
        //         acc[cur.sensor_name] = cur;
        //     }
        //     return acc;
        // }, {});

        
        return res.status(200).json(latest);
    })
});


router.post('/sensors', (req, res) => {

    if(req.body.sensor_name === '' || req.body.value === '' || Object.keys(req.body).length === 0){
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