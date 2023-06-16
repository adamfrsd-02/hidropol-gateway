const express = require('express'),
    router = express.Router(),
    sensorService = require('./SensorServices'),
    statisticService = require('./StatisticServices'),
    deviceService = require('./DeviceServices'),
    middleware = require('../middleware/checkUser'),
    authService = require('./AuthServices');

router.use((req, res, next) => {
    console.log("Called: ", req.path);
    next();
});

router.use(authService);
router.use(sensorService);
router.use(middleware.checkToken, statisticService);
router.use(middleware.checkToken, deviceService);

module.exports = router;