"use strict";
var util = require("./../utilities");
var SimpleFilter = require("./simpleFilter");
var api = require("./../api/thoitietAPI");
var BOT_REPLY_TYPE = require("./../constants").BOT_REPLY_TYPE;

// Same as simple filter, but return text and buttons
class WeatherFilter extends SimpleFilter {
    process(input) {
        
    }

    reply(input) {
        return api.getthoitiet().then((videos) => {
            return {
                output: videos,
                type: BOT_REPLY_TYPE.VIDEOS
            };
        });
    }
}


module.exports = YoutubeFilter;