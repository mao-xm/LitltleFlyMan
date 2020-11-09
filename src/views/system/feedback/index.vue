<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="学生编码" prop="postCode">
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入学生编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学生名" prop="postName">
        <el-input
          v-model="queryParams.studentName"
          placeholder="请输入学生名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      S
      <el-form-item label="反馈状态" prop="feedbackStatus">
        <el-select v-model="queryParams.status" placeholder="反馈状态" clearable size="small">
          <el-option
            v-for="dict in feedbackOptions"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
       <el-form-item label="时间" prop="createTime">
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
      <el-form-item label="匿名状态" prop="AnonymityStatus">
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
        v-loading="loading"
        style="width: 100%;">
            <el-table-column
              prop="feedbackId"
              label="编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="studentName"
              label="用户名"
              width="180">
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
              >处理</el-button> <!-- v-hasPermi="['system:post:edit']" -->
              <el-button
                size="mini"
                type="text"
                icon="el-icon-more"
                @click="handleDelete(scope.row)"
              >详情</el-button><!--v-hasPermi="['system:post:remove']" -->
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
       <span>确定处理反馈状态吗?</span>
      <!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="form.dictType" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listFeedback,updateFeedback} from "@/api/system/feedback";

export default {
  name: "feedback",
  data() {
    return {
      //  tableData: [{
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   }, {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   }, {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   }, {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }],
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 反馈表格数据
      feedbackList: [
      ],
      // 弹出层标题
      title: "",
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
      // 表单参数
      // form: {},
      // 表单校验
      // rules: {
      //   postCode: [
      //     { required: true, message: "用户编码不能为空", trigger: "blur" }
      //   ],
      //   postName: [
      //     { required: true, message: "用户名不能为空", trigger: "blur" }
      //   ],
      //   feedbackStatus:[
      //     { required: true, message: "反馈状态不能为空", trigger: "blur" }
      //   ],
      //   createTime:[
      //     { required: true, message: "创建时间不能为空", trigger: "blur" }
      //   ],
      //   AnonymityStatus:[
      //     { required: true, message: "匿名状态不能为空", trigger: "blur" }
      //   ],
      // },
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
          var array=this.feedbackList.map((item)=> {
          if( item.status==0){
            item.status='未处理';
          }
          else{
             item.status='已处理';
          }
          return item;
           })
           this.feedbackList=array;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.open = true;
      this.title = "提示";
      this.updateParams.feedbackId=row.feedbackId;
      this.updateParams.status='1';
      // console.log(row.feedbackId);
      //  console.log(row.status);
      // this.reset();
      // const dictId = row.dictId || this.ids
      // getType(dictId).then(response => {
        // this.form = response.data;
        // this.open = true;
        // this.title = "修改字典类型";
      // });
    },
    // 岗位状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      // this.form = {
      //   postId: undefined,
      //   postCode: undefined,
      //   postName: undefined,
      //   postSort: 0,
      //   status: "0",
      //   remark: undefined
      // };
      // this.resetForm("form");
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
      updateFeedback(this.updateParams).then(response => {
        this.msgSuccess("处理成功");
        this.open = false;
        this.getList();
      });
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