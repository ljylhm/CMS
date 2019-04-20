<template>
	<div>
		<v-tab></v-tab>
		<v-search searchName="管理课节">
			<template>
				<el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">

          <el-form-item label="">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
    </v-search>

    <!-- table组件 -->
    <v-table title="课节列表" :totalRecords="totalCount" ref="table" @pageChange="pageChange">
     <template slot="btn">
      <el-button type="primary" size="small" @click="addDialog">新增</el-button>
    </template>
    <el-table :data="tableData" border  style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="60"> </el-table-column>
      <el-table-column align="center" prop="Id" label="课节Id" width="80"></el-table-column>
      <el-table-column align="center" prop="ClassName" label="课节名称" width="120"></el-table-column>
      <el-table-column align="center" prop="ClassSize" label="视频大小" width="100">
      </el-table-column>
      <el-table-column align="center" prop="ClassTimeLong" label="课节时长" min-width="200">
      </el-table-column>

      <el-table-column align="center" prop="CollagePrice" label="课节价格/元" width="100">
        <template slot-scope="props">{{props.row.CollagePrice/100}}</template>
      </el-table-column>
      <el-table-column align="center" prop="SalePrice" label="课节售价/元" width="100"><template slot-scope="props">{{props.row.SalePrice/100}}</template></el-table-column>
      <el-table-column align="center" prop="IsFree" label="是否试看" width="100">
       <template slot-scope="props">{{props.row.IsFree==0?"否":"是"}}</template>
     </el-table-column>
     <el-table-column align="center" prop="IsFreeForVip" label="vip免费" width="100">
       <template slot-scope="props">{{props.row.IsFreeForVip==0?"否":"是"}}</template>
     </el-table-column>
     <el-table-column align="center" prop="Status" label="状态" width="120">
       <template slot-scope="props">{{getStatus(props.row.Status)}}</template>
     </el-table-column>

     <el-table-column align="center" prop="CreateTime" label="创建时间" width="180">
       <template slot-scope="props">
        {{new Date(props.row.CreateTime).ljyFormat("yyyy-MM-dd HH:mm")}}
      </template>
    </el-table-column>

    <el-table-column align="center" label="操作">
     <template slot-scope="props">
      <el-button type="text" size="small" @click="upDateDialog(props.row)">修改</el-button>
      <!-- <el-button type="text" size="small" @click="removeItem(props.row)">{{props.row.Status==0?"移除":"有效"}}</el-button> -->
    </template>
  </el-table-column>
</el-table>
</v-table>

<el-dialog :title="isAdd ? '新增课节':'修改课节'" :visible.sync="isDialogVisible" 
:close-on-click-modal="false"
@close="dialogCloseCall">
<el-form label-width="100px" label-position="right" 
:inline="true"
:model="form"
ref="form"
:rules="rules">
<el-form-item label="所属课程：">
 <el-input v-model="form.CollageId" disabled 
 class="input-small"></el-input>
</el-form-item>
<el-form-item label="课节名称：" prop="ClassName">
  <el-input v-model="form.ClassName" placeholder="请输入课节名称" 
  class="input-small"></el-input>
</el-form-item>
<el-form-item label="课节时长：" prop="ClassTimeLong">
  <el-input v-model="form.ClassTimeLong" placeholder="请输入课节时长" 
  class="input-small"></el-input>
</el-form-item>
<el-form-item label="视频大小：" prop="ClassSize">
  <el-input v-model="form.ClassSize" placeholder="请输入课节视频大小" 
  class="input-small"></el-input>
</el-form-item>
<el-form-item label="试看课程：" prop="IsFree">
  <el-select v-model="form.IsFree" placeholder="请选择" class="input-small">
    <el-option
    v-for="item in classStatus"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>

<el-form-item label="VIP免费：" prop="IsFreeForVip">
  <el-select v-model="form.IsFreeForVip" placeholder="请选择" class="input-small">
    <el-option
    v-for="item in classStatus"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>
<el-form-item label="状态：" prop="Status">
  <el-select v-model="form.Status" placeholder="请选择" class="input-small">
    <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>
<el-form-item label="视频URL：" prop="VadioUrl">
  <el-input v-model="form.VadioUrl" placeholder="请输入课节视频URL" 
  class="input-small"></el-input>
</el-form-item>
<el-form-item label="声音URL：" >
  <el-input v-model="form.SoundUrl" placeholder="请输入课节视频URL" 
  class="input-small"></el-input>
</el-form-item>
<el-form-item label="课程价格：" prop="CollagePrice">
  <el-input v-model="form.CollagePrice" placeholder="课程价格" 
  class="input-small"></el-input>
</el-form-item>
<el-form-item label="销售价格：" prop="SalePrice">
  <el-input v-model="form.SalePrice" placeholder="课程价格" 
  class="input-small"></el-input>
</el-form-item>
<br>
<el-form-item label="课节详情：" prop="CollageContent"> 
 <el-input style="width:210%"
 type="textarea"
 size="medium" 
 :rows="5"
 placeholder="请输入课节详情"
 v-model="form.ClassDetail">
</el-input>   
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
      //console.log(value)
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
    options:[{value:"0",label:"正在排课"},{value:"1",label:"上线"},{value:"2",label:"下线"},{value:"3",label:"删除"}],
    classStatus:[{value:"0",label:"否"},{value:"1",label:"是"}],
    roles:[{
      value: '管理员',
      label: '管理员'
    },{
      value: '一般用户',
      label: '一般用户'
    }],
    tableData:[],
    classOptions:[],
    totalCount:0,
            isAdd:true,                    // 是否新增
             isDialogVisible:false,         // 是否显示模态框
             serachForm: {                  // 查询的表单  

             	
             },
        form:                      // 课程的表单
        {

          "Id": 1,
          "CollageId": 2,
          "ClassName": "",
          "ClassTimeLong": "",
          "ClassDetail": "",
          "ClassSize": "",
          "ViewCount": 0,
          "IsFree": "",
          "IsFreeForVip": "",
          "VadioUrl": "",
          "SoundUrl": "",
          "CollagePrice": "",
          "SalePrice": "",
          "Status": "",
          "CreateTime": ""

        },
       // 规则
       rules:{
       	ClassName: [
       	{ required: true, message: '请输入课节名称', trigger: 'blur' }
       	],
           // selectValidator
           ClassTimeLong:[
           { required: true, message: '请输入课节时长', trigger: 'blur' }
           ],
           ClassSize:[
           { required: true, message: '请输入课节视频大小', trigger: 'blur' }
           ],
           VadioUrl:[
           { required: true, message: '请输入视频URL', trigger: 'blur' }
           ],
           CollagePrice:[
           { required: true, message: '请输入课程价格', trigger: 'blur' }
           ],
           SalePrice:[
           { required: true, message: '请输入销售价格', trigger: 'blur' }
           ],
           Status:[
           { validator:selectValidator ,message: '请选择状态', trigger: 'change' }],
           // RoleName:[
           // { required: true, message: '', trigger: 'blur' }
           // ],
           IsFree:[
           { validator:selectValidator ,message: '请选择是否试看课程', trigger: 'change' }],
           IsFreeForVip:[
           { validator:selectValidator ,message: '请选择是否VIP免费', trigger: 'change' }],
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
      getStatus(e){
        var data=this.options
        for (var i = 0; i < data.length; i++) {
          if((data[i].value.toString())==e){
            return data[i].label
          }
        }

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
        row.IsFree=row.IsFree.toString()
        row.IsFreeForVip=row.IsFreeForVip.toString()
        row.Status=row.Status.toString()

        this.form=Object.assign({},row) ;
      },
      
      add(){

      },

      save(){

      	if(this.isAdd){
      		this.$refs['form'].validate((valid) => {
      			if(valid){
      				if(this.isAdd) this.form.Id = 0 
      					this.form.ViewCount=0
              console.log(this.form)
              http.httpPost("/api/v1/manager/collageclass/AddCollageClass",this.form).then(data=>{
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


              http.httpPost("/api/v1/manager/collage/UpdateCollageClass",this.form).then(data=>{
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
      	http.httpGet("/api/v1/manager/collageclass/GetCollageClassList/"+2,{}).then(data=>{
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
      http.httpPost("/api/v1/manager/collage/GetCollageList",{PageSiz:1000,PageIndex:1,status:1}).then(data=>{
        let result = data.Data

        this.classOptions = result

      })

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