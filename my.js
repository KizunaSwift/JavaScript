/**
 * lixianwei 2017-03-25
 * update 2017-04-13
 */
var vibe = {
    version: '1.0',
    countdown: 60,
    /**
     *获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
     */
    getToday: function() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month > 0 && month < 10) {
            month = '0' + month;
        }
        if (strDate > 0 && strDate < 10) {
            strDate = '0' + strDate;
        }
        return year + '-' + month + '-' + strDate + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },

    /** 
     * 将数值四舍五入(保留2位小数)后格式化成金额形式 
     * @param num 数值(Number或者String) 
     * @return 金额格式的字符串,如'1,234,567.45' 
     * @type String 
     */
    formatCurrency: function(num) {
        num = num.toString().replace(/\$|\,|\s+/g, '');
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + '.' + cents);
    },

    /**
     * 数组去重
     */
    removeDuplicate: function(arr) {
        var result = {};
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (!result[arr[i]]) {
                newArr.push(arr[i]);
                result[arr[i]] = 1;
            }
        }
        return newArr;
    },

    /*
     * 数组排序 - 数字
     * array.from(new Set(arr))
     */
    numberSort: function(arr) {
        function sortNumber(a, b) {
            return a - b;
        }
        return arr.sort(sortNumber);
    },
	
    /*
     * 1-100 random
     */
    randomNum: function(m, n) {
    	return Math.floor(Math.random() * (m - n) + n);
    },

    /*
     * 页面loading
     */
    showLoading: function() {
        var loadingCSS = $("<style>.current a {font-size: 20px;}.over {background-color: #f5f5f5;display: none;height: 100%;left: 0;opacity: 0.5;position: fixed;top: 0;width: 100%;z-index: 1000;}.layout {display: none;height: 20%;left: 40%;position: fixed;text-align: center;top: 40%;width: 20%;z-index: 10013;}</style>");
        $("head")[0].appendChild(loadingCSS[0]);
        var loadingDOM = $("<div id='over' class='over'></div><div id='layout' class='layout'><img src='https://raw.githubusercontent.com/summervibe/summer-vibe/master/loading.gif'/></div>");
        $("body").append(loadingDOM);
        $("#over").show();
        $("#layout").show();
		$("body").css('overflow','hidden');
    },

    hideLoading: function() {
        $("#over").hide();
        $("#layout").hide();
		$("body").css('overflow','auto');
    },

    /*
     * 页面alert
     */
    alert: function(str) {
        var loadingCSS = $("<style>.errorTip {font-size: 14px;background-color: rgba(10, 10, 10, 0.7);height: 40px;color: #fff;text-align: center;border-radius: 5px;opacity: 0;width: auto;position: fixed;bottom: 20px;display: none;z-index: 1000;padding-left: 8px;padding-right: 8px;}.errorwords {padding-top: 9px;}</style>");
        $("head")[0].appendChild(loadingCSS[0]);
        var errorTip = $("<div class='errorTip'></div>");
        var errorwords = $("<div class='errorwords'></div>").appendTo(errorTip);
        $("body").append(errorTip);

        $(".errorwords").text(str);
        var eleWidth = $('.errorTip').width();
        $(".errorTip").animate({ opacity: '1', bottom: '80px' }, 400);
        $(".errorTip").css({ 'display': 'block', 'left': '50%', 'margin-left': '-' + eleWidth / 2 + 'px' });
        $(".errorTip").css('display', 'block');
        setTimeout(function() {
            $(".errorTip").animate({ opacity: 0, bottom: '10px' }, 500, function() {
                $(".errorTip").css('display', 'none');
            });
        }, 2000);
    },

    /*
     * 倒计时60s
     */
    countDown: function(id) {
        var countdown = 60;

        function settime() {
            if (countdown === 0) {
                $(id).removeAttr('disabled');
                $(id).css({
                    'background': '#5bc0de',
                    'border-color': '#5bc0de'
                });
                countdown = 60;
                $(id).text('倒计时60s');
                clearInterval(t);
            } else {
                $(id).attr('disabled', 'disabled');
                $(id).css({
                    'background': '#999',
                    'border-color': '#999'
                });
                countdown = countdown === 60 ? 59 : countdown;
                $(id).text(countdown + 's');
                countdown--;
            }
        }
        var t = setInterval(function() {
            settime();
        }, 1000);
    },

    /*
     * 闹钟 - 当前时间
     */
    clock: function(id) {

        function settime() {
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            // add a zero in front of numbers<10
            if (m >= 0 && m < 10) {
                m = '0' + m;
            }
            if (s >= 0 && s < 10) {
                s = '0' + s;
            }
            $(id).text(h + ':' + m + ':' + s);
        }
        var t = setInterval(function() {
            settime();
        }, 1000);
    },

    /*
     * 验证手机号
     */
    isMobile: function(str) {
        var regExp = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
        return regExp.test(str);
    },

    /**
     * @验证电话号码
     * @param {String} checkStr
     * @returns {Boolean}
     */
    checkLinkPhoneValid: function(checkStr) {
        var tel = /^(\(\d{3,4}\)|\d{3,4}\-{0,1})?\d{7,8}(\-\d{1,5})?$/;
        var mobile = /^1[3|4|5|7|8][0-9]\d{4,8}$/;

        var test1 = tel.test(checkStr);
        var test2 = mobile.test(checkStr);

        return (test1 || test2);
    },

    /*
     * 验证邮箱
     */
    isEmail: function(str) {
        var regExp = /^([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return regExp.test(str);
    },

    /*
     * 验证身份证
     */
    isIDCard: function(str) {
        var regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return regExp.test(str);
    },

    /*
     * 禁止输入Emoji表情
     */
    isEmoji: function(str) {
        var regExp = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        return str.match(regExp);
    },

    /*
     * ajax
     */
    ajaxRequest: function(url, params, callBack) {
        var ajaxRequest = $.ajax({
            url: url,
            async: true,
            timeout: 30000,
            type: "POST",
            dataType: "json",
            contentType: 'application/json',
            data: params,
            success: callBack,
            complete: function(XMLHttpRequest, status) {
                if (status == 'timeout') { //超时,status还有success,error等值的情况
                    ajaxRequest.abort();
                    vibe.alert("请求超时");
                }
            },
            error: function(msg) {
                vibe.alert(msg.statusText);
            }
        });
    },

    /**
     * @获取url参数方法
     * @returns {jsonObj}
     */
    getRequestParam: function() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = {};

        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");

            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }

        return theRequest;
    },

    /**
     * @获取url参数另一种方法
     */
    getRequestParam2: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
    },

    /**
     * 验证非法字符
     * @param {string}
     * @return {boolean}, 返回false表示含有非法字符
     */
    checkStrValid: function(checkStr) {
        if (typeof checkStr == "undefined") {
            return true;
        }
        var str = ["!", "#", "$", "%", "/", "\\", "'", "*", "&", "|"];
        for (var i = 0; i < str.length; i++) {
            if (checkStr.indexOf(str[i]) >= 0) {
                return false;
            }
        }
        return true;
    },

    /***
     * 正整数验证
     ***/
    checkIntegerValid: function(checkStr) {
        var reg = /^[0-9]*[1-9][0-9]*$/;
        return reg.test(checkStr);
    },

    /**
     * 比较日期大小
     * @param {string} startTime
     * @param {string} endTime
     * @returns {boolean}   
     */
    compareDate: function(startTime, endTime) {
        var startTimeArray = startTime.split("-");
        var endTimeArray = endTime.split("-");
        startTime = startTimeArray.join("/");
        endTime = endTimeArray.join("/");

        var startDate = new Date(startTime);
        var endDate = new Date(endTime);

        if (endDate.getTime() - startDate.getTime() < 0) {
            return false;
        } else {
            return true;
        }
    },

    /**
     * 获取指定日期距当前日期天数 （指定日期大于当前日期）
     * @param {string} startTime
     * @param {string} endTime
     * @returns {boolean}   
     */
    getDaysFromToday: function(dateStr) {
        var dateStrArray = dateStr.split("-");
        dateStr = dateStrArray.join("/");

        var dateStrMilli = new Date(dateStr).getTime();
        var todayMilli = new Date().getTime();

        return Math.floor((dateStrMilli - todayMilli) / (3600 * 1000 * 24));
    },

    /**
     * 获取指定日期
     * @param {string} date
     * @param {int} step
     * @returns {string}   
     */
    getAssignDate: function(date, step) {
        var dateArray = date.split("-");
        dateTime = dateArray.join("/");

        var newDate = new Date(dateTime);

        //获取step天后的日期，若为负数，可获取过去的日期
        newDate.setDate(newDate.getDate() + step);

        var y = newDate.getFullYear();
        var m = newDate.getMonth() + 1; //获取当前月份的日期
        var d = newDate.getDate();

        if (parseInt(m) < 10) {
            m = "0" + m;
        }

        if (parseInt(d) < 10) {
            d = "0" + d;
        }

        return y + "-" + m + "-" + d;
    },

    /**
     * 根据月份步长获取指定日期
     * @param {string} date
     * @param {int} step
     * @returns {string}   
     */
    getAssignDateByMonth: function(date, step) {
        var dateArray = date.split("-");
        dateTime = dateArray.join("/");

        var newDate = new Date(dateTime);

        //获取step天后的日期，若为负数，可获取过去的日期
        newDate.setMonth(newDate.getMonth() + step); // getMonth()

        var y = newDate.getFullYear();
        var m = newDate.getMonth() + 1; //获取当前月份的日期
        var d = newDate.getDate();

        if (parseInt(m) < 10) {
            m = "0" + m;
        }

        if (parseInt(d) < 10) {
            d = "0" + d;
        }

        return y + "-" + m + "-" + d;
    },

    /**
     * 格式化日期
     */
    dateFormat: function(date, fmt) {
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
        // 例子： 
        // ns.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2014-01-06 08:09:04.423 
        // ns.dateFormat(new Date(), "yyyy/M/d") ==> 2014/1/6 
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },

    /**
     * 获取时间数组
     * @returns {Array}
     */
    getTimeArray: function(time) {
        var timeArray = time.split(" ");
        var dateArray = timeArray[0].split("-");
        var hmsArray = timeArray[1].split(":");
        var detailArray = [];

        detailArray.year = dateArray[0];
        detailArray.month = dateArray[1];
        detailArray.day = dateArray[2];
        detailArray.hour = hmsArray[0];
        detailArray.minutes = hmsArray[1];
        detailArray.seconds = hmsArray[2];

        return detailArray;
    },

    /**
     * 获取该月份的天数
     * @returns {num}   
     */
    getMonthDays: function(year, month) {
        month = parseInt(month, 10);
        var d = new Date(new Date().getFullYear(), month, 0);
        return d.getDate();
    },

    /**
     * 回车搜索函数
     * @param {string} selectStr
     * @param {string} callback
     * @returns {void}   
     */
    enterSubmit: function(selectStr, callBack) {
        $(selectStr).bind('keyup', function(e) {
            if (e.keyCode == 13) {
                callBack();
                return false;
            }
        });
    },
    /**
     * 字符串逆向排序
     */
    reverseStr: function(str) {
        return str.toString().split('').reverse().join('');
    },
    /**
     * 字符串首字母大写
     */
    toUppercaseStr: function(str) {
        var array = str.toLowerCase().split(" ");
        for (var i in array) {
            //array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
            array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
        }
        return array.join(" ");
    }
};
