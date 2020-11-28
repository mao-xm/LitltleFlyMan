<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="发起人id" prop="studentSendId" label-width="100px">
        <el-input
          v-model="queryParams.studentSendId"
          placeholder="请输入发起人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实现人id" prop="studentRealizeId" label-width="100px">
        <el-input
          v-model="queryParams.studentRealizeId"
          placeholder="请输入实现人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务订单状态" prop="status"  label-width="100px">
        <el-select v-model="queryParams.status" placeholder="请选择任务订单状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="任务描述" prop="taskDescribe" label-width="100px">
        <el-input
          v-model="queryParams.taskDescribe"
          placeholder="请输入任务描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="费用" prop="fee" label-width="100px">
        <el-input
          v-model="queryParams.fee"
          placeholder="请输入费用"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务类型" prop="taskType" label-width="100px">
        <el-select v-model="form.taskType" placeholder="请选择任务类型" clearable size="small">
          <el-option
            v-for="dict in taskTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="配送地址id" prop="addressId" label-width="100px">
        <el-input
          v-model="queryParams.addressId"
          placeholder="请输入配送地址id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="taskList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="任务ID" align="center" prop="taskId" />
      <el-table-column label="发起人id" align="center" prop="studentSendId" />
      <el-table-column label="实现人id" align="center" prop="studentRealizeId" />
      <!-- <el-table-column label="订单状态" align="center" prop="status" /> -->
      <el-table-column label="订单状态" align="center">
              <template slot-scope="scope">
                <div v-for="dict in statusOptions">
                  <span v-if= "dict.dictValue === scope.row.status">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      <el-table-column label="任务描述" align="center" prop="taskDescribe" />
      <el-table-column label="费用" align="center" prop="fee" />
      <!-- <el-table-column label="任务类型" align="center" prop="taskType" /> -->
       <el-table-column label="任务类型" align="center">
              <template slot-scope="scope">
                <div v-for="dict in taskTypeOptions">
                  <span v-if= "dict.dictValue === scope.row.taskType">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      <el-table-column label="配送地址id" align="center" prop="addressId" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
           icon="el-icon-more"
            @click="handleDetail(scope.row)"
            v-hasPermi="['activity:print:edit']"
            v-if=""
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

    <!-- 任务详情对话框 -->
     <el-dialog title="任务详情" :visible.sync="open" width="700px" append-to-body>
      <div class="detail2" v-if="!taskDetailFlag">暂无任务信息：</div>
      <el-form ref="form" :model="taskDetail" label-width="100px" size="mini" class="content" v-if="taskDetailFlag"> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="发起人id：" label-width="120px">{{ (taskDetail.studentSendId!=null?taskDetail.studentSendId:'暂无数据') }}</el-form-item>
            <el-form-item label="发起人姓名：" label-width="120px">{{ (taskDetail.studentSendName!=null?taskDetail.studentSendName:'暂无数据') }}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="实现人id：" label-width="120px">{{ (taskDetail.studentRealizeId!=null?taskDetail.studentRealizeId:'暂无数据') }}</el-form-item>
            <el-form-item label="实现人姓名：" label-width="120px">{{ (taskDetail.studentRealizeName!=null?taskDetail.studentRealizeName:'暂无数据') }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：" label-width="120px">{{ (taskDetail.remark!=null?taskDetail.remark:'暂无数据') }}</el-form-item>
            <el-form-item label="地址：" label-width="120px">{{ (taskDetail.address!=null?taskDetail.address:'暂无数据') }}</el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="任务描述：" label-width="120px">{{ (taskDetail.taskDescribe!=null?taskDetail.taskDescribe:'暂无数据') }}</el-form-item>
            <el-form-item label="任务类型：" label-width="120px">
              <div v-for="dict in taskTypeOptions">
                    <span v-if= "dict.dictValue === taskDetail.taskType">{{dict.dictLabel}}</span>
                    <span v-if=" taskDetail.taskType===null">暂无数据</span>
              </div>
              <!-- <div v-if="taskDetail.taskType == 0">跑腿</div>
              <div v-else>暂无数据</div> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单状态：" label-width="120px">
              <div v-if="taskDetail.status == 0">下单</div>
              <div v-else-if="taskDetail.status == 1">接单</div>
              <div v-else-if="taskDetail.status == 2">支付</div>
              <div v-else-if="taskDetail.status == 3">完成</div>
              <div v-else>暂无数据</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
           <el-form-item label="费用:" label-width="113px">{{(taskDetail.fee!=null?taskDetail.fee:'暂无数据')}}</el-form-item>
          </el-col>
        </el-row>
      </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="open = false">关 闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listTask, getTask, delTask, addTask, updateTask, exportTask } from "@/api/activity/task";

export default {
  name: "Task",
  data() {
    return {
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
      // 任务信息表格数据
      taskList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        studentSendId: null,
        studentRealizeId: null,
        status: null,
        taskDescribe: null,
        fee: null,
        taskType: null,
        addressId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        studentSendId: [
          { required: true, message: "发起人id不能为空", trigger: "blur" }
        ],
        studentRealizeId: [
          { required: true, message: "实现人id不能为空", trigger: "blur" }
        ],
      },
      statusOptions:[],
      taskTypeOptions:[],
      taskDetail:{},
      taskDetailFlag:true,
    };
  },
  created() {
    this.getList();
     this.getDicts("sys_task_status").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_task_type").then(response => {
      this.taskTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询任务信息列表 */
    getList() {
      this.loading = true;
      listTask(this.queryParams).then(response => {
        var arr=[];
        var res=response.rows;
        res.forEach((item)=>{
          item.taskDescribe= item.taskDescribe.slice(0,3)+'...';
          arr.push(item);
        })
        this.taskList = arr;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        taskId: null,
        studentSendId: null,
        studentRealizeId: null,
        status: "0",
        taskDescribe: null,
        fee: null,
        taskType: null,
        addressId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
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
      this.ids = selection.map(item => item.taskId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加任务信息";
    },
     handleDetail(row) {
       this.taskDetailFlag=true;
      getTask(row.taskId).then(response => {
         this.taskDetail=response.data;
        //  this.userDelivery=this.printDetail.userDelivery;
        //  this.userPrint=this.printDetail.userPrint;
          this.open= true;
          if(this.taskDetail==null){
           this.taskDetailFlag=false;
         }
        //  if(this.userDelivery==null){
        //    this.deliveryFlag=false;
        //  }
        //  if(this.userPrint==null){
        //    this.printFlag=false;
        //  }
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const taskId = row.taskId || this.ids
      getTask(taskId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改任务信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.taskId != null) {
            updateTask(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTask(this.form).then(response => {
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
      const taskIds = row.taskId || this.ids;
      this.$confirm('是否确认删除任务信息编号为"' + taskIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTask(taskIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有任务信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportTask(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
<style scoped>
.detail{
  font-size:16px;
  color:blue;
  margin-left:10px;
}
.content{
  padding-top:10px;
}
.detail1{
  font-size:16px;
  padding-top:20px;
  color:blue;
}
.detail2{
  font-size:16px;
  padding-top:20px;
  color:red;
}
</style>