const jwt = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, 'userHidropolX', (err, user) => {
                if (err) {
                    return res.sendStatus(401);
                    console.log(err);
                }

                req.user = user;
                
                const userData = {
                    username: user.user[0].username,
                    email: user.user[0].email,
                    phone: user.user[0].phone,
                    createdAt: user.user[0].createdAt
                }
                
                next();
            });
        } else {
            console.log('eror');
            res.sendStatus(401);
        }

    }
};