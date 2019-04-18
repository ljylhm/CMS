<template>
	<div>
		<v-tab></v-tab>
		<v-search searchName="查询管理角色">
			<template>
				<el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">
					<el-form-item label="登陆名：">
						<el-input v-model="serachForm.userName" placeholder="请输入登陆名" 
						class="input-small"></el-input>
					</el-form-item>
					<el-form-item label="状态：">
            <el-select v-model="serachForm.status" placeholder="请选择" class="input-small">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
  </v-search>

  <!-- table组件 -->
  <v-table title="角色列表" :totalRecords="totalCount" ref="table" @pageChange="pageChange">
   <template slot="btn">
    <el-button type="primary" size="small" @click="addDialog">新增</el-button>
  </template>
  <el-table :data="tableData" border  style="width: 100%">
    <el-table-column align="center" type="index" label="序号" width="60"> </el-table-column>
    <el-table-column align="center" prop="LoginName" label="登陆名" width="120"></el-table-column>
    <el-table-column align="center" prop="LoginPwd" label="登陆密码" width="120"></el-table-column>
    <el-table-column align="center" prop="RoleName" label="角色类型" width="100">
    </el-table-column>
    <el-table-column align="center" prop="Telephone" label="手机号" min-width="200">
    </el-table-column>
    <el-table-column align="center" prop="Email" label="邮箱" width="200"></el-table-column>

    <el-table-column align="center" prop="Status" label="状态" width="50">
     <template slot-scope="props">{{props.row.Status==0?"启用":"无效"}}</template>
   </el-table-column>
   <el-table-column align="center" prop="Description" label="创建时间" width="180">
     <template slot-scope="props">
      {{new Date(props.row.CreatedTime).ljyFormat("yyyy-MM-dd HH:mm")}}
    </template>
  </el-table-column>

  <el-table-column align="center" label="操作">
   <template slot-scope="props">
    <el-button type="text" size="small" @click="upDateDialog(props.row)">修改</el-button>
    <el-button type="text" size="small" @click="removeItem(props.row)">{{props.row.Status==0?"移除":"有效"}}</el-button>
  </template>
</el-table-column>
</el-table>
</v-table>

<el-dialog :title="isAdd ? '新增角色':'修改角色'" :visible.sync="isDialogVisible" 
:close-on-click-modal="false"
@close="dialogCloseCall">
<el-form label-width="100px" label-position="right" 
:inline="true"
:model="form"
ref="form"
:rules="rules">
<el-form-item label="登录名：" prop="LoginName">
 <el-input v-model="form.LoginName" placeholder="请输入登录名" 
 class="input-small">
</el-input>
</el-form-item>

<el-form-item label="登陆密码：" prop="LoginPwd"> 
 <el-input v-model="form.LoginPwd" placeholder="请输入登陆密码" 
 class="input-small">
</el-input>
</el-form-item>
<el-form-item label="真实姓名：" prop="RealName"> 
 <el-input v-model="form.RealName" placeholder="请输入RealName" 
 class="input-small">
</el-input>
</el-form-item>
<br/>
<el-form-item label="Email：" prop="Email"> 
 <el-input v-model="form.Email" placeholder="请输入Email" 
 class="input-small">
</el-input>
</el-form-item>
<el-form-item label="Telephone：" prop="Telephone"> 
 <el-input v-model="form.Telephone" placeholder="请输入Telephone" 
 class="input-small">
</el-input>
</el-form-item>
<el-form-item label="角色名称：" prop="RoleName">
  <el-select v-model="form.RoleName" placeholder="请选择" class="input-small">
    <el-option
    v-for="item in roles"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>
<br>


</el-form>
<div slot="footer" class="dialog-footer dialog-footer-1">
	<el-button @click="isDialogVisible = false" class="e-btn">取消</el-button>
	<el-button type="primary" class="e-btn" @click="save">确定</el-button>
</div>
</el-dialog>  
</div>
</template>

<script>
import helper from "@helper"
import http from "@http"
import api from "@api"
var initForm;
const SAVE_URL = "/api/v1/manager/collage/AddCollage"
export default {
	data() {
		function selectValidator(rule, value, callback) {
			if(!value) callback(rule.message);
			else callback();
		}
		function notVaild(rule, value, callback){
			let reg = /^[0-9]*$/ 
			let val = value.toString() 
			if(val.trim() === "") callback("选项不能为空")
				else if(!reg.test(value)) callback("请输入数字")
					else callback()
				}
			return {
        options:[{value:0,label:"有效"},{value:1,label:"无效"}],
        roles:[{
          value: '管理员',
          label: '管理员'
        },{
          value: '一般用户',
          label: '一般用户'
        }],
        tableData:[],
        totalCount:0,
            isAdd:true,                    // 是否新增
             isDialogVisible:false,         // 是否显示模态框
             serachForm: {                  // 查询的表单  

             	
             },
        form:                      // 课程的表单
        {
          "Id": 1,
          "LoginName": "",
          "LoginPwd": "",
          "RealName": "",
          "Email": "",
          "Telephone": "",
          "RoleName": "",
          "Status": "",
          "CreatedTime": ""
        },
       // 规则
       rules:{
       	LoginName: [
       	{ required: true, message: '请输入登录名', trigger: 'blur' },
       	],
           // selectValidator
           LoginPwd:[
           { required: true, message: '请输入登陆密码', trigger: 'blur' }
           ],
           RealName:[
           { required: true, message: '请输入真实姓名', trigger: 'blur' }
           ],
           // RoleName:[
           // { required: true, message: '', trigger: 'blur' }
           // ],
           RoleName:[
           { validator:selectValidator ,message: '请选择角色类型', trigger: 'change' }],
           Telephone:[
           { validator:notVaild ,message: '请输入正确的手机号', trigger: 'change' }
           ]
         }
       }
     },
     methods: {
       onSubmit(e) {
        console.log('submit!');
        this.search()

      },
      pageChange(param){        // 分页变化触发的函数
          // param 示例 {PageSize: 10, PageIndex: 2}
          // 请求操作可以放在这里 分页请求操作放在这里
          this.search()
        },
      addDialog(){              // 增加新的课程
      	this.isAdd = true
      	this.isDialogVisible = true;
      	this.form=Object.assign({},initForm) ;
      },
      upDateDialog(row){           // 修改新的课程
      	this.isAdd = false
      	this.isDialogVisible = true
      	console.log("带过来的参数",row)
      	this.form=Object.assign({},row) ;
      },
      removeItem(e){
      	console.log(e);
      	let para=Object.assign({},e) ;
      	if(e.Status=="1"){
      		para.Status=0;
      	}else{
      		para.Status=1
      	}

      	http.httpPost("/api/v1/manager/admin/UpdateAdmin",para).then(data=>{
      		console.log(data)
      		if(data) helper.message("操作成功","success")
      			this.search()

      	})
      },
      add(){

      },

      save(){

      	if(this.isAdd){
      		this.$refs['form'].validate((valid) => {
      			if(valid){
      				if(this.isAdd) this.form.Id = 0 
      					this.form.Status=0
              console.log(this.form)
              http.httpPost("/api/v1/manager/admin/AddAdmin",this.form).then(data=>{
               console.log(data)
               if(data>0) helper.message("添加成功","success")
                this.search()
              this.isDialogVisible=false;
            })
            }
          })
      	}else{
      		this.$refs['form'].validate((valid) => {
      			if(valid){

      				http.httpPost("/api/v1/manager/admin/UpdateAdmin",this.form).then(data=>{
      					console.log(data)
      					if(data) helper.message("修改成功","success")
      						this.search()
      					this.isDialogVisible=false;
      				})
      			}
      		})
      	}

      },
      search(){  // 查询函数
      	let page = this.$refs["table"].getPagingInfo();
      	let para=Object.assign(this.serachForm,page);
      	console.log(para);
      	http.httpPost("/api/v1/manager/admin/GetAdminList",para).then(data=>{
      		let result = data.Date,
      		totalCount = data.TotalCount   
      		this.tableData = result
      		this.totalCount = totalCount
      	})
      },
      upLoadImg(){ // 获取图片
      	helper.upLoadImage((data)=>{
      		console.log("xxx执行到了这里",data)
      		if(data.IsSuccess){
      			this.form.LogoUrl=data.fileUrl;
      		}else{
      			helper.alertInfo(data.Message,"错误提示","error")
      		}
      	})
      },
      // 关闭前的回调
      dialogCloseCall(){
      	this.$refs['form'].resetFields();
      } 
    },
    created(){

	//this.search()
	initForm=this.form;
},
mounted(){
	this.search()
}
}

</script>
<style scoped>
.contain-imgs{
	width: 100%;
	height: 100%;
}
.contain-imgs img{
	width: 80px;
	height: 80px;
	vertical-align:middle
}
</style>