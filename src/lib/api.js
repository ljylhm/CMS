import http from "./http"
import config from "./../config/config"

const API_URL = config.apiurl
const api = {
    // 获得所有老师的列表接口
    getTeacherInfo(){
        return http.httpPost(config.api.teachers,{
            PageSiz:"100000",
            PageIndex:"1"
        })
    },
    
}

export default api