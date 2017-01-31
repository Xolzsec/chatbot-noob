"use strict";

class Ultilities {
    removeUnicode(str) {
        str = str.toLowerCase();
        return str
    }

    charToNumber(str) {
        var charObj = {
            "mot": 1,
            "hai": 2,
            "ba": 3,
            "bon": 4,
            "nam": 5,
            "sau": 6,
            "bay": 7,
            "tam": 8,
            "chin": 9,
            "muoi": 10
        };

        for (var p in charObj) {
            str = str.replace(new RegExp(p + " ", 'g'),
                charObj[p] + " ");
        }
        return str;
    }

    decodeAndTruncate(str) {
        var str = str.replace(new RegExp("&#8211;", 'g'), '-')
            .replace(new RegExp("&#8220;", 'g'), '"')
            .replace(new RegExp("&#8221;", 'g'), '"')
            .replace(new RegExp("&#8230;", 'g'), "…");

        if (str.length > 75)
            return str.substring(0, 74) + '…';
        else
            return str;
    }

    postsToPayloadElements(posts) {
        var payloadElements = posts.map(post => {
            return {
                title: "Article",
                subtitle: post.title,
                item_url: post.URL,
                image_url: post.featured_image,
                buttons: [{
                    type: "web_url",
                    url: post.URL,
                    title: "Read this"
                }]
            }
        });

        return payloadElements;
    }

    videosToPayloadElements(videos) {
        var payloadElements = videos.map(video => {
            return {
                title: video.title,
                subtitle: video.description,
                item_url: video.link,
                image_url: video.thumb,
                buttons: [{
                    type: "web_url",
                    url: video.link,
                    title: "Xem clip"
                }]
            }
        });

        return payloadElements;
    }

}

module.exports = new Ultilities();