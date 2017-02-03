"use strict"
var request = require("request");
class ThoiTietAPI {
	contructor() {
		this._url = "https://api.trolyfacebook.com/thoitiet/?noidung=";
	}
	  getthoitiet() {
        return new Promise((resolve, reject) => {
            request({
                url: this._url ,
               
                method: "GET"
            }, (err, response, body) => {
                                if (err) {
                                
                    reject();
                    return;
                }
                
 console.log(body);               
                var data = JSON.parse(body);
			var res = data.messages[0].text + '\n' + data.messages[1].text + '\n' + data.messages[2].text + data.messages[3].text+'\n'  + data.messages[4].text+ '\n' + data.messages[5].text +'\n' + data.messages[6].text;
			resolve(res);
		
	    });
        });
    }
}

module.exports = new ThoiTietAPI();

