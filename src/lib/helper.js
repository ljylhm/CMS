import { Message, MessageBox, Loading, Notification } from 'element-ui';
import openFile from "./openFile"
import config from "../config/config"
import http from "./http"
(function (D) {
    D.ljyParse = function (str) {
        var arr = /Date\((\d{13})\)/.exec(str);
        if (arr && arr.length == 2) return new Date(Number(arr[1]));
        return new Date(Date.parse(str.replace(/-/g, '/')));
    };

    D.prototype.ljyMinus = function (date) {
        var ms = (this.getTime() - date.getTime()); // / 24 / 3600 / 1000;

        var day = Math.floor(ms / 24 / 3600 / 1000),
            hh = Math.floor((ms / 3600 / 1000) % 24),
            mm = Math.floor((ms / 1000 / 60) % 60),
            ss = Math.floor((ms / 1000) % 60);
        return {
            day: day,
            hour: hh,
            minute: mm,
            second: ss
        };
    }

    D.prototype.ljyGetWeek = function () {
        return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][this.getDay()];
    }

    D.prototype.ljyFormat = function (format) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "f+": this.getMilliseconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "w+": this.ljyGetWeek()
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
        return format;
    };
})(Date);

(function (S) {
    S.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
})(String);

const helper = {
    /*
    * @初始化路由
    */
    init: function (router) {
        this._router = router
    },
    _router: "",
    /*
    * @路由跳转 默认通过path来查找 参数通过param的方式来传递
    * query会将参数带在链接里 param则不会
    * @url 链接
    * @args 携带的参数
    * @mode 正常模式 或 replace模式
    */
    routerJump: function (url, args = "", mode = true) {
        if (!this._router || !url) return;

        let para = { path: url, query: args };

        if (mode) this._router.push(para);
        else this._router.replace(para);
    },
    routerReplace: function (url, args) {
        this.routerJump(url, args, false);
    },
    routerGo: function (num) {
        if (!this._router) return;
        this._router.go(num);
    },
    routerDataGet: function () {
        return this._router.currentRoute.query || {};
    },
    localStorageSet: function (name, value) {
        localStorage.setItem(name, value);
    },
    localStorageGet: function (name) {
        return localStorage.getItem(name);
    },
    /**
     * @description 针对elementUi message的封装
     * @param {String} mes 展示的文字信息
     * @param {String} type 类型 error warning success 可不填
     * @param {Boolean} isC 是否居中
     * @param {Object/Json} opt 其他设置
     */
    message: function (mes, type, isC, opt = {}) {
        let o = {
            message: mes || "",
            type: type || "",
            center: isC || true
        }
        o = Object.assign(o, opt);
        return Message(o);
    },
    /**
     * @description 关闭Message实例的方法
     */
    messageClose: function () {
        Message.closeAll()
    },
    /**
     * @description 针对elementUi confirm的封装
     * @param {String} mes 展示的文字信息
     * @param {String} title 标题
     * @param {String} type 类型 error warning success 可不填
     * @param {Object/Json} opt 其他设置
     * type {success / info / warning / error}
     */

    confirmInfo: function (mes, title = "提示", type, cb, opt = {}) {
        let fn = (action) => {
            let i = action == "confirm" ? true : false;
            cb && cb(i);
        }
        opt = Object.assign({
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type || "info",
            callback: fn
        }, opt);
        console.log("opt", opt);
        MessageBox.confirm(mes, title, opt, type);
    },

    alertInfo: function (mes, title = "提示", type, cb, opt) {
        MessageBox.alert(mes, title, {
            confirmButtonText: '确定',
            type: type || "info",
            callback: cb || function(){}
        })
    },

    showLoading(text = "", fullscreen = "true", opt = {}) { // 展示加载的效果
        return Loading.service(Object.assign({
            text: text,
            fullscreen: fullscreen
        }, opt))
    },

    loadingClose(loadingInstance) {
        if(!loadingInstance) return;
        loadingInstance.close();
    },

    // 弹出通知的方法
    // success/warning/info/error
    showNotifi(title = "", message = "", type = "success", opt) {
        return Notification(Object.assign({
            title: title,
            message: message,
            type: type,
            duration: 3000
        }, opt))
    },

    NotifiClose(NotifiInstance) {
        NotifiInstance.close();
    },

    // 获取本地Base64图片
    getLocalImg: function(cb) {        // 获取本地base64图片
        var opener = new openFile("")
        opener.getBase64((data)=>{
            console.log("二进制数据",data)
            cb && cb(data)
        })
    },
    // file转换成base64
    fileToBase64(file,cb){
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onload = function (ev) {
            var dataURL = ev.target.result
            cb && cb(dataURL)
        }
    },
    upLoadImage(cb){
        this.getLocalImg((data)=>{
            http.httpPost(config.api.upload,{
                fileContent:data.data
            }).then(response=>{
                cb && cb(response)
                console.log(response)
            }) 
        })
    }
}

export default helper