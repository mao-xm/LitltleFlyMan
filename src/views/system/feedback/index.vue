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
        <el-select v-model="queryParams.feedbackStatus" placeholder="反馈状态" clearable size="small">
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
        <el-select v-model="queryParams.AnonymityStatus" placeholder="匿名状态" clearable size="small">
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
              border
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
            v-hasPermi="['system:post:edit']"
          >处理</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-more"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:post:remove']"
          >详情</el-button>
        </template>
      </el-table-column>
            </el-table>
    <!-- <el-table v-loading="loading" :data="feedbackList" style="width: 100%">
      <el-table-column label="编号"  prop="feedbackId"></el-table-column>
      <el-table-column label="用户名"  prop="studentName" ></el-table-column>
      <el-table-column label="用户id"  prop="studentId" ></el-table-column>
      <el-table-column label="内容"  prop="feedbackContent" ></el-table-column>
      <el-table-column label="反馈状态"  prop="status" :formatter="statusFormat" ></el-table-column>
      <el-table-column label="操作"  class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:post:edit']"
          >处理</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-more"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:post:remove']"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { listFeedback } from "@/api/system/feedback";

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
          value: '选项1',
          label: '已处理'
        }, {
          value: '选项2',
          label: '未处理'
        }],
      anonymityOptions:[{
          value: '选项1',
          label: '匿名'
        }, {
          value: '选项2',
          label: '不匿名'
        }

      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        studentId: undefined,
        studentName: undefined,
        feedbackStatus: undefined,
        AnonymityStatus:undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        postCode: [
          { required: true, message: "用户编码不能为空", trigger: "blur" }
        ],
        postName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        feedbackStatus:[
          { required: true, message: "反馈状态不能为空", trigger: "blur" }
        ],
        createTime:[
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        AnonymityStatus:[
          { required: true, message: "匿名状态不能为空", trigger: "blur" }
        ],
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
       listFeedback(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.feedbackList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
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
      this.form = {
        postId: undefined,
        postCode: undefined,
        postName: undefined,
        postSort: 0,
        status: "0",
        remark: undefined
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
   
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.postId != undefined) {
            updatePost(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPost(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
   
  }
};
</script>