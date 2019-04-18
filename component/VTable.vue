<template>
  <div class="table-contain">
    <div class="header">
      <div class="header-title">
        <strong>{{title || ""}}</strong>  
      </div>
      <div class="header-btn">
        <slot name="btn"></slot>
      </div>
    </div>
    <div class="table-main">
     <slot></slot>
   </div>
   <div class="pagination">
    <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="mCurrPage"
    :page-sizes="mPageSizes"
    :page-size="mCurrPageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalRecords">
  </el-pagination>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      mShowPager: true,
      mCurrPage: 0,
      mCurrPageSize: 0,
      mPageSizes: null,
      mTotalRecords:0,
      mTitle:"",
    }
  },
  methods:{
    getPagingInfo: function () {
      return {
        PageSiz: this.mCurrPageSize,
        PageIndex: this.mCurrPage
      }
    },
    handleSizeChange: function (val) {
      this.mCurrPageSize = val;
      this.$emit("pageChange", this.getPagingInfo());
    },
    handleCurrentChange: function (val) {
      this.mCurrPage = val;
      this.$emit("pageChange", this.getPagingInfo());
    }
  },
  created(){
    this.mShowPager = this.showPager != false;
    this.mCurrPage = this.currPage || 1;
    this.mPageSizes = this.pageSizes || [10, 20, 50, 100];
    this.mCurrPageSize = this.currPageSize || this.mPageSizes[0]
  },
    // totalRecords 总条数 currPage 当前页数 pageSizes 每页的条数 currPageSize 每个页面的条数
    // showPager 是否展示分页器
    props:["totalRecords","currPage","pageSizes","currPageSize","showPager","title"]
  }
  </script>
  <style scoped>
  .table-contain{
    margin:12px 0px; 
    background-color: #fff;
  }
  .table-contain .header{
    height: 46px;
    border-bottom: 1px solid #ddd;
  }
  .table-contain .header div{
    height: 100%;
  }
  .table-contain .header .header-title{
    float: left;
    line-height: 46px;
    padding: 0px 12px;
    font-size: 14px;
  }
  .table-contain .header .header-btn{
    float: right;
    box-sizing: border-box;
    padding-right: 10px;
    line-height: 40px;
  }
  .table-main{
    width: 100%;
    box-sizing: border-box;
    padding: 12px 12px;
  }
  .pagination{
    width: 100%;
    padding: 10px 0px 12px;
  }
  </style>