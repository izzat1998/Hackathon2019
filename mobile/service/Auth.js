import Api, { execute, methods } from './Api'; // This is giving 'name.Uppercase is not function' error
import axios from 'axios';
import { baseURL } from './url';

export default {
  login: user => execute(axios({
    method:'POST',
    url: `${baseURL}/auth/login`,
    data: user
  })),
  details: token => execute(axios({
    method:'GET',
    url: `${baseURL}/auth`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })),
};
