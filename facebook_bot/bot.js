"use strict";
var SimpleFilter = require("./bot_filter/simpleFilter");
var SpamFilter = require("./bot_filter/spamFilter");

var YoutubeFilter = require("./bot_filter/youtubeFilter");
var ButtonFilter = require("./bot_filter/buttonFilter");
var EndFilter = require("./bot_filter/endFilter");
var ImageFilter = require("./bot_filter/imageFilter");

var async = require("asyncawait/async");
var await = require("asyncawait/await");

var BOT_REPLY_TYPE = require("./constants").BOT_REPLY_TYPE;
var BUTTON_TYPE = require("./constants").BUTTON_TYPE;
var PAYLOAD = require("./constants").PAYLOAD;

var girlAPI = require("./api/girlAPI");
var fbAPI = require("./api/facebookAPI");
var faceRecAPI = require("./api/faceRecAPI");
var ulti = require("./utilities");
var isRep = {};


class BotAsync {
    constructor() {

        

       this._helloFilter = new SimpleFilter(["hi", "halo", "hế lo", "hello", "chào", "xin chào"], "Chào bạn, mềnh là bot Noob: <3 Bạn cần giúp gì nào ?");
        var girlFilter = new ImageFilter(["@gái", "@girl", "hình gái", "anh gai", "cute girl"], girlAPI.getRandomGirlImage.bind(girlAPI)); // From xkcn.info
        var sexyGirlFilter = new ImageFilter(["@sexy", "sexy", "fap", "anh nong", "hot girl", "hinh sexy", "gai sexy", "sexy girl"],
            girlAPI.getRandomSexyImage.bind(girlAPI, "637434912950811", 760)); // From xinh nhẹ nhàng 
        
        var bikiniGirlFilter = new ImageFilter(["@bikini", "bikini", "ao tam", "do boi"],
            girlAPI.getRandomSexyImage.bind(girlAPI, "169971983104176", 1070)); // From hội bikini

        var youtubeFilter = new YoutubeFilter(["@nhạc", "@music", "@youtube", "@yt"]);

        var helpFilter = new SimpleFilter(["help", "giúp đỡ", "giúp với", "giúp mình", "giúp"],
		"Đang làm <3");
           
        var botInfoFilter = new SimpleFilter(["may la ai", "may ten gi", "may ten la gi",
                "ban ten la gi", "ban ten gi", "ban la gi",
                "bot ten gi", "bot ten la gi", "your name",
				"mày là ai", "mày tên gì", "mày tên là gì", "bạn tên là gì", "bot tên là gì", "bot tên gì"
            ],
            "Mình là chat bot Noob: <3. Viết bởi anh Minh đập chai cute <3");
	var yeunuocFilter = new SimpleFilter(["Anh co yeu nuoc khong", "May co yeu nuoc khong", "Yeu nuoc khong","Anh Lê, anh có yêu nước không", "anh có yêu nước không"
, "mày có yêu nước không", "yêu nước không"	
	],
	"Tất nhiên là có chứ!");
var giubimatFilter = new SimpleFilter(["Anh co the giu bi mat duoc khong", "May co the giu bi mat duoc hay khong",
"anh có thể giữ bí mật được không", "Mày có thể giữ bị mật được hay không"],
"Có. Tôi muốn đi ra nước ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, Tôi sẽ trở về giúp đồng bào chúng ta. Nhưng đi một mình, thật ra cũng có nhiều mạo hiểm, ví như đau ốm… Anh muốn đi với tôi không ?");
var tienFilter = new SimpleFilter(["Tien dau ra ma di", "Nhưng bạn ơi tiền đâu ra mà đi", "tiền đâu ra mà đi"],
"Đây, tiền đây.Chúng ta sẽ làm việc, chúng ta sẽ làm bất cứ việc gì mà sống và để đi. Anh cùng đi với tôi chứ ?");
var thoaFilter = new SimpleFilter([
"Crush cua Quang Huy a3 la ai", "Crush của Quang Huy a3 là ai", "Crush Quang Huy a3 la ai", "Crush Quang Huy a3 là ai",
"Crush của idol a3 là ai", "Crush cua idol a3 la ai", "Crush idol a3 la ai", "Crush idol a3 là ai", "Crush ai dồ a3 là ai", "Crush ai do a3 la ai",
"Crush cua Quang Huy 9a3 la ai", "Crush của Quang Huy 9a3 là ai", "Crush Quang Huy 9a3 la ai", "Crush Quang Huy 9a3 là ai",
"Crush của idol 9a3 là ai", "Crush cua idol 9a3 la ai", "Crush idol 9a3 la ai", "Crush idol 9a3 là ai", "Crush ai dồ 9a3 là ai", "Crush ai do 9a3 la ai",
"Crush cua Chu Lap Hoang la ai", "Crush của Chu Lập Hoàng là ai", "Crush Chu Lap Hoang la ai", "Crush Chu Lập Hoàng là ai", "Crush Chu Lap Hoang la ai",
"Crush cua Chu Lap Hoang a7 la ai", "Crush của Chu Lập Hoàng a7 là ai", "Crush Chu Lap Hoang a7 la ai", "Crush Chu Lập Hoàng a7 là ai", "Crush Chu Lap Hoang a7 la ai",
"Crush cua Chu Lap Hoang 9a7 la ai", "Crush của Chu Lập Hoàng 9a7 là ai", "Crush Chu Lap Hoang 9a7 la ai", "Crush Chu Lập Hoàng 9a7 là ai", "Crush Chu Lap Hoang 9a7 la ai",
"Crush cua CLH a7 la ai", "Crush của CLH a7 là ai", "Crush CLH a7 la ai", "Crush CLH a7 là ai", "Crush CLH a7 la ai",
"Crush cua CLH 9a7 la ai", "Crush của CLH 9a7 là ai", "Crush CLH 9a7 la ai", "Crush CLH 9a7 là ai", "Crush CLH 9a7 la ai"
],		
"Trj.nk Kjm Tho@ =)))"); 
 
var soloFilter = new SimpleFilter(["Solo daxua khong", "Solo yasuo khong", "solo daxua ko", "solo daxua k", "solo yasuo ko", "solo yasuo k",
"Solo daxua không", "Solo yasuo không"
],
"Tao chỉ kèo kèo solo chặt cu thôi!"); 
 
var yeutaokFilter = new SimpleFilter(["yeu tao khong", "yeu tao ko", "yeu tao k", "may yeu tao khong", "may yeu tao ko", "may yeu tao k", "m yeu t k", " m yeu t ko", "m yeu t khong", "yeu t k", "yeu t ko", "yeu t khong",
"yêu tao không", "yêu tao ko", "yêu tao k", "mày yêu tao không", "mày yêu tao ko", "mày yêu tao k", "m yêu t k", " m yêu t ko", "m yêu t không", "yêu t k", "yêu t ko", "yêu t không", "mày có yêu tao không", "may co yeu tao khong", "may co yeu tao ko", "mày có yêu tao ko", "mày có yêu tao k", "may co yeu tao k",
], 
"Mày tuổi lồn?"); 
var chuongFilter = new SimpleFilter(["Chuong la ai", "Quan chuong la ai", "Quan Bell la ai", "chuông là ai", "Quân chuông là ai", "Quân Bell là ai"
], 
"Là lãnh đảo Đảng Cộng Sản Tộ Team =))) But sắp bị thần lật đổ r"); 
var taokhongvaoFilter = new SimpleFilter (["Tao khong vao dia nguc thi ai", "tao không vào địa ngục thì ai"
],
"Chỉ tại Công Sản ");
var crushHaiFilter = new SimpleFilter([
"crush cua Hai la ai", "Crush Hai la ai", "Crush hai a2 la ai", "Crush cua Hai a2 la ai", "crs Hai la ai", "Crs cua Hai la ai",
"crs hai a2 la ai", "Crs cua hai a2 la ai",
"crush của Hải là ai", "Crush Hải là ai", "Crush Hải a2 là ai", "Crush của Hải a2 là ai", "crs Hải là ai", "Crs của Hải là ai",
"crs Hải a2 là ai", "Crs của Hải a2 là ai"
],
"404 Not Found!");
var CrushKhanhFilter = new SimpleFilter ([
"Crush cua PNK la ai", "Crush PNK la ai", "Crs cua PNK la ai", "Crs PNK la ai", 
"Crush cua PNK a1 la ai", "Crush PNK a1 la ai", "Crs cua PNK a1 la ai", "Crs PNK a1 la ai",
"Crush cua PNK 9a1 la ai", "Crush PNK 9a1 la ai", "Crs cua PNK 9a1 la ai", "Crs PNK 9a1 la ai",
"Crush cua Pham Ngoc Khanh 9a1 la ai", "Crush Pham Ngoc Khanh 9a1 la ai", "Crs cua Pham Ngoc Khanh 9a1 la ai", "Crs Pham Ngoc Khanh 9a1 la ai",
"Crush của PNK là ai", "Crush PNK là ai", "Crs của PNK là ai", "Crs PNK là ai", 
"Crush của PNK a1 là ai", "Crush PNK a1 là ai", "Crs của PNK a1 là ai", "Crs PNK a1 là ai",
"Crush của PNK 9a1 là ai", "Crush PNK 9a1 là ai", "Crs của PNK 9a1 là ai", "Crs PNK 9a1 là ai",
"Crush của Phạm Ngọc Khánh 9a1 là ai", "Crush Phạm Ngọc Khánh 9a1 là ai", "Crs của Phạm Ngọc Khánh 9a1 là ai", "Crs Phạm Ngọc Khánh 9a1 là ai",
"Crush của Phạm Ngọc Khánh là ai", "Crush Phạm Ngọc Khánh là ai", "Crs của Phạm Ngọc Khánh là ai", "Crs Phạm Ngọc Khánh là ai", 
"Crush của Phạm Ngọc Khánh a1 là ai", "Crush Phạm Ngọc Khánh a1 là ai", "Crs của Phạm Ngọc Khánh a1 là ai", "Crs Phạm Ngọc Khánh a1 là ai",
"Crush cua Khanh la ai", "Crush Khanh la ai", "Crs cua Khanh la ai", "Crs Khanh la ai", 
"Crush cua Khanh a1 la ai", "Crush Khanh a1 la ai", "Crs cua Khanh a1 la ai", "Crs Khanh a1 la ai",
"Crush cua Khanh 9a1 la ai", "Crush Khanh 9a1 la ai", "Crs cua Khanh 9a1 la ai", "Crs Khanh 9a1 la ai",
"Crush của Khánh là ai", "Crush Khánh là ai", "Crs của Khánh là ai", "Crs Khánh là ai", 
"Crush của Khánh a1 là ai", "Crush Khánh a1 là ai", "Crs của Khánh a1 là ai", "Crs Khánh a1 là ai",
"Crush của Khánh 9a1 là ai", "Crush Khánh 9a1 là ai", "Crs của Khánh 9a1 là ai", "Crs Khánh 9a1 là ai"
],
"<3 Hiện tại thì hình như là không :v Trước có Cuốc <3");
var ChatbotDzFilter = new SimpleFilter (["Chatbot dep trai", "Chatbot đẹp trai", "Chatbot dep zai", "chatbot đẹp zai"
],
"Quá đẹp luôn <3 :))");
var crushFilter = new SimpleFilter([
"Crush của Minh là ai", "Crush Minh là ai", "Crs của Minh là ai", "Crs Minh là ai", 
"Crush của Minh a3 là ai", "Crush Minh a3 là ai", "Crs của Minh a3 là ai", "Crs Minh a3 là ai",
"Crush của Minh 9a3 là ai", "Crush Minh 9a3 là ai", "Crs của Minh 9a3 là ai", "Crs Minh 9a3 là ai",
"Crush của Hoàng Minh là ai", "Crush Hoàng Minh là ai", "Crs của Hoàng Minh là ai", "Crs Hoàng Minh là ai", 
"Crush của Hoàng Minh a3 là ai", "Crush Hoàng Minh a3 là ai", "Crs của Hoàng Minh a3 là ai", "Crs Hoàng Minh a3 là ai",
"Crush của Hoàng Minh 9a3 là ai", "Crush Hoàng Minh 9a3 là ai", "Crs của Hoàng Minh 9a3 là ai", "Crs Hoàng Minh 9a3 là ai",
"Crush cua Hoang Minh la ai", "Crush Hoang Minh la ai", "Crs cua Hoang Minh la ai", "Crs Hoang Minh la ai", 
"Crush cua Hoang Minh a3 la ai", "Crush Hoang Minh a3 la ai", "Crs cua Hoang Minh a3 la ai", "Crs Hoang Minh a3 la ai",
"Crush cua Hoang Minh 9a3 la ai", "Crush Hoang Minh 9a3 la ai", "Crs cua Hoang Minh 9a3 la ai", "Crs Hoang Minh 9a3 la ai"
],
"Suỵt! Gợi ý nèk <3 Hack facebook anh ý <3 Tìm mess chị Nấm <3");		
var CrushCuocFilter = new SimpleFilter (["Crush Cuốc là ai", "Crush của Cuốc là ai"], "Nó crush ad Nguyễn Hoàng Minh :v :)))");
var bosscfsFilter = new SimpleFilter(["Boss của Tộ team Cfs là ai"
],
"Boss Quân :|");
var PNKFilter = new SimpleFilter(["PNK là ai", "Phạm Ngọc Khánh là ai"
],
"Lớp trưởng 9a1 :| Nhìn trước thì xinh xắn lắm(Bạn nào muốn tán gọi mình :| Mình chỉ cho) nhưng kể từ cắt tóc đến mình còn k có hứng =))");
var NKLFilter = new SimpleFilter(["NKL là ai", "Nguyễn Khánh Linh là ai"
],
":| -_-");
var QueFilter = new SimpleFilter(["Nguyễn Khánh Nam là ai", "Què là ai"
],
"Bạn có đồng hồ vàng? <3");
var CuocFilter = new SimpleFilter (["Cuốc là ai"
],
"Mặt nó ngu vãi cả lồn nhưng đéo hiêu sao được giải nhất Hóa =)) Dâm vc :v Còn bị gay nữa :v");

var crushthanhanFilter = new SimpleFilter(["Crush Thanh An la ai", "Crush Thành An là ai", "Crush của Thành An là ai",
"Crush cua Thanh An la ai", "Crush của Thanh An a3 la ai", "Crush cua Thành An a3 là ai",
"Crush cua Thanh An la ai", "Crush của Thanh An 9a3 la ai", "Crush cua Thành An 9a3 là ai",
"Crs Thanh An la ai", "Crs Thành An là ai", "Crs của Thành An là ai",
"Crs cua Thanh An la ai", "Crs của Thanh An a3 la ai", "Crs cua Thành An a3 là ai",
"Crs cua Thanh An la ai", "Crs của Thanh An 9a3 la ai", "Crs cua Thành An 9a3 là ai"
],
"Dạ! Bạn Mỹ Hânn chăng <3 =)))");
var crushDucAnFilter = new SimpleFilter(["Crush Duc An la ai", "Crush Đức An là ai", "Crush của Đức An là ai",
"Crush cua Duc An la ai", "Crush của Duc An a3 la ai", "Crush cua Đức An a3 là ai",
"Crush cua Duc An la ai", "Crush của Duc An 9a3 la ai", "Crush cua Đức An 9a3 là ai",
"Crs Duc An la ai", "Crs Đức An là ai", "Crs của Đức An là ai",
"Crs cua Duc An la ai", "Crs của Duc An a3 la ai", "Crs cua Đức An a3 là ai",
"Crs cua Duc An la ai", "Crs của Duc An 9a3 la ai", "Crs cua Đức An 9a3 là ai"
],
"Bạn nào đó a1 :))). Hình như bạn Khanh chăng :v :))) <3");

 var adInfoFilter = new SimpleFilter(["ad la ai", "hoi ve ad", "ad ten gi", "who is ad",
                "ad la thang nao", "thong tin ve ad", "ad dau", "admin",
                "ai viet ra may", "who made you", "ad la gi", "ad ten la gi", "thang nao tao ra may", "thang nao tao ra may",
				"ad là ai", "hỏi về ad", "ad tên gì", "who is ad", "ad là thằng nào", "thông tin về ad",
				"ad ở đâu", "admin", "ad là gì", "ai là thằng viết ra mày", "ai viết ra mày", "thằng nào làm ra mày", "thằng nào tạo ra mày", "Nguyễn Hoàng Minh là ai"
            ],
            "Ad là Nguyễn Hoàng Minh, đập chai cute thông minh tinh tế <3. Bạn vào đây xem thêm nhé: https://facebook.com/minhnh0302");
        var thankyouFilter = new SimpleFilter(["cảm ơn", "thank you", "thank", "nice", "hay qua",
            "gioi qua", "good job", "hay nhi", "hay ghe", "cam on"
        ], "Không có chi. Rất vui vì đã giúp được cho bạn ^_^");
  
        var chuiLonFilter = new SimpleFilter(["địt mẹ mày", "địt con mẹ mày", "đmm", "vl", "đm"],
            "Bot là người nhân hậu, không chửi thề. Cút ngay không bố đập vỡ cmn ass bây giờ :v!");
        var testFilter = new SimpleFilter(["test"],
            "Đừng test nữa, mấy hôm nay người ta test nhiều quá bot mệt lắm rồi :'(");
             var stopFilter = new ButtonFilter(["Chat với admin", "Admin đâu", "ad đâu"],
        "Bấm vào nút nhé <3", [ {
                title: "Chat với admin",
                type: BUTTON_TYPE.POSTBACK,
                payload: PAYLOAD.STOP
            }]);
            var startFilter = new ButtonFilter(["Chat với bot", "bot đâu"],
        "Bấm vào nút nhé <3", [ {
                title: "Chat với bot",
                type: BUTTON_TYPE.POSTBACK,
                payload: PAYLOAD.START
            }]);
        this._goodbyeFilter = new SimpleFilter(["tạm biệt", "bye", "bai bai", "good bye"], "Tạm biệt, hẹn gặp lại ;)");
		

          this._filters = [new SpamFilter(),
          youtubeFilter,
            girlFilter, sexyGirlFilter, bikiniGirlFilter, CrushCuocFilter,
            adInfoFilter, botInfoFilter, yeunuocFilter, tienFilter,
			giubimatFilter, thoaFilter, soloFilter, yeutaokFilter, chuongFilter, startFilter, stopFilter,
			taokhongvaoFilter, CrushKhanhFilter, crushHaiFilter, ChatbotDzFilter, crushFilter,
			crushthanhanFilter, crushDucAnFilter, bosscfsFilter, PNKFilter, NKLFilter, QueFilter, CuocFilter,
            chuiLonFilter, thankyouFilter, helpFilter,
            this._goodbyeFilter, this._helloFilter, testFilter, new EndFilter(),
        ];
    }

    setSender(sender) {
        this._helloFilter.setOutput(`Chào ${sender.first_name}, mềnh là bot Noob: <3. Bạn cần giúp gì nào <3 ?`);
        this._goodbyeFilter.setOutput(`Tạm biệt ${sender.first_name}, hẹn gặp lại ;)`);
    }
chat(input) {
        for (var filter of this._filters) {
            if (filter.isMatch(input)) {
                filter.process(input);
                return filter.reply(input);
            }
        }
    }

    reply(senderId, textInput) {
        async(() => {
            var sender = await (fbAPI.getSenderName(senderId));
            this.setSender(sender);
            var botReply = await (this.chat(textInput));
            var output = botReply.output;
            switch (botReply.type) {
                case BOT_REPLY_TYPE.TEXT:
                   //Wrote by ZeroUnix
                   
                   textInput.toLowerCase(); // Non case-sensitive
                   
                    if(textInput.indexOf("stop") != -1 || textInput.indexOf("stop") != -1) {
                        fbAPI.sendTextMessage(senderId,"Ơi! Admin đây <3 Nói gì nào. Để bật lại bot hãy hỏi bot đâu <3")
                        return isRep[senderId] = true;
                    }
                    
                    if(isRep.hasOwnProperty(senderId)) {
                        if(textInput.indexOf("start") != -1 || textInput.indexOf("chat bot") != -1) {
                            delete isRep[senderId];
                            return fbAPI.sendTextMessage(senderId, "Ok, chat típ nà <3");
                        }
                        return;
                    }

                    if(!isRep.hasOwnProperty(senderId)) {
                        return fbAPI.sendTextMessage(senderId, output);
                    }
                   // fbAPI.sendTextMessage(senderId, output);
                    break;
                case BOT_REPLY_TYPE.POST:
                case BOT_REPLY_TYPE.VIDEOS:
                    fbAPI.sendTextMessage(senderId, "Có ngay đây. Xem thoải mái ;)");
                    fbAPI.sendGenericMessage(senderId, ulti.videosToPayloadElements(output));
                    break;
                case BOT_REPLY_TYPE.BUTTONS:
                    let buttons = botReply.buttons;
                    fbAPI.sendButtonMessage(senderId, output, buttons);
                    break;
                case BOT_REPLY_TYPE.IMAGE:
                    fbAPI.sendTextMessage(senderId, "Đợi tí có liền, đồ dại gái hà ^^");
                    fbAPI.sendImage(senderId, output);
                    break;
                default:
            }
        })();
    }


    processImage(senderId, imageUrl) {
        // If the image is not an emo
        if (imageUrl.includes("&oh=") && imageUrl.includes("&oe=")) {
            faceRecAPI.analyzeImage(imageUrl).then((reply) => {
                fbAPI.sendTextMessage(senderId, reply);
            });

            faceRecAPI.analyzeEmo(imageUrl).then((reply) => {
                fbAPI.sendTextMessage(senderId, reply);
            });
        } else {
            // Send emo back
            fbAPI.sendImage(senderId, imageUrl);
        }
    }

    processPostback(senderId, payload) {
        async(() => {
            var sender = await (fbAPI.getSenderName(senderId));
            this.setSender(sender);
            switch (payload) {
                  case PAYLOAD.STOP:
                    this.reply(senderId, "stop");
                    break;
                    case PAYLOAD.START:
                    this.reply(senderId, "start");
                    break;
                case PAYLOAD.SEE_CATEGORIES:
                    this.reply(senderId, "hello");
                    break;
                case PAYLOAD.HELP:
                    this.reply(senderId, "-help");
                    break;
                case PAYLOAD.GIRL:
                    this.reply(senderId, "@girl");
                    break;
                default:
                    console.log("Unknown payload: " + payload);
            }
        })();
    }
}

module.exports = new BotAsync();
