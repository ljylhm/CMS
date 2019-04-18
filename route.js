import Vue from "Vue"
import Router from 'vue-router'
Vue.use(Router)

let routeArr = [
"index.vue",
"serach.vue",
"video.vue"
]

let routesItem = []

// route name以字符串为主 如果有多级菜单以,分隔
let routes = [{
    path:"/index",
    name:"首页",
    component:require("./page/index.vue").default
},{
    path:"/serach",
    name:"主要课程,第一篇",
    component:require("./page/serach.vue").default,
    children:[]
},{
    path:"/video",
    name:"视频列表",
    component:require("./page/video.vue").default
}
,{
    path:"/teacher",
    name:"教师g管理",
    component:require("./page/teacher.vue").default
},{
    path:"/rate",
    name:"评价管理",
    component:require("./page/rate.vue").default
},
,{
    path:"/amdin",
    name:"登陆角色管理",
    component:require("./page/amdin.vue").default
}]


export default new Router({
    routes
})

