import models from '../models';

function find(where, res, next, attributes) {
    models.Category.findAll({
        where,
        attributes,
        include: [{
            model: models.SubCategory,
            as: 'subCategories',
            attributes: ['id', 'name']
        }]
    })
    .then(categories => next(categories))
    .catch(error => res.status(502).json({ error }))
}

export default {
    getAll(req, res) {
        find(null, res, (categories) => {
            res.status(200).json(categories);
        })
    }
}