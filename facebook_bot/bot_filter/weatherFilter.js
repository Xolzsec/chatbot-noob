"use strict";
var util = require("./../utilities");
var SimpleFilter = require("./simpleFilter");
var api = require("./../api/thoitietAPI");
var BOT_REPLY_TYPE = require("./../constants").BOT_REPLY_TYPE;

// Same as simple filter, but return text and buttons
class WeatherFilter extends SimpleFilter {
    process(input) {
        this._query = encodeURI(input);
    }

    reply(input) {
        return api.getthoitiet(this._query).then((data) => {
            return {
                output: data,
                type: BOT_REPLY_TYPE.TEXT
            };
        });
    }
}


module.exports = YoutubeFilter;