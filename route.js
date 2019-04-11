import Vue from "Vue"
import Router from 'vue-router'
Vue.use(Router)

let routeArr = [
    "index.vue",
    "serach.vue",
    "video.vue"
]

let routesItem = []
let routes = [{
    path:"/index",
    component:require("./page/index.vue").default
},{
    path:"/serach",
    component:require("./page/serach.vue").default
},{
    path:"/video",
    component:require("./page/video.vue").default
}]



// for(let i = 0,len = routeArr.length;i<len;i++){
//     routesItem.push({
//         path:"./"+i
//     })
// }

export default new Router({
    routes
})

