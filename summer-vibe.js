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
    }
};
