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
    name:"教师管理",
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
},{
    path:"/classtype",
    name:"课程分类",
    component:require("./page/classtype.vue").default
}
,{
    path:"/member",
    name:"会员管理",
    component:require("./page/member.vue").default
},
,{
    path:"/charge",
    name:"购买记录",
    component:require("./page/charge.vue").default
},{
    path:"/minclass",
    name:"课节管理",
    component:require("./page/minclass.vue").default
}]


export default new Router({
    routes
})

