import axios from 'axios';
import _ from 'lodash';

window.axios = axios;
window._ = _;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';