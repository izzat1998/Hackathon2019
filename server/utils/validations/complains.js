import { config } from 'dotenv';
config();
const check = ['categoryId', 'comment', 'subCategoryId', 'lat', 'long']

export default (req, res, next) => {
    check.forEach(key => {
        if(!req.body[key]) throw new Error(`${key} is not defined`)
    });
    req.Complain = {
        userId: req.userId,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
        comment: req.body.comment,
        lat: req.body.lat,
        long: req.body.long,
        image: `${process.env.BASE_URL}/${req.file.path}`,
        status: req.body.status
    }
    next();
}