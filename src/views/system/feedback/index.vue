<template>
  <div class="app-container">
     <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="执行状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择执行状态" clearable size="small">
          <el-option
            v-for="dict in feedbackOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="反馈人ID" prop="studentId">
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入反馈人ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理人ID" prop="userManageId">
        <el-input
          v-model="queryParams.userManageId"
          placeholder="请输入处理人ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单ID" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单类型" prop="orderType">
        <el-select v-model="queryParams.orderType" placeholder="请选择订单类型" clearable size="small">
          <el-option
            v-for="dict in feedbackOrderOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="处理时间" prop="manageTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.manageTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择处理时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="feedbackList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="feedbackId" />
      <el-table-column label="执行状态" align="center" prop="status" />
      <el-table-column label="反馈人ID" align="center" prop="studentId" />
      <el-table-column label="处理人ID" align="center" prop="userManageId" />
      <el-table-column label="处理意见" align="center" prop="manageContent" />
      <el-table-column label="订单ID" align="center" prop="orderId" />
      <el-table-column label="备注" align="center" prop="remark" />
       <el-table-column label="订单类型" align="center" prop="orderType">
              <template slot-scope="scope">
                <div v-for="dict in feedbackOrderOptions">
                  <span v-if= "dict.dictValue === scope.row.orderType">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      <el-table-column label="反馈内容" align="center" prop="feedbackContent" />
      <el-table-column label="处理时间" align="center" prop="manageTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.manageTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
           <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                v-if="scope.row.status === '0'"
                @click="handleDialog(scope.row)"
              >处理</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-more"
                @click="handleDetail(scope.row)"
              >详情</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['feedback:feedback:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['feedback:feedback:remove']"
          >删除</el-button> -->
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
        <el-button @click="cancel">关 闭</el-button>
      </div>
      </el-dialog>

       <!-- 处理反馈对话框 -->
     <el-dialog title="处理中" :visible.sync="open1" width="700px" append-to-body>
     <el-form :model="feedbackDetail" status-icon label-width="100px" class="demo-ruleForm">
  <el-form-item label="反馈内容" prop="feedbackDetail" style="width:600px;">{{feedbackDetail.feedbackContent}}
    <!-- <el-input  style="width:500px;"  type="textarea" autosize v-model="taskDetail.taskDescribe" ></el-input> -->
  </el-form-item>
  <el-form-item label="反馈意见">
    <el-input v-model="feedbackDetail.manageContent" type="textarea" autosize style="width:500px;" ></el-input>
  </el-form-item>
  </el-form>
      <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="handle(feedbackDetail)">处理</el-button>
      </div>
    </el-dialog>
    <!-- </el-dialog>
    <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
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
      </div> -->
    <!-- </el-dialog>
    
    </div> -->
  </div>
</template>

<script>
import { listFeedback, getFeedback, delFeedback, addFeedback, updateFeedback, exportFeedback } from "@/api/feedback/feedback";
import Editor from '@/components/Editor';
import store from "@/store";
export default {
  name: "Feedback",
  components: { Editor },
  data() {
    return {
      uId: store.getters.uId,
      updateParams:{},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 反馈表格数据
      feedbackList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      open1:false,
      handleParams:{},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        status: null,
        studentId: null,
        userManageId: null,
        manageContent: null,
        orderId: null,
        orderType: null,
        feedbackContent: null,
        manageTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      feedbackOptions:[],
      feedbackOrderOptions:[],
      feedbackDetail:{},
      isUrl:true,
    };
  },
  created() {
    this.getList();
         this.getDicts("sys_feedback_type").then(response => {
      this.feedbackOptions = response.data;
    });
     this.getDicts("sys_feedback_order_type").then(response => {
      this.feedbackOrderOptions = response.data;
    });
  },
  methods: {
    /** 查询反馈列表 */
    getList() {
      this.loading = true;
      listFeedback(this.queryParams).then(response => {
        this.feedbackList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.feedbackList={};
      this.reset();
    },
    handleDialog(row){
      this.open1 =true;
      getFeedback(row.feedbackId).then(response => {
         this.feedbackDetail=response.data;
         if(this.feedbackDetail.sysFeedbackMedias==null){
           this.isUrl=false;
         }
      })

    },
    // 表单重置
    reset() {
      this.form = {
        feedbackId: null,
        status: "0",
        studentId: null,
        createBy: null,
        createTime: null,
        userManageId: null,
        updateBy: null,
        manageContent: null,
        updateTime: null,
        orderId: null,
        remark: null,
        orderType: null,
        feedbackContent: null,
        delFlag: null,
        manageTime: null
      };
      this.resetForm("form");
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
          return  updateFeedback(Params);
        }).then(() => {
           this.msgSuccess("处理成功");
           this.getList();
        })
    },
     //成功处理
    handle(row){
       this.handleParams.feedbackId = this.uId;
       this.handleParams.manageContent=row.manageContent;
      updateFeedback( this.handleParams).then(response => {
         this.msgSuccess("已成功处理");
           this.open1 = false;
      this.reset();
       this.feedbackDetail={}
          this.getList();
      })
    },
    /** 查看反馈详情操作 */
    handleDetail(row){
      this.open = true;
      getFeedback(row.feedbackId).then(response => {
         this.feedbackDetail=response.data;
          if(this.feedbackDetail==null){
           this.feedbackDetailFlag=false;
         }
         if(this.feedbackDetail.sysFeedbackMedias==null){
           this.isUrl=false;
         }
      })},
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.feedbackId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加反馈";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const feedbackId = row.feedbackId || this.ids
      getFeedback(feedbackId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改反馈";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.feedbackId != null) {
            updateFeedback(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFeedback(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const feedbackIds = row.feedbackId || this.ids;
      this.$confirm('是否确认删除反馈编号为"' + feedbackIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFeedback(feedbackIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport(){
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有反馈数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportFeedback(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
}
// import { listFeedback,updateFeedback,feedbackDetail} from "@/api/system/feedback";

// export default {
//   name: "feedback",
//   data() {
//     return {
//       // 遮罩层
//       loading: true,
//       // 显示搜索条件
//       showSearch: true,
//       // 总条数
//       total: 0,
//       // 反馈表格数据
//       feedbackList: [
//       ],
//       feedbackDetail:{},
//       // 弹出层标题
//       title: "反馈详情",
//       // 是否显示弹出层
//       open: false,
//       feedbackOptions: [
//       ],
//       // 查询参数
//       queryParams: {
//         pageNum: 1,
//         pageSize: 10,
//         studentId: undefined,
//         studentName: undefined,
//         status: undefined,
//         anonymityFlag:undefined
//       },
//       //修改参数
//       updateParams:{
//       },
//       dateRange: [],
//       anonymityOptions:[],
//       feedbackDetailFlag:true,
//       isUrl:true
//     };
//   },
//   created() {
//     this.getList();
//      this.getDicts("sys_feedback_type").then(response => {
//       this.feedbackOptions = response.data;
//     });
//     this.getDicts("sys_anonymity_type").then(response => {
//       this.anonymityOptions = response.data;
//     });
//   },
//   methods: {
//     /** 查询反馈列表 */
//     getList() {
//       this.loading = true;
//        listFeedback(this.addDateRange(this.queryParams, this.dateRange)).then(
//         response => {
//           this.feedbackList = response.rows;
//           this.feedbackList.forEach((item)=> {
//               item.feedbackContent= item.feedbackContent.slice(0,3)+'...';
//            })
//           this.total = response.total;
//           this.loading = false;
//         }
//       );
//     },
//     /** 修改反馈状态操作 */
//     handleUpdate(row) {
//       this.updateParams.feedbackId=row.feedbackId;
//       this.updateParams.status='1';
//       var Params= this.updateParams;
//       this.$confirm('是否确认处理反馈状态?', "提示", {
//           confirmButtonText: "确定",
//           cancelButtonText: "取消",
//           type: "warning"
//         }).then(function() {
//           console.log("修改进入");
//           return  updateFeedback(Params);
//         }).then(() => {
//            this.msgSuccess("处理成功");
//            this.getList();
//         })
//     },
//     /** 查看反馈详情操作 */
//     handleDetail(row){
//       this.open = true;
//       feedbackDetail(row.feedbackId).then(response => {
//          this.feedbackDetail=response.data;
//          this.open = true;
//           if(this.feedbackDetail==null){
//            this.feedbackDetailFlag=false;
//          }
//          if(this.feedbackDetail.sysFeedbackMedias==null){
//            this.isUrl=false;
//          }
//       });
      
//     },
//     // 岗位状态字典翻译
//     statusFormat(row, column) {
//       return this.selectDictLabel(this.statusOptions, row.status);
//     },
//     // 取消按钮
//     cancel() {
//       this.open = false;
//       // this.reset();
//     },
//     /** 搜索按钮操作 */
//     handleQuery() {
//       this.queryParams.pageNum = 1;
//       this.getList();
//     },
//     /** 重置按钮操作 */
//     resetQuery() {
//       this.dateRange = [];
//       this.resetForm("queryForm");
//       this.handleQuery();
//     },
   
   
//   }
// };
</script>
<style scoped>
 /* img{
   margin-left:-60px;

 } */
</style>