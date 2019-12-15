import auth from './auth';
import category from './category';
import complain from './complain';

export default app => {
    app.use('/api/auth', auth);
    app.use('/api/categories', category);
    app.use('/api/complains', complain);
}