import models from '../models';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

function find(where, res, next, attributes) {
    models.User.findAll({
        where,
        attributes
    }).then(users => {
        next(users);
    }).catch(error => res.status(502).json({ error })) /// 502 Database error
}

export default {
    login(req, res) {
        const { username, password } = req.body;
        find({ username }, res, ([user]) => {
            if (compareSync(password, user.password)) {
                sign({ userId: user.id }, process.env.TOKEN_KEY, {}, (error, token) => {
                    if (error) res.status(501).json({ error }) // Token error
                    else res.status(200).json({ token })
                })
            } else res.send(403)
        })
    },
    details(req, res) {
        find({ id: req.userId }, res, ([user]) => {
            res.status(200).json(user);
        }, ['id', 'username', 'firstName', 'secondName', 'image'])
    }
}