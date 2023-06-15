const express = require("express"),
    router = express.Router(),
    apiAdaptor = require("./ApiAdaptor");

const BASE_URL = process.env.AUTH_URL;
const api = apiAdaptor(BASE_URL);

router.post('/auth/login', (req, res) => {
    api.post('/api/v1/auth/login', req.body).then(response => {
        const status = res.statusCode;
        return res.status(status).json(response.data);
    }).catch((err) => {
        console.log(err.response.status);
        console.log(err.response.data);
        const status = err.response.status;

        switch (status) {
            case 422:
                return res.status(status).json({
                    message: "wrong username/password!"
                });
                break;

            case 500:
                return res.status(status).json({
                    message: err.response.data
                });
                break;

            case 400:
                return res.status(status).json({
                    message: err.response.data
                })

            case 404:
                return res.status(status).json({
                    message: "username/email not found!"
                });
                break;


        }

    });
});

router.post('/auth/register', (req, res) => {
    api.post('/api/v1/auth/register', req.body).then(response => {
        const status = res.statusCode;
        return res.status(status).json(response.data);
    }).catch((err) => {
        const status = err.response.status;

        switch (status) {
            case 409:
                return res.status(status).json(err.response.data);
                break;

            default:
                return res.status(status).json(err.response.data)
                break;
        }
    });
})

module.exports = router;