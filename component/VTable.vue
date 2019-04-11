<template>
<div class="table-contain">
    <div class="header">
      <div class="header-title">
        <strong>课程列表</strong>  
      </div>
      <div class="header-btn">
        <slot name="btn"></slot>
      </div>
    </div>
    <el-table :data="tableData" border  style="width: 100%">
      <el-table-column align="center" prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column align="center" prop="address" label="地址">
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="props">
           <el-button type="text" size="small" @click="chooseRow(props.row)">查看</el-button>
           <el-button type="text" size="small" @click="removeItem(props.$index)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods:{
    chooseRow(){

    },
    removeItem(){

    }
  }
}
</script>
<style scoped>
.table-contain{
  margin:12px 0px; 
  background-color: #fff;
}
.table-contain .header{
  height: 40px;
}
.table-contain .header div{
  height: 100%;
}
.table-contain .header .header-title{
  float: left;
  line-height: 40px;
  padding: 0px 12px;
  font-size: 14px;
}
.table-contain .header .header-btn{
  float: right;
  box-sizing: border-box;
  padding-right: 10px;
  line-height: 36px;
}
</style>