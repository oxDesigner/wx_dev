
/**
 * @function 业务逻辑正确代号
 */
const SUCCESS_CODE = 200;

/**
 * @function 业务逻辑错误代号以及相对应的errMsg;
 * @description 默认使用后台返回内容进行提示，如果后台没有相对应代号的errMsg，则输出前台预留errMsg，如下：
 */
const ERROR_CODE = {
	10001: '',
	10002: '',
	403: '',
	404: '',
	500: '',
	502: '',
}

module.exports = {
	SUCCESS_CODE,
	ERROR_CODE
}
