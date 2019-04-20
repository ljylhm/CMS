import Vue from "Vue"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./css/login.css"

Vue.use(ElementUI);

let App = new Vue({
    el:"#login",
    data(){
        return{
            mes:"welcomt to my home",
            loginForm:{
                password:"",
                account:""
            }
        }
    },
    methods:{

    }
})
console.log(321)
