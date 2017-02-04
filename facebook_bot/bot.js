"use strict";
var SimpleFilter = require("./bot_filter/simpleFilter");
var SpamFilter = require("./bot_filter/spamFilter");
var request = require("request");

var YoutubeFilter = require("./bot_filter/youtubeFilter");
var ButtonFilter = require("./bot_filter/buttonFilter");
var EndFilter = require("./bot_filter/endFilter");
var ImageFilter = require("./bot_filter/imageFilter");

var async = require("asyncawait/async");
var await = require("asyncawait/await");
var thoitietAPI = require("./api/thoitietAPI");
var BOT_REPLY_TYPE = require("./constants").BOT_REPLY_TYPE;
var BUTTON_TYPE = require("./constants").BUTTON_TYPE;
var PAYLOAD = require("./constants").PAYLOAD;
var javAPI = require("./api/javAPI");
var girlAPI = require("./api/girlAPI");
var fbAPI = require("./api/facebookAPI");
var faceRecAPI = require("./api/faceRecAPI");
var ulti = require("./utilities");
var isRep = {};

function SendWeatherMessage(text, callback){
    request("https://api.trolyfacebook.com/thoitiet/?noidung="+encodeURI(text),function(err,respone, body){
       callback(err, JSON.parse(body));
    });
}

function sendMultiTextMessages (senderId, data) {
    if (data.length) {
        fbAPI.sendTextMessage(senderId, data[0], onSendMultiTextMessages(senderId, data));
    }
}

function onSendMultiTextMessages (senderId, data) {
    console.log('sender id:', senderId);
    console.log('data:', data);
    // if (!err) {
        data.splice(0, 1);
        setTimeout(function () {
            sendMultiTextMessages(senderId, data);
        }, 1000);
    // }
}

var x = Array(
    'MIAD-530', 'MIDD-944', 'LADY-077', 'SW-186', 'STAR444', 'T28-184', 'dvdes-635','BOD-277','BOD-277', 'ARMG-014', 'JUC-579','BBI-142', 'MILD-716', 'FSLV-002', 'CRS-S014',
    'ODFW-006', 'SOE-837', 'SOE-837', 'Nhdta-141', 'NADE-783', 'PPPD-294', 'MIRD-102', 'SRS-022', 'BBI-163', 'BIST-001',
    'SIRO-1690', 'HAWA-020', 'SNIS-166', 'MIRD136', 'ABP-138', 'WANZ-201', 'STAR-524', 'SAMA-385', 'ABP-171', 'IPZ-409', 'ABP-108', 'MIDE128', 'N0960', 'JUX-357', 'SNIS-070',
    'SIRO-1774', 'MIRD-134', 'MIDE-128', 'ABP-145', 'N0962', 'ABP159', 'ZIZG-003', 'CWP-107', 'IPZ-127','MIDD-532', 'IPTD-748', 'IESP-144', 'crpd-222', 'GAR-280', 'BW248', 'MXGS173', 'MIAD-530', 'RCT-402', 'ABP-159',
    'ABP-103', 'ABP-105', 'ABP-108', 'ABP-117', 'ABP-128', 'ABP-013', 'ABP-138', 'ABP-142', 'ABP-171', 'ABP-276', 'ABP-092', 'ABS-130', 'ABS-141', 'ABS-170', 'ABS-217', 'ABS-047', 'ABS-070',
    'ABS-074', 'ABS-083','ADN-032', 'AKB-056', 'AMBI-048', 'AOZ-173z', 'AOZ-189z', 'AOZ-212z', 'AOZ-217z', 'AP-154',' AP-081', 'APAA-151', 'APAA-246', 'APAA-258',
    'APAA-272', 'APAA-280', 'APAA-299', 'APAK-074', 'APAK-078', 'APAK-086','APAK-088', 'ARM-383', 'ARM-416', 'ARMF-003', 'ATID-157', 'ATID-207', 'ATOM-093', 'AUKG-276', 'AUKG-293', 'AUKG-045','AVOP-109', 'AVOP-155', 'AVOP-159', 'AVOP-167', 'AVOP-002',
    'BAMS-001', 'BDSR-185', 'BDSR-202', 'BGN-018', 'BGN-005', 'BKSP-274', 'BRA-007', 'BUG-012', 'CCCV-001',  'CHN-035', 'CLUB-196', 'CMV-049', 'CND-128', 'CND-129', 'CND-142', 'CND-089', 'CRIM-035', 'CRS-046', 'CUT-002', 'CWM-221',
    'DAJ-075', 'DANDY-289', 'DANDY-368', 'DANDY-440', 'DASD-267', 'DDT-469', 'DDT-482', 'DFE-020', 'DISM-001', 'DIY-030', 'DMOW-098', 'DOM-021',
    'DOM-043', 'DOPP-035', 'DPHN-142', 'DV-1175', 'DV-1246', 'DVDES-659', 'DVDES-734', 'DVDES-804', 'DVDES-818', 'DVDES-832', 'DVDES-836', 'DVDES-878', 'DVLL-010', 'DWI-01',
    'EBOD-249', 'EBOD-338', 'EBOD-405', 'EBOD-416', 'EDD-191', 'EMRD-058', 'EQ-059', 'EXD-048', 'FAJS-035', 'FAX-306', 'FAX-428', 'FSET-249', 'FSET-264', 'FSET-294', 'FSET-320', 'FSET-321', 'FSET-323', 'FSET-324', 'FSET-421', 'FSET-553',
    'GASO-0012', 'GASO-0013', 'GDTM-044', 'GDTM-054', 'GDTM-078', 'GENT-060', 'GENT-075','GEXP-91', 'GEXP-93', 'GG-106', 'GG-132', 'GG-177', 'GG-228', 'GIRO-92', 'GKI-012', 'GSHRB-037', 'GSHRB-046', 'GVG-106', 'GVG-135', 'GVG-158', 'GVG-067', 'GVRD-05',
    'HAVD-596', 'HAVD-830', 'HAVD-837', 'HBAD-141', 'HBAD-260', 'HBAD-267', 'HDI-001', 'HED-002', 'HELL-102', 'HERR-024', 'HERR-029', 'HERX-025', 'HERX-029','HND-110', 'HND-132', 'HND-138', 'HND-186', 'HNDS-024', 'HNDS-024', 'HODV-20467', 'HODV-20978',
    'HODV-20986', 'HODV-20993', 'HODV-21002', 'HODV-21027', 'HODV-21062', 'HRRB-003', 'HUNT-852', 'HUNT-913', 'HUNT-946', 'HUNT-971', 'HUNT-999', 'HUNTA-018', 'HUNTA-025', 'HUNTA-032', 'HUNTA-006', 'IBW-312',
    'IBW-356', 'IBW-363', 'IBW-372', 'IBW-475z', 'IBW-476z', 'IBW-483z', 'IBW-495z', 'IBW-506z', 'IBW-508z', 'IBW-518z', 'IDOL-018', 'IEND-002', 'IENE-101', 'IENE-112', 'IENE-114', 'IENE-159', 'IENE-160',
    'IENE-386', 'IENE-406', 'IENE-412', 'IENE-431', 'IESP-104', 'IESP-114', 'IESP-418', 'IESP-458', 'INU-027', 'IPTD-587', 'IPTD-619', 'IPTD-694', 'IPTD-813', 'IPTD-949', 'IPZ-140', 'IPZ-187', 'IPZ-204', 'IPZ-210',
    'IPZ-226', 'IPZ-228', 'IPZ-235', 'IPZ-257', 'IPZ-281', 'IPZ-306', 'IPZ-331', 'IPZ-344', 'IPZ-368', 'IPZ-040', 'IPZ-478',  'JOHS-005', 'JUC-112', 'JUC-368', 'JUC-398', 'JUC-419', 'JUC-944', 'JUMP-2210', 'JUMP-2312',
    'JUX-298', 'JUX-360', 'JUX-500', 'KAWD-596', 'KAWD-608', 'KAWD-629', 'KAWD-640', 'KAWD-651', 'KISD-082', 'KK-054', 'KRND-020', 'KRND-027', 'KRND-029', 'KRND-031', 'KTDS-726', 'KTDS-769', 'KTDS-774', 'LLR-005',
    'LLR-008', 'LOL-089', 'LOL-091', 'LOVE-90', 'MAS-052', 'MDTM-001', 'MDTM-013', 'MDTM-027', 'MDTM-029', 'MDYD-732', 'MDYD-785', 'MDYD-811', 'MDYD-881', 'MIAD-488', 'MIAD-573', 'MIAD-730', 'MIAD-767', 'MIDD-678',
    'MIDE-113', 'MIDE-123', 'MIDE-243', 'MIDE-007', 'MIGD-590', 'MIGD-594', 'MIGD-613', 'MIGD-625', 'MIGD-639', 'MIGD-654', 'MILD-863', 'MIMK-023', 'MIRD-139', 'MIST-045',
    'MMND-104', 'MNG-93', 'MOC-004',
    'MOMJ-017', 'MSK-006', 'MSTT-002', 'MUKD-192', 'MUKD-335', 'MUM-001', 'MUM-105', 'MUM-109', 'MUM-110', 'MUM-113', 'MUM-114', 'MUM-119', 'MUM-126', 'MUM-130', 
    'MUM-132', 'MUM-135', 'MUM-143', 'MUM-144', 'MUM-165',
    'MUM-168', 'MUM-169', 'MUM-172', 'MUM-173', 'MUM-174', 'MUM-019', 'MUM-067', 'MUM-007', 'MUM-079', 'MUM-097', 'MVSD-198', 'MXGS-236', 'MXGS-271', 'MXGS-553', 
    'MXGS-729', 'MXSPS-178',   'NHDT-996', 'NHDTA-141',
    'NHDTA-153', 'NHDTA-223', 'NHDTA-276', 'NHDTA-295', 'NHDTA-314', 'NHDTA-346', 'NHDTA-348', 'NHDTA-399', 'NHDTA-557', 'NHDTA-564', 'NHDTA-583', 'NHDTA-588', 'NHDTA-591', 'NHDTA-599', 'NHDTA-600', 'NHDTA-605',
    'NHDTA-606', 'NHDTA-610', 'NHDTA-636', 'NHDTA-639', 'NHDTA-644', 'NHDTA-657', 'NIN-004', 'NITR-139', 'NOP-019', 'NTR-003',  'ODFB-037', 'ODFP-010', 'OGPP-006', 'OKSN-103', 'OKSN-127', 'OKSN-228', 'OKSN-242', 
    'ONED-557', 'ONED-989', 'ONEG-029', 'ONEZ-027', 'ONEZ-035', 'ONI-013', 'OVG-025', 'OYC-004', 'OYC-005',  'PARM-062', 'PARM-065', 'PARM-070', 'PARM-077', 'PGD-587', 'PGD-788', 'PMP-189', 'PMP-193', 'PMS-198',
    'PMS-201', 'PPPD-320', 'PPPD-337',  'QBD-065', 'QQ-041', 'R18-294', 'RAW-006', 'RBD-173', 'RBD-249', 'RBD-281', 'RBD-291', 'RBD-306', 'RBD-328', 'RBD-346', 'RBD-360', 'RBD-368', 'RBD-395', 'RBD-397', 'RBD-418',
    'RBD-441', 'RBD-481', 'RBD-487', 'RBD-493', 'RBD-503', 'RBD-505', 'RBD-541', 'RBD-551', 'RBD-626', 'RBD-628', 'RBD-694', 'RCT-222', 'RCT-352', 'RCT-600', 'RCT-666', 'RCT-752', 'RDD-122', 'RHTS-015', 'RHTS-032',
    'RHTS-040', 'RTP-020', 'RTP-035', 'RTP-039', 'RTP-049', 'RTP-057', 'RTP-009',  'SAK-8453', 'SAMA-842', 'SAMA-853', 'SBNS-078', 'SCOP-118', 'SCOP-185', 'SCOP-266', 'SCR-111', 'SCR-021', 'SCR-022', 
    'SCR-023', 'SCR-040', 'SCR-043', 'SCR-050', 'SCR-056', 'SCR-057', 'SCR-067', 'SCR-069', 'SCR-077', 'SCR-082', 'SCR-089', 'SCR-092', 'SCR-099', 'SDDE-346', 'SDDE-372', 'SDDE-391', 'SDMS-297', 'SDMT-506', 
    'SDMU-100', 'SDMU-120', 'SDMU-140', 'SDMU-161', 'SDMU-165', 'SDMU-194', 'SDMU-196', 'SERO-0262', 'SERO-0269', 'SGA-019', 'SHE-125', 'SHE-147', 'SHKD-315', 'SHKD-345', 'SHKD-378', 'SHKD-403', 'SHKD-409',
    'SHKD-489', 'SHKD-518', 'SHKD-546', 'SHKD-586', 'SHKD-614', 'SHKD-619', 'SHL-035', 'SILK-001', 'SILK-052', 'SILK-009', 'SIS-012', 'SIS-020', 'SIS-021', 'SIS-022', 'SIS-023', 'SIS-028', 'SIS-032', 'SIS-007', 
    'SMA-661', 'SMA-723', 'SMS-004', 'SND-003', 'SNIS-110', 'SNIS-268', 'SNIS-313', 'SNIS-070', 'SNIS-070', 'SOE-146', 'SOE-028', 'SOE-339', 'SOE-586', 'SOE-910', 'SOE-936', 'SOE-940', 'SOE-941', 'SOE-990', 'SOE-992',
    'SOE-992', 'SON-501', 'SOR-018', 'SQTE-082', 'SQTE-090', 'SQTE-092', 'SRS-015', 'SS-025', 'SS-005', 'SSD-111', 'SSD-086', 'STAR-3115', 'STAR-316','STAR-325', 'STAR-395', 'STAR-476', 'STAR-545', 'STAR-551',
    'STAR-553'
);
var s;

class BotAsync {
    constructor() {

        
       var jav = new SimpleFilter(["jav", "nude"], "Bạn phải có code mới xem được ảnh JAV nhé <3 Để lấy code <3 Hãy share page và kiếm 10 like :v");
        this._helloFilter = new SimpleFilter(["hi", "halo", "hế lo", "hello", "chào", "xin chào"], "Chào bạn, mềnh là bot Măm <3 Bạn cần giúp gì nào ?");
        var girlFilter = new ImageFilter(["@gái", "@girl", "hình gái", "anh gai", "cute girl"], girlAPI.getRandomGirlImage.bind(girlAPI)); // From xkcn.info
        var sexyGirlFilter = new ImageFilter(["@sexy", "sexy", "fap", "anh nong", "hot girl", "hinh sexy", "gai sexy", "sexy girl"],
            girlAPI.getRandomSexyImage.bind(girlAPI, "637434912950811", 760)); // From xinh nhẹ nhàng 
        var thoitietFilter = new SimpleFilter(["thời tiết", "thoi tiet", "Thời tiết", "Thoi tiet"], thoitietAPI.getthoitiet.bind(thoitietAPI, "hà nội"));
        var bikiniGirlFilter = new ImageFilter(["@bikini", "bikini", "ao tam", "do boi"],
            girlAPI.getRandomSexyImage.bind(girlAPI, "169971983104176", 1070)); // From hội bikini
            var javFilter = new ImageFilter(["H081576"], javAPI.getRandomJAVImage.bind(javAPI));
        var youtubeFilter = new YoutubeFilter(["@nhạc", "@music", "@youtube", "@yt"]);

        var helpFilter = new ButtonFilter(["help", "giúp đỡ", "giúp với", "giúp mình", "giúp", "hướng dẫn"],
             `Do bot mới được phát triển nên còn ngu nên chỉ có:\n1. Chém gió vui.\n2. Gửi ảnh đồ vật cho bot nhận diện(Còn đang thử nghiệm).\n3. Xem hình gái xinh với cú pháp @gái, @fap, sexy girl).\n4. Tìm nhạc với cú pháp @music (@music sơn tùng)\n`, [{
                title: "Chat với admin",
                type: BUTTON_TYPE.POSTBACK,
                payload: PAYLOAD.STOP
            }, {
                title: "Xem hình gái",
                type: BUTTON_TYPE.POSTBACK,
                payload: PAYLOAD.GIRL
            }]);
		
        var botInfoFilter = new SimpleFilter(["may la ai", "may ten gi", "may ten la gi",
                "ban ten la gi", "ban ten gi", "ban la gi",
                "bot ten gi", "bot ten la gi", "your name",
				"mày là ai", "mày tên gì", "mày tên là gì", "bạn tên là gì", "bot tên là gì", "bot tên gì"
            ],
            "Mình là chat bot Măm <3. Viết bởi anh Rexviet đập chai cute <3");
	var yeunuocFilter = new SimpleFilter(["Anh co yeu nuoc khong", "May co yeu nuoc khong", "Yeu nuoc khong","Anh Lê, anh có yêu nước không", "anh có yêu nước không"
, "mày có yêu nước không", "yêu nước không"	
	],
	"Tất nhiên là có chứ!");
var giubimatFilter = new SimpleFilter(["Anh co the giu bi mat duoc khong", "May co the giu bi mat duoc hay khong",
"anh có thể giữ bí mật được không", "Mày có thể giữ bị mật được hay không"],
"Có. Tôi muốn đi ra nước ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, Tôi sẽ trở về giúp đồng bào chúng ta. Nhưng đi một mình, thật ra cũng có nhiều mạo hiểm, ví như đau ốm… Anh muốn đi với tôi không ?");
var tienFilter = new SimpleFilter(["Tien dau ra ma di", "Nhưng bạn ơi tiền đâu ra mà đi", "tiền đâu ra mà đi"],
"Đây, tiền đây.Chúng ta sẽ làm việc, chúng ta sẽ làm bất cứ việc gì mà sống và để đi. Anh cùng đi với tôi chứ ?");
// var thoaFilter = new SimpleFilter([
// "Crush cua Quang Huy a3 la ai", "Crush của Quang Huy a3 là ai", "Crush Quang Huy a3 la ai", "Crush Quang Huy a3 là ai",
// "Crush của idol a3 là ai", "Crush cua idol a3 la ai", "Crush idol a3 la ai", "Crush idol a3 là ai", "Crush ai dồ a3 là ai", "Crush ai do a3 la ai",
// "Crush cua Quang Huy 9a3 la ai", "Crush của Quang Huy 9a3 là ai", "Crush Quang Huy 9a3 la ai", "Crush Quang Huy 9a3 là ai",
// "Crush của idol 9a3 là ai", "Crush cua idol 9a3 la ai", "Crush idol 9a3 la ai", "Crush idol 9a3 là ai", "Crush ai dồ 9a3 là ai", "Crush ai do 9a3 la ai",
// "Crush cua Chu Lap Hoang la ai", "Crush của Chu Lập Hoàng là ai", "Crush Chu Lap Hoang la ai", "Crush Chu Lập Hoàng là ai", "Crush Chu Lap Hoang la ai",
// "Crush cua Chu Lap Hoang a7 la ai", "Crush của Chu Lập Hoàng a7 là ai", "Crush Chu Lap Hoang a7 la ai", "Crush Chu Lập Hoàng a7 là ai", "Crush Chu Lap Hoang a7 la ai",
// "Crush cua Chu Lap Hoang 9a7 la ai", "Crush của Chu Lập Hoàng 9a7 là ai", "Crush Chu Lap Hoang 9a7 la ai", "Crush Chu Lập Hoàng 9a7 là ai", "Crush Chu Lap Hoang 9a7 la ai",
// "Crush cua CLH a7 la ai", "Crush của CLH a7 là ai", "Crush CLH a7 la ai", "Crush CLH a7 là ai", "Crush CLH a7 la ai",
// "Crush cua CLH 9a7 la ai", "Crush của CLH 9a7 là ai", "Crush CLH 9a7 la ai", "Crush CLH 9a7 là ai", "Crush CLH 9a7 la ai"
// ],		
// "Trj.nk Kjm Tho@ =)))"); 
 
var soloFilter = new SimpleFilter(["Solo daxua khong", "Solo yasuo khong", "solo daxua ko", "solo daxua k", "solo yasuo ko", "solo yasuo k",
"Solo daxua không", "Solo yasuo không"
],
"Tao chỉ kèo kèo solo chặt cu thôi!"); 
 
var yeutaokFilter = new SimpleFilter(["yeu tao khong", "yeu tao ko", "yeu tao k", "may yeu tao khong", "may yeu tao ko", "may yeu tao k", "m yeu t k", " m yeu t ko", "m yeu t khong", "yeu t k", "yeu t ko", "yeu t khong",
"yêu tao không", "yêu tao ko", "yêu tao k", "mày yêu tao không", "mày yêu tao ko", "mày yêu tao k", "m yêu t k", " m yêu t ko", "m yêu t không", "yêu t k", "yêu t ko", "yêu t không", "mày có yêu tao không", "may co yeu tao khong", "may co yeu tao ko", "mày có yêu tao ko", "mày có yêu tao k", "may co yeu tao k",
], 
"Mày tuổi mèo?"); 
// var chuongFilter = new SimpleFilter(["Chuong la ai", "Quan chuong la ai", "Quan Bell la ai", "chuông là ai", "Quân chuông là ai", "Quân Bell là ai"
// ], 
// "Là lãnh đảo Đảng Cộng Sản Tộ Team =))) But sắp bị thần lật đổ r"); 
// var taokhongvaoFilter = new SimpleFilter (["Tao khong vao dia nguc thi ai", "tao không vào địa ngục thì ai"
// ],
// "Chỉ tại Công Sản ");
// var crushHaiFilter = new SimpleFilter([
// "crush của Hải là ai", "Crush Hải là ai", "Crush Hải a2 là ai", "Crush của Hải a2 là ai", "crs Hải là ai", "Crs của Hải là ai",
// "crs Hải a2 là ai", "Crs của Hải a2 là ai"
// ],
// "404 Not Found!");
// var CrushKhanhFilter = new SimpleFilter ([
// "Crush của PNK là ai", "Crush PNK là ai", "Crs của PNK là ai", "Crs PNK là ai", 
// "Crush của PNK a1 là ai", "Crush PNK a1 là ai", "Crs của PNK a1 là ai", "Crs PNK a1 là ai",
// "Crush của PNK 9a1 là ai", "Crush PNK 9a1 là ai", "Crs của PNK 9a1 là ai", "Crs PNK 9a1 là ai",
// "Crush của Phạm Ngọc Khánh 9a1 là ai", "Crush Phạm Ngọc Khánh 9a1 là ai", "Crs của Phạm Ngọc Khánh 9a1 là ai", "Crs Phạm Ngọc Khánh 9a1 là ai",
// "Crush của Phạm Ngọc Khánh là ai", "Crush Phạm Ngọc Khánh là ai", "Crs của Phạm Ngọc Khánh là ai", "Crs Phạm Ngọc Khánh là ai", 
// "Crush của Phạm Ngọc Khánh a1 là ai", "Crush Phạm Ngọc Khánh a1 là ai", "Crs của Phạm Ngọc Khánh a1 là ai", "Crs Phạm Ngọc Khánh a1 là ai",
// "Crush của Khánh là ai", "Crush Khánh là ai", "Crs của Khánh là ai", "Crs Khánh là ai", 
// "Crush của Khánh a1 là ai", "Crush Khánh a1 là ai", "Crs của Khánh a1 là ai", "Crs Khánh a1 là ai",
// "Crush của Khánh 9a1 là ai", "Crush Khánh 9a1 là ai", "Crs của Khánh 9a1 là ai", "Crs Khánh 9a1 là ai"
// ],
// "<3 Hiện tại thì hình như là không :v Trước có Cuốc <3");
var ChatbotDzFilter = new SimpleFilter (["Chatbot dep trai", "Chatbot đẹp trai", "Chatbot dep zai", "chatbot đẹp zai"
],
"Quá đẹp luôn <3 :))");
// var crushFilter = new SimpleFilter([
// "Crush của Minh là ai", "Crush Minh là ai", "Crs của Minh là ai", "Crs Minh là ai", 
// "Crush của Minh a3 là ai", "Crush Minh a3 là ai", "Crs của Minh a3 là ai", "Crs Minh a3 là ai",
// "Crush của Minh 9a3 là ai", "Crush Minh 9a3 là ai", "Crs của Minh 9a3 là ai", "Crs Minh 9a3 là ai",
// "Crush của Hoàng Minh là ai", "Crush Hoàng Minh là ai", "Crs của Hoàng Minh là ai", "Crs Hoàng Minh là ai", 
// "Crush của Hoàng Minh a3 là ai", "Crush Hoàng Minh a3 là ai", "Crs của Hoàng Minh a3 là ai", "Crs Hoàng Minh a3 là ai",
// "Crush của Hoàng Minh 9a3 là ai", "Crush Hoàng Minh 9a3 là ai", "Crs của Hoàng Minh 9a3 là ai", "Crs Hoàng Minh 9a3 là ai",
// ],
// "Không cần thêm một ai nữa :) - Crush mình là Python đấy :)" );
// var CrushCuocFilter = new SimpleFilter (["Crush Cuốc là ai", "Crush của Cuốc là ai"], "Nó crush ad Nguyễn Hoàng Minh :v :)))");
// var bosscfsFilter = new SimpleFilter(["Boss của Tộ team Cfs là ai"
// ],
// "Boss Quân :|");
// var PNKFilter = new SimpleFilter(["PNK là ai", "Phạm Ngọc Khánh là ai"
// ],
// "Lớp trưởng 9a1 :| Nhìn trước thì xinh xắn lắm(Bạn nào muốn tán gọi mình :| Mình chỉ cho) nhưng kể từ cắt tóc đến mình còn k có hứng =))");

// var CuocFilter = new SimpleFilter (["Cuốc là ai"
// ],
// "Mặt nó ngu vãi cả lồn nhưng đéo hiêu sao được giải nhất Hóa =)) Dâm vc :v Còn bị gay nữa :v");

 var adInfoFilter = new SimpleFilter(["ad la ai", "hoi ve ad", "ad ten gi", "who is ad",
                "ad la thang nao", "thong tin ve ad", "ad dau", "admin",
                "ai viet ra may", "who made you", "ad la gi", "ad ten la gi", "thang nao tao ra may", "thang nao tao ra may",
				"ad là ai", "hỏi về ad", "ad tên gì", "who is ad", "ad là thằng nào", "thông tin về ad",
				"ad ở đâu", "admin", "ad là gì", "ai là thằng viết ra mày", "ai viết ra mày", "thằng nào làm ra mày", "thằng nào tạo ra mày", 
            ],
            "Ad là Rexviet Evakoviz, đập chai cute thông minh tinh tế <3.");
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
		

          this._filters = [
            new SpamFilter(), youtubeFilter, adInfoFilter, girlFilter, sexyGirlFilter, 
            bikiniGirlFilter, javFilter, jav, yeunuocFilter, giubimatFilter, tienFilter, 
            soloFilter, yeutaokFilter, startFilter, stopFilter,	ChatbotDzFilter, 
            chuiLonFilter, thankyouFilter, helpFilter, thoitietFilter,
            this._goodbyeFilter, this._helloFilter, testFilter, new EndFilter(),
        ];
    }

    setSender(sender) {
        this._helloFilter.setOutput(`Chào ${sender.first_name}, mềnh là bot Măm <3. Bạn cần giúp gì nào <3 ?`);
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
            console.log('output:', output);
            console.log(typeof output);
            switch (botReply.type) {
                case BOT_REPLY_TYPE.TEXT:
                   //Wrote by ZeroUnix
                   
         //          textInput.toLowerCase(); // Non case-sensitive
                    textInput.toLowerCase();
                    if(textInput.indexOf("stop") != -1 || textInput.indexOf("stop") != -1) {
                        fbAPI.sendTextMessage(senderId,"Ơi! Admin đây <3 Nói gì nào. Để bật lại bot hãy hỏi bot đâu <3")
                        return isRep[senderId] = true;
                    }
                    
                    if(isRep.hasOwnProperty(senderId)) {
                        if(textInput.indexOf("start") != -1 || textInput.indexOf("chat bot") !=    -1) {
                            delete isRep[senderId];
                            return fbAPI.sendTextMessage(senderId, "Ok, chat típ nà <3");
                        }
                        return;
                    }
   
                    if(textInput.indexOf("code") !=-1 || textInput.indexOf("Code") !=-1) {
                        s = Math.floor((Math.random()*x.length)+1);
                            return  fbAPI.sendTextMessage(senderId, x[s]);
                    }

                    if (output instanceof Array) {
                        console.log('vo day roi ne')
                        return sendMultiTextMessages(senderId, output);
                    }
                    // if(textInput.indexOf("thoi tiet")!=-1 || textInput.indexOf("thời tiết")!=-1){
                    //     SendWeatherMessage(textInput, function(err, res) {
                    //         if(err) {
                    //             console.log('weather api err:', err);
                    //             return;
                    //         }
                    //         var arr_mess = [];
                    //         for(var i=0; i<res.messages.length; i++) {
                    //             arr_mess.push(res.messages[i].text);
                    //         }
                    //         console.log('arr mess:', arr_mess);
                    //         sendMultiTextMessages(senderId, arr_mess)
                    //         return;
                    //     });                            
                    // }
                    console.log('lot ra ngoai roi')
                    return fbAPI.sendTextMessage(senderId, output);
                    
                    
                   // fbAPI.sendTextMessage(senderId, output);

                 break;
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
            }
        })();
    }


    processImage(senderId, imageUrl) {
        // If the image is not an emo
        if (imageUrl.includes("&oh=") && imageUrl.includes("&oe=")) {
            // faceRecAPI.analyzeImage(imageUrl).then((reply) => {
            //     fbAPI.sendTextMessage(senderId, reply);
            // });

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
