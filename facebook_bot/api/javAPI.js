"use strict";
var request = require("request");
var atob = require("atob");

class JAVGirl {
    constructor() {
        this._tumblrKey = process.env.TUMBLR_TOKEN || atob("ZFA4TUs0U2Uwd1RjVjQ1bndPT0o2SHhWOXJBNHhpQ2VWSzR0ZzFIZWxMUWJUanBNWlI=") ;
        this._tumblrUrl = "https://api.tumblr.com/v2/blog/nghminh163.tumblr.com/posts/photo";    
    }
    
    // Only get 1 image each time from nghminh163.tumblr.com
    getRandomJAVImage() {
        var max = 28; // Get random image with index from 0 to 28
        var randomIndex = Math.floor((Math.random() * max));
        
        return new Promise((resolve, reject) => {
            request({
                url: this._tumblrUrl,
                qs: {
                    api_key : this._tumblrKey,
                    limit: 1,
                    offset: randomIndex
                },
                method: "GET"
            }, (err, response, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                var rs = JSON.parse(body);
                var imageUrl = rs.response.posts[0].photos[0].original_size.url;
                resolve(imageUrl);
            });
        });
    }
}
    module.exports = new JAVGirl();