import axios from 'axios';

import {getToken} from '~/utils/auth';
import moment from 'moment';

// var querystring = require('querystring')
let options = {
  baseURL: `http://${process.env.gateway_base_url}/hoolai-web/admin/api`
};

axios.defaults.withCredentials = true;

const responseFilter = instance => {
  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      let result = {
        code: 100001,
        message: error.message
      };
      return Promise.resolve(result);
    }
  );
};

const requestFilter = instance => {
  instance.interceptors.request.use(
    config => {
      // console.log(config)
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};

let ax = {
  options,
  ctx: null,
  init: function() {
    if (options.headers) {
      delete options.headers;
    }
    if (this.ctx && this.ctx.isServer) {
      let cookie = this.ctx.req.headers.cookie || '';
      options.headers = {
        Cookie: cookie
      };
    } else {
      let token = getToken();
      if (
        token &&
        new Date(moment(token.endTime)).getTime() > new Date().getTime()
      ) {
        options.headers = {
          authorization: token.token
        };
      }
    }
    var instance = axios.create(ax.options);
    requestFilter(instance);
    responseFilter(instance);
    return instance;
  },
  post: function(url, data) {
    if (!data) {
      data = {};
    }
    return this.init().post(url, data);
  },
  put: function(url, data) {
    if (!data) {
      data = {};
    }
    return this.init().put(url, data);
  },
  delete: function(url) {
    return this.init().delete(url);
  },
  get: function(url) {
    return this.init().get(url);
  }
};

export default ax;
