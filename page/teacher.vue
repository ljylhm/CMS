<template>
	<div>
		<v-tab></v-tab>
		<v-search searchName="查询讲师">
			<template>
				<el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">
					<el-form-item label="讲师名字：">
						<el-input v-model="serachForm.TeacherName" placeholder="请输入名字" 
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
	<v-table title="课程列表" :totalRecords="totalCount" ref="table" @pageChange="pageChange">
		<template slot="btn">
			<el-button type="primary" size="small" @click="addDialog">新增</el-button>
		</template>
		<el-table :data="tableData" border  style="width: 100%">
			<el-table-column align="center" type="index" label="序号" width="60"> </el-table-column>
			<el-table-column align="center" prop="Name" label="讲师姓名" width="80"></el-table-column>
			<el-table-column align="center" prop="Tags" label="Tags" width="150">
			</el-table-column>
			<el-table-column align="center" prop="Title" label="Title" width="150">
			</el-table-column>
			<el-table-column align="center" prop="Description" label="头像" width="150">
				<template slot-scope="props">
					<div class="contain-imgs">
						<img :src="props.row.LogoUrl" alt="">
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="Content" label="教师描述" min-width="600"></el-table-column>
			<el-table-column align="center" prop="Status" label="状态" width="50">
				<template slot-scope="props">{{props.row.Status==1?"启用":"删除"}}</template>
			</el-table-column>
			<el-table-column align="center" prop="Description" label="创建时间" width="180">
				<template slot-scope="props">
					{{new Date(props.row.CreateTime).ljyFormat("yyyy-MM-dd HH:mm")}}
				</template>
			</el-table-column>
              <!-- <el-table-column align="center" prop="address" label="地址">
              </el-table-column> -->
              <el-table-column align="center" label="操作" width="100">
              	<template slot-scope="props">
              		<el-button type="text" size="small" @click="upDateDialog(props.row)">修改</el-button>
              		<el-button type="text" size="small" @click="removeItem(props.row)">{{props.row.Status==1?"移除":"有效"}}</el-button>
              	</template>
              </el-table-column>
          </el-table>
      </v-table>

      <el-dialog :title="isAdd ? '新增讲师':'修改讲师信息'" :visible.sync="isDialogVisible" 
      :close-on-click-modal="false"
      @close="dialogCloseCall">
      <el-form label-width="100px" label-position="right" 
      :inline="true"
      :model="form"
      ref="form"
      :rules="rules">
      <el-form-item label="讲师名字：" prop="Name">
      	<el-input v-model="form.Name" placeholder="请输入讲师名字" 
      	class="input-small">
      </el-input>
  </el-form-item>

  <el-form-item label="讲师Title：" prop="Title"> 
  	<el-input v-model="form.Title" placeholder="请输入讲师Title" 
  	class="input-small">
  </el-input>
</el-form-item>
<el-form-item label="讲师Tags：" prop="Tags"> 
	<el-input v-model="form.Tags" placeholder="Tags" 
	class="input-small">
</el-input>
</el-form-item>
<br/>
<el-form-item label="讲师描述：" prop="Content"> 
	<el-input style="width:220%"
	type="textarea"
	size="medium" 
	:rows="4"
	placeholder="请输入讲师描述"
	v-model="form.Content">
</el-input>   
</el-form-item>
<br>
<el-form-item label="上传图片：" prop="SmallImageUrl">
	<el-input v-model="form.LogoUrl" placeholder="请输入或选择图片"
	class="input-small">
</el-input>
<el-button type="primary" class="e-btn" size="small" 
@click="upLoadImg">选择图片</el-button>
</el-form-item>

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
				tableData:[],
				totalCount:0,
            isAdd:true,                    // 是否新增
             isDialogVisible:false,         // 是否显示模态框
             serachForm: {                  // 查询的表单  

             	TeacherName: "",
             },
        form:                      // 课程的表单
        {
        	"Id": "",
        	"Name": "",
        	"Title": "",
        	"Content": "",
        	"LogoUrl": "",
        	"Tags": ""
        	//"Status": "sample string 7",
        	//"CreateTime": "2019-04-16T18:46:26.2449005+08:00"
          // 课程图片
      },
       // 规则
       rules:{
       	Name: [
       	{ required: true, message: '请输入讲师名字', trigger: 'blur' },
       	],
           // selectValidator
           Title:[
           { required: true, message: '请输入讲师Title', trigger: 'blur' }
           ],
           Tags:[
           { required: true, message: '请输入讲师Tags', trigger: 'blur' }
           ],
           Content:[
           { required: true, message: '请输入讲师Content', trigger: 'blur' }
           ],
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

      	http.httpPost("/api/v1/manager/teacher/UpdateTearcherInfo",para).then(data=>{
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
      				http.httpPost("/api/v1/manager/teacher/InsertTearcherInfo",this.form).then(data=>{
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

      				http.httpPost("/api/v1/manager/teacher/UpdateTearcherInfo",this.form).then(data=>{
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
      	http.httpPost("/api/v1/manager/teacher/GetTearcherInfoList",para).then(data=>{
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
