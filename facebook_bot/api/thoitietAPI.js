"use strict"
var request = require("request");
class ThoiTietAPI {
	constructor() {
		this._url = "https://api.trolyfacebook.com/thoitiet/?noidung=";
	}
    getthoitiet(query) {
        console.log('query:', query);
        return new Promise((resolve, reject) => {
            request({
                url: this._url + encodeURI(query),               
                method: "GET"
            }, (err, response, body) => {
                if (err) {          
                    console.log('err on get weather:', err);                      
                    reject(err);
                    return;
                }
                
                var res = JSON.parse(body);                
                var data = [];
                for (var i=0; i<res.messages.length; i++) {
                    data.push(res.messages[i].text);
                }

                resolve(data);            
            });
        });
    }
}

module.exports = new ThoiTietAPI();

