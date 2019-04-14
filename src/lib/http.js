import axios from "axios"
import helper from "@helper"
import config from "../config/config"
const API_URL = config.apiurl 

const methodList = {
    "get":"get",
    "post":"post",
    "options":"options",
    "put":"put"
}

let loadingIns

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 请求参数处理
    loadingIns = helper.showLoading()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // 处理相应数据
    // 返回数据处理
    let data = response.data || {}
    if(loadingIns.close) loadingIns.close()
    if(data.Code != config.STATUS_SUCCESS){
        helper.alertInfo(data.message || "未知错误","错误提示","error")
    }
    return data
  }, function (error) {
    // 对响应错误做点什么
    if(loadingIns.close) loadingIns.close()
    helper.alertInfo(error,"错误提示","error")
    return Promise.reject(error);
});

const http = {
    http(method,url,data,opts={}){
        let userMethod = method.toLowerCase()
        if(url.indexOf("http") === -1){ // 如果填写完整地址
            url = API_URL + url
        }
        if(methodList[userMethod]){
            let options = Object.assign({},{
                method,
                url:url,
                data
            },opts)
            return axios(options)
        }
    },
    httpPost(url,data,opts={}){
        return this.http("post",url,data,opts)
    },
    httpGet(url,data,opts={}){
        return this.http("get",url,data,opts)
    }
}

export default http