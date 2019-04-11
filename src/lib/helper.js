import { Message, MessageBox, Loading, Notification } from 'element-ui';
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
    }
}

export default helper