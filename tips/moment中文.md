---
title: moment添加中文
tags: moment, moment中文
notebook: other
--- 

#### 项目中经常要处理时间的格式， `moment`工具库是一个非常不错的处理方法，但是默认moment是没有中文的
- `moment`常见的用法
```javascript
moment(new Date()).format('YYYY-MM-DD HH:mm:ss'); // 2018-12-08 10:50:30
moment(new Date()).format('MM月DD日'); // 09月01日
moment(new Date()).format('MMM'); // 9月
moment(new Date()).format('MMMM'); // 九月
moment(new Date()).format('dd'); // 六
moment(new Date()).format('ddd'); // 周六
moment(new Date()).format('dddd'); // 星期六
moment(new Date()).isoWeekday(); // 6
moment(new Date()).isoWeekYear(); // 2018
moment(new Date()).format('LT'); // 16:56
moment(new Date()).format('LTS'); // 16:56:34
moment(new Date()).format('L'); // 2018-09-01
moment(new Date()).format('LL'); // 2018年09月01日
moment(new Date()).format('LLL'); // 2018年09月01日下午4点56分
moment(new Date()).format('LLLL'); // 2018年09月01日星期六下午4点56分
moment(new Date()).format('l'); // 2018-9-1
moment(new Date()).format('ll'); // 2018年9月1日
moment(new Date()).format('lll'); // 2018年9月1日 16:56
moment(new Date()).format('llll'); // 2018年9月1日星期六 16:56
moment(new Date()).format('A'); // 下午
moment(new Date()).format('a'); // 下午
moment(new Date()).format('ALT') // 下午17:09
// subtract 减法 、 add 加法
moment().add(7, days).format('LL'); // 7天后的日期 2018年09月08日
moment().subtract(7, 'days').format('LL'); // 7天前的日期 2018年08月25日
moment().add(9, 'hours').format('HH:mm:ss'); // 9小时后 01:56:34
moment().add(1, 'week').format('LL'); // 1周后 2018年09月08日
// fromNow 时差 (之前) ; fromNow(true)  去除前或者内字
moment([2017, 0, 29]).fromNow(true); //  2年
moment([2017, 0, 29]).fromNow(); //  2年前
moment([2019, 0, 29]).fromNow(true); //  5个月
moment([2019, 0, 29]).fromNow(); //  5个月内
moment("20120901", "YYYYMMDD").fromNow(); // 6年前
moment(+new Date() - 1000 * 300).fromNow(); // 5分钟前
moment(+new Date() - 1000 * 3).fromNow(); // 几秒前
moment(+new Date() - 3 * 24 * 60 * 60 * 1000).fromNow(); // 3天前
moment(+new Date() - 30 * 24 * 60 * 60 * 1000).fromNow(); // 1个月前
moment(+new Date() - 365 * 24 * 60 * 60 * 1000).fromNow(); // 1年前
// toNow 时差 (之后 现在为基准) ; toNow(true)  去除前或者内字
moment([2007, 0, 29]).toNow() // 12年内
moment([2020, 0, 29]).toNow() // 1年前
moment([2020, 0, 29]).toNow(true) // 1年
// 时差 (之后) ; to(true)  // 去除前或者内字
moment([2007, 0, 29]).to() // 12年内
moment([2020, 0, 29]).to() // 1年前
moment([2020, 0, 29]).to(true) // 1年
// 时差 (毫秒) 
moment([2007, 0, 29]).diff(moment([2007, 0, 28])); //  86400000
// 时差 (分钟) 
moment([2007, 0, 29]).diff(moment([2007, 0, 28]), 'minute');
// 时差 (天) 
moment([2007, 0, 29]).diff(moment([2007, 0, 28]), 'days') //  1
// 天数 (月) 
moment("2012-02", "YYYY-MM").daysInMonth() //  29

//时间差
let m1 = moment()
let m2 = moment('2019-03-30 18:13:12')//指定一个时间
var du = moment.duration(m2 - m1, 'ms'),
hours = du.get('hours'),
mins = du.get('minutes'),
ss = du.get('seconds');
console.log(hours + '时' + mins + '分' + ss + '秒');
```

- `moment`添加中文
在项目中的入口文件中添加一下代码
```javascript
import moment from 'moment'

// 里面的字符可以根据自己的需要进行调整
moment.locale('zh-cn', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MM月DD日',
        LLL: 'YYYY年MM月DD日Ah点mm分',
        LLLL: 'YYYY年MM月DD日ddddAh点mm分',
        l: 'YYYY-M-D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
            meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        const hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar: {
        sameDay: '[今天]LT',
        nextDay: '[明天]LT',
        nextWeek: '[下]ddddLT',
        lastDay: '[昨天]LT',
        lastWeek: '[上]ddddLT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年'
    },
    week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
})
```
之后在项目中就可以使用`moment`显示中文格式