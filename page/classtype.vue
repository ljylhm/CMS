<template>
	<div>
		<v-tab></v-tab>
		<v-search searchName="课程分类管理">
			<template>
				<el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">
					<el-form-item label="分类名称：">
						<el-input v-model="serachForm.CategoryName" placeholder="分类名称" 
						class="input-small"></el-input>
					</el-form-item>
          <el-form-item label="分组名称：">
            <el-input v-model="serachForm.GroupName" placeholder="分组名称" 
            class="input-small"></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="serachForm.Status" placeholder="请选择" class="input-small">
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
    <el-table-column align="center" prop="CategoryName" label="分类名称" width="120"></el-table-column>
    <el-table-column align="center" prop="Description" label="描述" min-width="300"></el-table-column>
    <el-table-column align="center" prop="GroupName" label="分组" width="100">
    </el-table-column>


    <el-table-column align="center" prop="Status" label="状态" width="50">
     <template slot-scope="props">{{props.row.Status==1?"有效":"无效"}}</template>
   </el-table-column>
   <el-table-column align="center" prop="CreateTime" label="创建时间" min-width="180">
     <template slot-scope="props">
      {{new Date(props.row.CreateTime).ljyFormat("yyyy-MM-dd HH:mm")}}
    </template>
  </el-table-column>

  <el-table-column align="center" label="操作">
   <template slot-scope="props">
    <el-button type="text" size="small" @click="upDateDialog(props.row)">修改</el-button>
    <el-button type="text" size="small" @click="removeItem(props.row)">{{props.row.Status==1?"无效":"有效"}}</el-button>
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
<el-form-item label="分类名称：" prop="CategoryName">
 <el-input v-model="form.CategoryName" placeholder="请输入分类名称" 
 class="input-small">
</el-input>
</el-form-item>

<el-form-item label="分组：" prop="GroupName"> 
 <el-input v-model="form.GroupName" placeholder="请输入分组" 
 class="input-small">
</el-input>
</el-form-item>
<el-form-item label="父类ID：" prop="ParentId"> 
 <el-input v-model="form.ParentId" placeholder="请输入父类ID" 
 class="input-small">
</el-input>
</el-form-item>

<el-form-item label="分类描述：" prop="Description"> 
 <el-input v-model="form.Description" placeholder="请输入分类描述" 
 class="input-small">
</el-input>
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
        options:[{value:-1,label:"请选择"},{value:1,label:"有效"},{value:0,label:"无效"}],
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
       	CategoryName: [
       	{ required: true, message: '请输入分类名称', trigger: 'blur' },
       	],
           // selectValidator
           Description:[
           { required: true, message: '请输入分类描述', trigger: 'blur' }
           ],
           RealName:[
           { required: true, message: '请输入真实姓名', trigger: 'blur' }
           ],
           // RoleName:[
           // { required: true, message: '', trigger: 'blur' }
           // ],
           ParentId:[
           { validator:notVaild ,message: '请输入数字', trigger: 'change' }
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

      	http.httpPost("/api/v1/manager/collageCategory/UpdateCollageCategory",para).then(data=>{
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
      					this.form.Status=1
              console.log(this.form)
              http.httpPost("/api/v1/manager/collageCategory/AddCollageCategory",this.form).then(data=>{
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

      				http.httpPost("/api/v1/manager/collageCategory/UpdateCollageCategory",this.form).then(data=>{
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
      	http.httpPost("/api/v1/manager/collageCategory/GetCollageCategoryList",para).then(data=>{
      		let result = data.Data,
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