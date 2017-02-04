"use strict";
var util = require("./../utilities");
var SimpleFilter = require("./simpleFilter");
var api = require("./../api/thoitietAPI");
var BOT_REPLY_TYPE = require("./../constants").BOT_REPLY_TYPE;

// Same as simple filter, but return text and buttons
class WeatherFilter extends SimpleFilter {
    constructor(inputText, weatherFunction) {
        super(inputText, "");
        this._weatherFunction = weatherFunction;
    }

    reply(input) {
        return this._weatherFunction(input).then(data => {
            return {
                output: data,
                type: BOT_REPLY_TYPE.TEXT
            };
        });
    }
}


module.exports = WeatherFilter;