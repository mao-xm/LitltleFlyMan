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
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
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
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
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
            <el-table-column label="反馈状态" align="center">
              <template slot-scope="scope">
                <div v-for="dict in feedbackOptions">
                  <span v-if= "dict.dictValue === scope.row.status">{{dict.dictLabel}}</span>
                </div>
              </template>
             </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                v-if="scope.row.status === '0'"
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
     <el-dialog title="反馈详情" :visible.sync="open" width="700px" append-to-body>
     <div class="detail2" v-if="!feedbackDetailFlag">反馈暂无信息：</div>
      <el-form ref="form" :model="feedbackDetail" label-width="100px" size="mini" class="content"  v-if="feedbackDetailFlag"> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="学生id：" label-width="120px">{{(feedbackDetail.studentId!=null?feedbackDetail.studentId:'暂无数据')}}</el-form-item>
            <el-form-item label="学生姓名：" label-width="120px">{{(feedbackDetail.studentName!=null?feedbackDetail.studentName:'暂无数据') }}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="学生备注：" label-width="120px">{{(feedbackDetail.remark!=null?feedbackDetail.remark:'暂无数据') }}</el-form-item>
            <el-form-item label="反馈内容：" label-width="120px">{{(feedbackDetail.feedbackContent!=null?feedbackDetail.feedbackContent:'暂无数据') }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="反馈状态：" label-width="120px" >
                  <div v-for="dict in feedbackOptions">
                    <span v-if= "dict.dictValue === feedbackDetail.status">{{dict.dictLabel}}</span>
                    <span v-if="feedbackDetail.status===null">暂无数据</span>
                  </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="反馈时间：" label-width="120px">{{ (feedbackDetail.createTime!=null?feedbackDetail.createTime:'暂无数据') }}</el-form-item>
          </el-col>
          <el-col v-if="isUrl">
            <el-form-item label="反馈图片：" label-width="120px" > 
            </el-form-item>
          </el-col>
          <el-col v-if="!isUrl">
            <el-form-item label="反馈图片：" label-width="120px" > 
            暂无反馈图片
            </el-form-item>
          </el-col>
          <el-col :span="6" v-for="(item,index) in (feedbackDetail.sysFeedbackMedias)" :key="index">
                 <el-form-item > <img :src="item.feedbackMediaUrl" width="100px">
                 </el-form-item>
          </el-col>
        </el-row>
      </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="open = false">关 闭</el-button>
      </div>
      <!-- <div id="detail" width="500px" v-for="(item,index) in (feedbackDetail.sysFeedbackMedias)" :key="index"> -->
        
    <!-- </div> -->
    </el-dialog>
    
    </div>
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
      feedbackOptions: [
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
      anonymityOptions:[],
      feedbackDetailFlag:true,
      isUrl:true
    };
  },
  created() {
    this.getList();
     this.getDicts("sys_feedback_type").then(response => {
      this.feedbackOptions = response.data;
    });
    this.getDicts("sys_anonymity_type").then(response => {
      this.anonymityOptions = response.data;
    });
  },
  methods: {
    /** 查询反馈列表 */
    getList() {
      this.loading = true;
       listFeedback(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.feedbackList = response.rows;
          this.feedbackList.forEach((item)=> {
              item.feedbackContent= item.feedbackContent.slice(0,3)+'...';
           })
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
         this.open = true;
          if(this.feedbackDetail==null){
           this.feedbackDetailFlag=false;
         }
         if(this.feedbackDetail.sysFeedbackMedias==null){
           this.isUrl=false;
         }
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
   
   
  }
};
</script>
<style scoped>
 /* .img{
  display: flex;
  flex-wrap: wrap;
  display: -webkit-flex;
  flex-direction: row;
 } */
 /* img{
   margin-left:12px;
   margin-top:15px;
   width:100px;
 } */
 img{
   margin-left:-60px;
   /* margin-top:15px;
   width:100px; */
 }
 /* .title{
   font-size:16px;
   font-weight:100px;
   margin-left:20px;
 } */
 /* .content1{
   margin-top:25px;
   flex-wrap: wrap;
   display:flex;
 } */
 /* .content{
   margin-top:10px;
   flex-wrap: wrap;
   display:flex; */
   /* flex-wrap: wrap;
   flex-direction: row;
   margin-left:-200px; */
 /* }
 .feedbackContent{
   width:150px;
   margin-right:150px;
 } */
 .detail2{
  font-size:16px;
  padding-top:20px;
  color:red;
}
</style>