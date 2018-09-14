 
const fetch = require('./fetch');
const { HOST } = require("../vendor/host");

//请求地址列表
module.exports = {
  login: fetch(`${HOST}/api/xxx/xxx`, 'POST'),
  getList: fetch(`${HOST}/api/xxx/files`),
}