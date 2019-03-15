window.onload = function() {
    var requestTemplate = 'AlQwMBwxLjM3HDAxHEFVVEhBTVQfVElQQU1UHBxFQ1JSRUZOVU0cHBwcHBwDfQ==';
    var responseTemplate = 'AjAcVDAxHDEuNDAcMDAwMDAwHE9LHDAfREVNTyBBUFBST1ZFRB8wMDAwMDAfODg4ODg4ODgfHxwwMRxBUFBST1ZFREFNVB8wH1RJUEFNVB8wHzAfMB8xMjA0OB8yMDIyHDExMjUfMR8wNTIzHx8fHzAyHx8fHzAcVEVSTUlOQUxSRUZOVU0fRUNSUkVGTlVNH1RJTUVTVEFNUB8cHxwcHENBUkRCSU49NTQxMzMzH1BST0dSQU1UWVBFPTAfU049NDQzMzIyMTEfRENDPU4DXA==';
    document.getElementById("RequestTemplate2").value = requestTemplate;
    document.getElementById("ResponseTemplate2").value = responseTemplate;
    document.getElementById("RequestTemplate1").value = base64decode(requestTemplate);
    document.getElementById("ResponseTemplate1").value = base64decode(responseTemplate);
}

function Decode() {
    var needHex = document.getElementById("HexCheck").checked;
    var inputStr = document.getElementById("Base64Input").value;
    var strArr = inputStr.split(",");
    var result = '';
    var compareInner = '';
    for (var i = 0; i < strArr.length; ++i) {
        var temp = strArr[i].trim();
        var decodeStr = base64decode(temp);
        var hexStr = needHex ? '<br><br>' + CharToHex(decodeStr) : '';
        result += decodeStr + '\n\n';
        compareInner += temp + '<br><br>' + decodeStr + hexStr + '<br><br><br><br>';
    }
    document.getElementById("Base64Output").value = result;
    document.getElementById("CompareShow").innerHTML = compareInner;
}

function Encode() {
    var needHex = document.getElementById("HexCheck").checked;
    var inputStr = document.getElementById("Base64Input").value;
    var strArr = inputStr.split(",");
    var result = '';
    var compareInner = '';
    for (var i = 0; i < strArr.length; ++i) {
        var temp = strArr[i].trim();
        var encodeStr = base64encode(temp);
        var hexStr = needHex ? '<br><br>' + CharToHex(encodeStr) : '';
        result += encodeStr + '\n\n';
        compareInner += temp + '<br><br>' + encodeStr + hexStr + '<br><br><br><br>';
    }
    document.getElementById("Base64Output").value = result;
    document.getElementById("CompareShow").innerHTML = compareInner;
}

function GenerateMsgData() {
    var requestTemplate = document.getElementById("RequestTemplate2").value;
    var responseTemplate = document.getElementById("ResponseTemplate2").value;
    console.log('req ', requestTemplate);
    console.log('res ', responseTemplate);
    var reqDecode = base64decode(requestTemplate);
    var resDecode = base64decode(responseTemplate);
    var msgData = '<Records>';
    //Replace AUTHAMT, TIPAMT, ECRREFNUM in request template
    //Replace APPROVEDAMT, TIPAMT, TERMINALREFNUM, ECRREFNUM, TIMESTAMP in response template
    for (var i = 0; i < 10; ++i) {
        var timestamp = new Date().Format("yyyyMMddHHmmss");
        var ecrrefnum = (Math.random() * 1000).toFixed(0);
        var terminalrefnum = i;
        var posid = terminalrefnum % 3 != 0 ? 'posid111' : '';
        var authamt = (Math.random() * 200000 + 2000).toFixed(0);
        var tipamt = (Math.random() * 10000 + 500).toFixed(0);
        var randomReq = base64encode(reqDecode.replace('AUTHAMT', authamt).replace('TIPAMT', tipamt).replace('ECRREFNUM', ecrrefnum));
        var randomRes = base64encode((resDecode.replace('APPROVEDAMT', authamt + tipamt).replace('TIPAMT', tipamt).replace('TERMINALREFNUM', terminalrefnum).replace('ECRREFNUM', ecrrefnum).replace('TIMESTAMP', timestamp)));
        msgData += '<Record>';
        msgData += '<TransDateTime>' + timestamp + '</TransDateTime>';
        msgData += '<TerminalRefNum>' + terminalrefnum + '</TerminalRefNum>';
        msgData += '<POSID>' + posid + '</POSID>';
        msgData += '<RequestMsg>' + randomReq + '</RequestMsg>';
        msgData += '<ResponseMsg>' + randomRes + '</ResponseMsg>';
        msgData += '</Record>';
    }
    msgData += '</Records>';
    document.getElementById("MsgData").innerText = msgData;
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) { /* c1 */
        do { c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]; } while (i < len && c1 == -1);
        if (c1 == -1) break; /* c2 */
        do { c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]; } while (i < len && c2 == -1);
        if (c2 == -1) break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4)); /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61) return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1) break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2)); /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1) break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) { out += str.charAt(i); } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                /* 0xxxxxxx */
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                /* 110x xxxx   10xx xxxx */
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                /* 1110 xxxx  10xx xxxx  10xx xxxx */
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}

function CharToHex(str) {
    var out, i, h;
    out = "<table id='abc'><tr>";
    i = 0;
    while (i < str.length) {
        h = str.charCodeAt(i++).toString(16); /*out += "\\0x" + h; */
        out += "<td>" + (h.length == 1 ? "0" + h : h) + "</td>";
        out += (i > 0 && i % 8 == 0) ? "</td><td>&nbsp;&nbsp;&nbsp;</td><td>" : "";
        out += (i > 0 && i % 48 == 0) ? "</tr><tr>" : "";
    }
    out += "</table>";
    return out;
}

Date.prototype.Format = function(fmt, utc) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours() - (utc ? 8 : 0),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
