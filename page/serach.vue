<template>
  <div>
      <v-tab></v-tab>
      <v-search searchName="查询课程">
          <template>
             <el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">
                <el-form-item label="老师名称：">
                    <el-input v-model="serachForm.TeacherName" placeholder="请输入名字" 
                    class="input-small"></el-input>
                </el-form-item>
                <el-form-item label="课程名称：">
                    <el-input v-model="serachForm.CollageName" placeholder="请输入名字课程名称"
                    class="input-small"></el-input>
                </el-form-item>
                <el-form-item label="课程类型：">
                   <el-select v-model="form.CategoryId" placeholder="请选择" class="input-small">
                      <el-option 
                        v-for="item in CategoryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="search">查询</el-button>
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
              <el-table-column align="center" prop="Title" label="课程标题" width="220"></el-table-column>
              <el-table-column align="center" prop="CollagePrice" label="课程价格" width="90">
              </el-table-column>
              <el-table-column align="center" prop="Description" label="课程描述" width="400">
              </el-table-column>
              <el-table-column align="center" prop="Description" label="课程图片" width="180">
                <template slot-scope="props">
                  <div class="contain-imgs">
                    <img :src="props.row.SmallImageUrl" alt="">
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="Description" label="创建时间" width="180">
                <template slot-scope="props">
                   {{new Date(props.row.CreateTime).ljyFormat("yyyy-MM-dd HH:mm")}}
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" prop="address" label="地址">
              </el-table-column> -->
              <el-table-column align="center" label="操作">
                <template slot-scope="props">
                  <el-button type="text" size="small" @click="upDateDialog(props.row)">修改</el-button>
                  <el-button type="text" size="small" @click="removeItem(props.$index)">移除</el-button>
                </template>
              </el-table-column>
         </el-table>
      </v-table>

      <el-dialog :title="isAdd ? '新增课程':'修改课程'" :visible.sync="isDialogVisible" 
                 :close-on-click-modal="false"
                 @close="dialogCloseCall"
                 @open="dialogOpenCall">
        <el-form label-width="100px" label-position="right" 
                 :inline="true"
                 :model="form"
                 ref="form"
                 :rules="rules">
           <el-form-item label="课程标题：" prop="Title">
                <el-input v-model="form.Title" placeholder="请输入课程标题" 
                      class="input-small">
                </el-input>
           </el-form-item>
           <el-form-item label="选择老师：" prop="TeacherId"> 
             <!-- filterable  -->
              <el-select v-model="form.TeacherId" filterable placeholder="请选择老师" 
              class="input-small">
                    <el-option 
                      v-for="item in teacherOptions"
                      :key="item.Id"
                      :label="item.Name"
                      :value="item.Id">
                    </el-option>
               </el-select>
           </el-form-item>
           <br/>
           <el-form-item label="课程描述：" prop="Description"> 
             <el-input style="width:220%"
                type="textarea"
                size="medium" 
                :rows="4"
                placeholder="请输入课程描述"
                v-model="form.Description">
             </el-input>   
           </el-form-item>
           <br/>
           <el-form-item label="课程价格：" prop="CollagePrice"> 
               <el-input v-model="form.CollagePrice" placeholder="请输入课程价格" 
                      class="input-small">
                </el-input>
           </el-form-item>
           <el-form-item label="销售价格：" prop="SalePrice"> 
               <el-input v-model="form.SalePrice" placeholder="请输入销售价格" 
                      class="input-small">
                </el-input>
           </el-form-item>
           <el-form-item label="上传图片：" prop="SmallImageUrl">
                <el-input v-model="form.SmallImageUrl" placeholder="请输入或选择图片"
                      class="input-small">
                </el-input>
                <el-button type="primary" class="e-btn" size="small" 
                      @click="upLoadImg">选择图片</el-button>
           </el-form-item>
           <br/>
           <el-form-item label="是否有效：">
              <el-radio v-model="form.Status" label="1">是</el-radio>
              <el-radio v-model="form.Status" label="0">否</el-radio>
           </el-form-item>
           <el-form-item label="是否VIP：">
              <el-radio v-model="form.IsFreeForVip" label="1">是</el-radio>
              <el-radio v-model="form.IsFreeForVip" label="0">否</el-radio>
           </el-form-item>
           <br/>
           <el-form-item label="课程等级：" prop="Level">
                <el-select v-model="form.Level" placeholder="请选择" class="input-small">
                  <el-option 
                    v-for="item in videOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
           </el-form-item> 
           <el-form-item label="总课节数：" prop="ClassCount"> 
                <el-input v-model="form.ClassCount" placeholder="请输入总课节数" 
                      class="input-small">
                </el-input>
           </el-form-item>
           <el-form-item label="课程类别：" prop="CategoryId"> 
             <!-- CategoryId -->
                <el-select v-model="form.CategoryId" placeholder="请选择" class="input-small">
                  <el-option 
                    v-for="item in CategoryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
           <el-form-item label="人气值：" prop="ViewCount"> 
               <el-input v-model="form.ViewCount" placeholder="请输入人气值" 
                      class="input-small">
                </el-input>
           </el-form-item>
           <!-- videOptions -->
           <el-form-item label="课程类型：" prop="CollageType"> 
                <el-select v-model="form.CollageType" placeholder="请选择" class="input-small">
                  <el-option 
                    v-for="item in mediaTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
           <el-form-item label="推荐精品：">
              <el-radio v-model="form.IsExcellentCollage" label="1">是</el-radio>
              <el-radio v-model="form.IsExcellentCollage" label="0">否</el-radio>
           </el-form-item>
           <br/>
           <el-form-item label="课程详情：" prop="CollageContent"> 
              <div id="toolbar"></div>
              <div id="mainarea"></div>
             <!-- <el-input style="width:220%"
                type="textarea"
                size="medium" 
                :rows="4"
                placeholder="请输入课程详情"
                v-model="form.CollageContent">
             </el-input>    -->
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
import config from "@config"

var E = require('wangeditor')
import { VueEditor } from 'vue2-editor'

let generateEditor = ()=>{
    var editor = new E('#toolbar',"#mainarea")
    editor.create()
    // 配置服务器端地址
    editor.customConfig.uploadImgServer = config.apiurl+config.api.upload
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.customUploadImg = function (files, insert) {
        helper.fileToBase64(files,(data)=>{
          
        })

        // if(data.Code == 200){
        //     helper.message("上传成功","success")
        //   }else{
        //     helper.message("请重新上传图片","warning")
        //   }
    }
}

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
        isAdd:true,                    // 是否新增
        isDialogVisible:false,         // 是否显示模态框
        serachForm: {                  // 查询的表单  
          CategoryId: "",
          TeacherName: "",
          CollageName:"",
          PageSiz:"",
          PageIndex:""
        },
        form:{                         // 课程的表单
          Title:"",                    // 课程标题
          Description:"",              // 课程描述
          ClassCount:0,                // 总课节数
          ViewCount:50,                // 人气值
          TeacherId:"",                // 老师ID
          Level:"",                    // 课程等级（1：初级；2：中级；3：高级） 
          Status:"0",                  // 状态（1：有效；0：无效）
          CreateTime:"",               // 创建时间
          IsFreeForVip:"0",            // 是否VIP会员
          IsExcellentCollage:"0",      // 是否推荐到精品专利（0：否：1：是）
          SalePrice:"",                // 销售价格
          CollagePrice:"",             // 课程价格  
          CollageType:"",              // 课程类型（1：视频；2：音频）
          Id:0,                        // 新增传0  
          CategoryId:"",               // 课程类别ID
          CollageContent:"",           // 课程详情
          SmallImageUrl:""             // 课程图片
        },
        options:[{
          value: '选项1',
          label: 'Math'
        }, {
          value: '选项2',
          label: 'Chinese'
        }, {
          value: '选项3',
          label: 'English'
        }, {
          value: '选项4',
          label: 'geography'
        }, {
          value: '选项5',
          label: 'biology'
        }],
         videOptions:[{
            value: '1',
            label: '初级'
         },{
            value:'2',
            label:'中级'
         },{
            value:'3',
            label:'高级'
         }],
         CategoryOptions:[{
            value: '1',
            label: '免费专区'
         },{
            value:"2",
            label:"大咖课堂"
         },{
            value:"3",
            label:"跨境电商"
         }],
         CategoryOptions:[{
            value: '',
            label: '选择全部'
         },{
            value:"2",
            label:"大咖课堂"
         },{
            value:"3",
            label:"跨境电商"
         }],
         tableData: [],
         totalCount: 29,
         teacherOptions:[],
         mediaTypes:[{
            value: '1',
            label: '视频'
         },{
            value:"2",
            label:"音频"
         }],

         // 规则
         rules:{
           Title: [
             { required: true, message: '请输入课程名称', trigger: 'blur' },
           ],
           // selectValidator
           TeacherId:[
             { validator:selectValidator ,message: '请至少选择一位老师', trigger: 'change' },
           ],
           Description:[
             { required: true, message: '请输入课程描述', trigger: 'blur' }
           ],
           CollagePrice:[
             { validator:notVaild,trigger: 'blur'}
           ],
           SalePrice:[
             { validator:notVaild,trigger: 'blur'}
           ],
           Level:[
             { validator:selectValidator ,message: '请至少选择一位课程等级', trigger: 'change' },
           ],
           ClassCount:[
             { validator:notVaild,trigger: 'blur'}
           ],
           CategoryId:[
             { validator:selectValidator ,message: '请至少选择一个课程类别', trigger: 'change' },
           ],
           ViewCount:[
             { validator:notVaild,trigger: 'blur'}
           ],
           CollageType:[
            { validator:selectValidator ,message: '请至少选择一位课程类别', trigger: 'change' },
           ],
           CollageContent:[
              { required: true, message: '请输入课程详情', trigger: 'blur' }
           ],
           SmallImageUrl:[
              { required: true, message: '请输入课程详情', trigger: 'blur' }
           ]
         }
      }
    },
  methods: {
      onSubmit() {
        console.log('submit!');
      },
      pageChange(param){        // 分页变化触发的函数
          // param 示例 {PageSize: 10, PageIndex: 2}
          // 请求操作可以放在这里 分页请求操作放在这里
          this.search()
      },
      addDialog(){              // 增加新的课程
          this.isAdd = true
          this.isDialogVisible = true
      },
      upDateDialog(row){           // 修改新的课程
          this.isAdd = false
          this.isDialogVisible = true
          console.log("带过来的参数",row)
      },

      add(){
          
      },

      save(){
        this.$refs['form'].validate((valid) => {
          if(valid){
             if(this.isAdd) this.form.Id = 0
             http.httpPost(SAVE_URL,this.form).then(data=>{
                if(data.Code == 200) helper.message("添加成功","success")
                this.search()
             })
          }
        })
      },
      search(){  // 查询函数
         let page = this.$refs["table"].getPagingInfo()
         this.serachForm = Object.assign({},this.serachForm,{
            "PageSiz": page.PageSize,
            "PageIndex": page.PageIndex,
         })
         http.httpPost("/api/v1/manager/collage/GetCollageList",this.serachForm)
         .then(data=>{
            let result = data.Data,
                totalCount = data.TotalCount   
            this.tableData = result
            this.totalCount = totalCount
         })
      },
      upLoadImg(){ // 获取图片
        helper.upLoadImage((data)=>{
          if(data.Code == 200){
            helper.message("上传成功","success")
            this.form.SmallImageUrl = data.fileUrl
          }else{
            helper.message("请重新上传图片","warning")
          }
        })
      },
      // 关闭前的回调
      dialogCloseCall(){
        this.$refs['form'].resetFields();
      },
      // 打开前的回调
      dialogOpenCall(){
         this.$nextTick(generateEditor)
      }
  },
  created(){
   api.getTeacherInfo().then(data=>{
     let res = data.Data
     this.teacherOptions = res
   })
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
  height: 60px;
  vertical-align:middle
}
#toolbar{
  border: 1px solid #ccc
}
#mainarea{
  width: 100%;
  height: 120px;
  border: 1px solid #ccc
}
</style>


