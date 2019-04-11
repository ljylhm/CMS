<template>
  <div>
      <v-tab></v-tab>
      <v-search searchName="查询课程">
          <template>
             <el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">
                <el-form-item label="课程名称：">
                    <el-input v-model="serachForm.name" placeholder="请输入名字" 
                    class="input-small"></el-input>
                </el-form-item>
                <el-form-item label="课程ID：">
                    <el-input v-model="serachForm.name" placeholder="请输入名字课程ID"
                    class="input-small"></el-input>
                </el-form-item>
                <el-form-item label="创建人：">
                    <el-input v-model="serachForm.startTime" placeholder="请输入创建人"
                    class="input-small"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="类型：">
                    <el-select v-model="serachForm.type" placeholder="请选择" class="input-small">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间：">
                  <el-date-picker class="input-small"
                    v-model="serachForm.time"
                     type="daterange"
                     align="right"
                     unlink-panels
                     range-separator="至"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
             </el-form>
          </template>
      </v-search>
      <v-table>
        <div slot="btn">
           <el-button type="primary" size="small" @click="onSubmit">新增</el-button>
        </div>
      </v-table>
  </div>
</template>

<script>
import helper from "@helper"
export default {
  data() {
      return {
        serachForm: {
          user: "",
          name: "",
          creater:"",
          startTime:"",
          endTime:"",
          type:""
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
        }]
      }
    },
  methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}

</script>
<style scoped>
</style>


