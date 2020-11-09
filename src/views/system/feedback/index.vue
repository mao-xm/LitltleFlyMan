<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="学生编码" prop="studentId">
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入学生编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学生名" prop="studentName">
        <el-input
          v-model="queryParams.studentName"
          placeholder="请输入学生名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="反馈状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="反馈状态" clearable size="small">
          <el-option
            v-for="dict in feedbackOptions"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
       <el-form-item label="时间" prop="dateRange">
         <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="匿名状态" prop="anonymityFlag">
        <el-select v-model="queryParams.anonymityFlag" placeholder="匿名状态" clearable size="small">
          <el-option
            v-for="dict in anonymityOptions"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
        <el-table
        :data="feedbackList"
        v-loading="loading">
            <el-table-column
              prop="feedbackId"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="studentName"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="studentId"
              label="用户id">
            </el-table-column>
              <el-table-column
              prop="feedbackContent"
              label="内容">
            </el-table-column>
            <el-table-column
              prop="status"
              label="反馈状态">
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >处理</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-more"
                @click="handleDetail(scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
            </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
     <!-- 添加或修改参数配置对话框 -->
     <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <div id="detail" width="500px" v-for="(item,index) in (feedbackDetail.sysFeedbackMedias)" :key="index">
         <div class="img" >
           <img :src="item.feedbackMediaUrl" width="100px">
           <img :src="item.feedbackMediaUrl" width="100px">
           <img :src="item.feedbackMediaUrl" width="100px" >
           <img :src="item.feedbackMediaUrl" width="100px">
           <img :src="item.feedbackMediaUrl" width="100px">
           <img :src="item.feedbackMediaUrl" width="100px" >
         </div>
         <div class="content1">
           <div class="title">编号：</div>
           <div class="feedbackContent">{{feedbackDetail.feedbackId}}</div>
         </div>
          <div class="content">
           <div class="title">用户名：</div>
           <div class="feedbackContent">{{feedbackDetail.studentName}}</div>
         </div>
          <div class="content">
           <div class="title">用户ID：</div>
           <div class="feedbackContent">{{feedbackDetail.studentId}}</div>
         </div>
          <div class="content">
           <div class="title">反馈状态:</div>
           <div class="feedbackContent">{{feedbackDetail.status}}</div>
         </div>
         <div class="content">
           <div class="title">反馈内容：</div>
           <div class="feedbackContent">{{feedbackDetail.feedbackContent}}</div>
         </div>
         <div class="content">
           <div class="title">创建时间：</div>
           <div class="feedbackContent">{{feedbackDetail.createTime}}</div>
         </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listFeedback,updateFeedback,feedbackDetail} from "@/api/system/feedback";

export default {
  name: "feedback",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 反馈表格数据
      feedbackList: [
      ],
      feedbackDetail:{},
      // 弹出层标题
      title: "反馈详情",
      // 是否显示弹出层
      open: false,
      feedbackOptions: [{
          value: '已处理',
          label: '已处理'
        }, {
          value: '未处理',
          label: '未处理'
        }],
      anonymityOptions:[{
          value: '匿名',
          label: '匿名'
        }, {
          value: '不匿名',
          label: '不匿名'
        }

      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        studentId: undefined,
        studentName: undefined,
        status: undefined,
        anonymityFlag:undefined
      },
      //修改参数
      updateParams:{
      },
      dateRange: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询反馈列表 */
    getList() {
      this.loading = true;
       var params={
          pageNum: 1,
          pageSize: 10,
          studentId:this.queryParams.studentId,
          studentName:this.queryParams.studentName,
          status: undefined,
          anonymityFlag:undefined
       };
      if(this.queryParams.status=='未处理'){
        params.status='0';
      }
      if(this.queryParams.anonymityFlag=='不匿名'){
        params.anonymityFlag=0;
      }
      if(this.queryParams.status=='已处理'){
        params.status='1';
      }
      if(this.queryParams.anonymityFlag=='匿名'){
        params.anonymityFlag=1;
      }
       listFeedback(this.addDateRange(params, this.dateRange)).then(
        response => {
          this.feedbackList = response.rows;
          var array=[];
          this.feedbackList.forEach((item)=> {
          if( item.status==0){
            item.status='未处理';
            item.feedbackContent= item.feedbackContent.slice(0,3)+'...';
            array.push(item);
          }
            // if( item.status==0){
            //   item.status='未处理';
            // }
            // else{
            //   item.status='已处理';
            // }
            // item.feedbackContent= item.feedbackContent.slice(0,3)+'...';
            // console.log("length"+item.feedbackContent.length)
            //  array.push(item);
           })
           this.feedbackList=array;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 修改反馈状态操作 */
    handleUpdate(row) {
      this.updateParams.feedbackId=row.feedbackId;
      this.updateParams.status='1';
      var Params= this.updateParams;
      this.$confirm('是否确认处理反馈状态?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          console.log("修改进入");
          return  updateFeedback(Params);
        }).then(() => {
           this.msgSuccess("处理成功");
           this.getList();
        })
    },
    /** 查看反馈详情操作 */
    handleDetail(row){
      this.open = true;
      feedbackDetail(row.feedbackId).then(response => {
         this.feedbackDetail=response.data;
          if( this.feedbackDetail.status==0){
            this.feedbackDetail.status='未处理';
          }
          else{
            this.feedbackDetail.status='已处理';
          }
         this.open = true;
        // this.msgSuccess("处理成功");
        // this.open = false;
        // this.getList();
      });
      
    },
    // 岗位状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      // this.reset();
    },
    // 表单重置
    // reset() {
    //   this.form = {
    //     postId: undefined,
    //     postCode: undefined,
    //     postName: undefined,
    //     postSort: 0,
    //     status: "0",
    //     remark: undefined
    //   };
    //   this.resetForm("form");
    // },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
   
    /** 提交按钮 */
    submitForm: function() {
      // if(this.updateParams.status=='未处理'){
      //   this.updateParams.status='0';
      // }
      // if(this.queryParams.status=='已处理'){
      // this.queryParams.status='1';
      // }
      // console.log(typeof this.updateParams.status);
      //  console.log(typeof this.updateParams.feedbackId);
      //  var params={
      //     feedbackId:
      //  };
      // updateFeedback(this.updateParams).then(response => {
      //   this.msgSuccess("处理成功");
      //   this.open = false;
      //   this.getList();
      // });
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
      //     if (this.form.postId != undefined) {
      //       updatePost(this.form).then(response => {
      //         this.msgSuccess("修改成功");
      //         this.open = false;
      //         this.getList();
      //       });
      //     } else {
      //       addPost(this.form).then(response => {
      //         this.msgSuccess("新增成功");
      //         this.open = false;
      //         this.getList();
      //       });
      //     }
      //   }
      // });
    },
   
  }
};
</script>
<style scoped>
 .img{
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  display: -webkit-flex;
  flex-direction: row;
  /* width:400px; */
 }
 img{
   margin-left:12px;
   margin-top:15px;
   width:100px;
 }
 .title{
   /* width:200px; */
   font-size:16px;
   font-weight:100px;
   margin-left:20px;
 }
 .content1{
   margin-top:25px;
   flex-wrap: wrap;
   display:flex;
 }
 .content{
   margin-top:10px;
   flex-wrap: wrap;
   display:flex;
   /* flex-wrap: wrap;
   flex-direction: row;
   margin-left:-200px; */
 }
 .feedbackContent{
   width:150px;
   margin-right:150px;
 }
</style>