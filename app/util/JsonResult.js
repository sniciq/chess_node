var JsonResult = function() {
	this.success = function () {
		return {"success": true, "result":"success"};
	};
	
	this.error = function (info) {
		return {"success": true, "result":"error", info: info};
	}
}

module.exports = JsonResult;