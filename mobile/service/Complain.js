import axios from 'axios';
import { execute } from './Api';
import { baseURL } from './url';

export default {
    getAll: token => execute(axios({
        method:'GET',
        url: `${baseURL}/complains/user`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })),
    getAccepted: token => execute(axios({
        method:'GET',
        url: `${baseURL}/complains/user?status=1`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })),
    getRejected: token => execute(axios({
        method:'GET',
        url: `${baseURL}/complains/user?status=-1`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })),
    submit: (data, token) => execute(axios({
        method: 'POST',
        url: `${baseURL}/complains`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data,
    }))
}