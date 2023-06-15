const axios = require('axios');

const apiAdaptor = (BASE_URL) => {
    return axios.create({
        baseURL: BASE_URL
    })
}


module.exports = apiAdaptor;