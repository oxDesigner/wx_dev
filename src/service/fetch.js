const { SUCCESS_CODE, ERROR_CODE } = require('../vendor/constants.js');
const App = getApp();

module.exports = function (
  url,
  method = 'GET',
  header = { 'content-type': 'application/json' }
) {

  return function (data, loading = {show: true, text: '加载中'}) {
    if (loading.show) {
      wx.showLoading({
        title: loading.text,
        mask: true,
      });
    }
    
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method,
        header,
        data,
        success: res => {
          const { statusCode, data } = res;
          if (statusCode === 200) {
            if (data.code === SUCCESS_CODE) {
              resolve(data);
            } else {
              const errerIndex = Object.keys(ERROR_CODE).indexOf(data.code);
              if (errerIndex !== -1) {
                App.showToast(res.errMsg || ERROR_CODE[data.code]);
              }
              reject(data);
            }
          } else {
            App.showToast('网络连接失败，请检查网络');
            reject(data);
          }
        },
        fail: () => {
          App.showToast('网络连接失败，请检查网络');
        },
        complete: () => {
          wx.hideLoading();
        }
      });
    });
  }
}