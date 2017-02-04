"use strict"
var request = require("request");
class ThoiTietAPI {
	contructor() {
		this._url = "https://api.trolyfacebook.com/thoitiet/?noidung=";
	}
    getthoitiet(query) {
        console.log(this._url + encodeURI(query));
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
                // var res = data.messages[0].text + '\n' + data.messages[1].text + '\n' + data.messages[2].text + data.messages[3].text+'\n'  + data.messages[4].text+ '\n' + data.messages[5].text +'\n' + data.messages[6].text;
                
                var data = [];
                for (var i=0; i<res.messages.length; i++) {
                    data.push(res.messages[i].text);
                }
                console.log('typeof data thoitietapi.js:', typeof data);
                resolve(data);            
            });
        });
    }
}

module.exports = new ThoiTietAPI();

