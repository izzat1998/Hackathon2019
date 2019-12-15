import models from '../models';

function find(where, res, next, attributes) {
    models.Complain.findAll({
        where,
        attributes,
        include: [
            {
                model: models.User,
                as: 'user'
            },
            {
                model: models.Category,
                as: 'category'
            },
            {
                model: models.SubCategory,
                as: 'subCategory'
            },
        ]
    })
    .then(categories => next(categories))
    .catch(error => res.status(502).json({ error }))
}

export default {
    getAll(req, res) {
        const where = {};
        if(req.query) {
            Object.keys(req.query).forEach(key => {
                where[key] = req.query[key]
            })
        }
        find(where, res, (categories) => {
            res.status(200).json(categories);
        })
    },
    getUserComplain(req, res) {
        const where = {
            userId: req.userId
        };
        if(req.query) {
            Object.keys(req.query).forEach(key => {
                where[key] = req.query[key]
            })
        }
        find(where, res, (categories) => {
            res.status(200).json(categories);
        })
    },
    create(req, res) {
        models.Complain.create(req.Complain)
        .then(() => {
            res.send(201)
        }).catch(error => res.status(501).json(error))
    },
    approve(req, res) {
        models.Complain.update({
            status: 1
        }, { where: { id: req.params.id } })
        .then(() => res.send(200))
        .catch(error => res.status(501).json(error))
    },
    reject(req, res) {
        models.Complain.update({
            status: -1
        }, { where: { id: req.params.id } })
        .then(() => res.send(200))
        .catch(error => res.status(501).json(error))
    },
    delete(req, res) {
        models.Complain.destroy({ where: { id: req.params.id } })
        .then(() => res.send(202))
        .catch(error => res.status(501).json(error))
    }
}