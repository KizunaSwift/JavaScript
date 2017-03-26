/**
 * lixianwei 2017-03-25
 * 2017-03-26
 */
var vibe = {
    version: '1.0',
    countdown: 60,
    /**
     *获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
     */
    dateFormat: function() {
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
     */
    numberSort: function(arr) {
        function sortNumber(a, b) {
            return a - b;
        }
        return arr.sort(sortNumber);
    },

    /*
     * 页面loading
     */
    showLoading: function() {
        var loadingCSS = $("<style>.current a {font-size: 20px;}.over {background-color: #f5f5f5;display: none;height: 100%;left: 0;opacity: 0.5;position: absolute;top: 0;width: 100%;z-index: 1000;}.layout {display: none;height: 20%;left: 40%;position: absolute;text-align: center;top: 40%;width: 20%;z-index: 10013;}</style>");
        $("head")[0].appendChild(loadingCSS[0]);
        var loadingDOM = $("<div id='over' class='over'></div><div id='layout' class='layout'><img src='https://raw.githubusercontent.com/summervibe/summer-vibe/master/loading.gif'/></div>");
        $("body").append(loadingDOM);
        $("#over").show();
        $("#layout").show();
    },

    hideLoading: function() {
        $("#over").hide();
        $("#layout").hide();
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
        var Id = '#' + id;

        function settime() {
            if (countdown === 0) {
                $(Id).removeAttr('disabled');
                $(Id).css({
                    'background': '#5bc0de',
                    'border-color': '#5bc0de'
                });
                countdown = 60;
                $(Id).text('倒计时60s');
                clearInterval(t);
            } else {
                $(Id).attr('disabled', 'disabled');
                $(Id).css({
                    'background': '#999',
                    'border-color': '#999'
                });
                countdown = countdown === 60 ? 59 : countdown;
                $(Id).text(countdown + 's');
                countdown--;
            }
        }
        var t = setInterval(function() {
            settime();
        }, 1000);
    },

    /*
     * 倒计时60s
     */
    clock: function(id) {
        var Id = '#' + id;

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
            $(Id).text(h + ':' + m + ':' + s);
        }
        var t = setInterval(function() {
            settime();
        }, 1000);
    }
};
