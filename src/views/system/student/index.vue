<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--学院数据-->
      <!-- <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            v-model="collegeName"
            placeholder="请输入学院名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            :data="collegeOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col> -->
      <!--用户数据-->
      <el-col :span="20" :xs="24">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
            <!-- <el-form-item label="学院id" prop="collegeId">
                <el-input
                v-model="queryParams.collegeId"
                placeholder="请输入学院id"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
                />
            </el-form-item> -->
            <el-form-item label="学校" prop="schoolId">
             <el-select
            v-model="queryParams.schoolId"
            placeholder="请选择归属学校"
            clearable
            size="small"
          >
                <el-option
                  v-for="school in collegeOptions"
                  :key="school.schoolId"
                  :label="school.schoolName"
                  :value="school.schoolId"
                />
            </el-select>
            </el-form-item>
            <el-form-item label="学生姓名" prop="studentName">
                <el-input
                v-model="queryParams.studentName"
                placeholder="请输入学生姓名"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="学号" prop="studentNumber">
                <el-input
                v-model="queryParams.studentNumber"
                placeholder="请输入学号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <!-- <el-form-item label="邮箱" prop="email">
                <el-input
                v-model="queryParams.email"
                placeholder="请输入邮箱"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
                />
            </el-form-item> -->
            <el-form-item label="电话号" prop="phoneNumber">
                <el-input
                v-model="queryParams.phoneNumber"
                placeholder="请输入电话号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="queryParams.sex" placeholder="请选择性别" clearable size="small">
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="头像" prop="avatar">
                <el-input
                v-model="queryParams.avatar"
                placeholder="请输入头像"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
                />
            </el-form-item> -->
            <!-- <el-form-item label="密码" prop="password">
                <el-input
                v-model="queryParams.password"
                placeholder="请输入密码"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
                />
            </el-form-item> -->
            <el-form-item label="账号状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="请选择账号状态" clearable size="small">
                <el-option                 
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <!-- <el-col :span="1.5">
                <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
                v-hasPermi="['system:student:add']"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="success"
                icon="el-icon-edit"
                size="mini"
                :disabled="single"
                @click="handleUpdate"
                v-hasPermi="['system:student:edit']"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="handleDelete"
                v-hasPermi="['system:student:remove']"
                >删除</el-button>
            </el-col> -->
            <el-col :span="1.5">
                <el-button
                type="warning"
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                v-hasPermi="['system:student:export']"
                >导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="studentList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="学生ID" align="center" prop="studentId" />
            <el-table-column label="学校" align="center" prop="school.schoolName" :show-overflow-tooltip="true" />
            <el-table-column label="学生姓名" align="center" prop="studentName" />
            <el-table-column label="学号" align="center" prop="studentNumber" />
            <el-table-column label="邮箱" align="center" prop="email" />
            <el-table-column label="电话号" align="center" prop="phoneNumber" />
            <el-table-column label="性别" align="center">
              <template slot-scope="scope">
                <div v-for="dict in sexOptions">
                  <span v-if= "dict.dictValue === scope.row.sex">{{dict.dictLabel}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="账号状态" align="center">
              <template slot-scope="scope">
                <div v-for="dict in statusOptions">
                  <span v-if= "dict.dictValue === scope.row.status">{{dict.dictLabel}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center" prop="remark" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                <el-button
                    v-if="scope.row.status === '0'"
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="bindStudent(scope.row)"
                    v-hasPermi="['system:student:edit']"
                >停用</el-button>
                <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row)"
                    v-hasPermi="['system:student:remove']"
                >删除</el-button>
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
      </el-col>
    </el-row><!-- 添加或修改学生信息对话框 -->
  </div>
</template>

<script>
import { listStudent, getStudent, delStudent, addStudent, updateStudent, exportStudent } from "@/api/system/student";
import { treeselect } from "@/api/system/college";
import Treeselect from "@riophae/vue-treeselect";
import { listCollege } from "@/api/system/college";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Student",
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
      // 学生信息表格数据
      studentList: [],
      // 状态数据字典
      statusOptions: [],
      // 性别状态字典
      sexOptions: [],
      // 弹出层标题
      title: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 是否显示弹出层
      open: false,
      // 学院名称
      collegeName: undefined,
      // 学院树选项
      collegeOptions: undefined,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        collegeId: null,
        studentName: null,
        studentNumber: null,
        email: null,
        phoneNumber: null,
        sex: null,
        avatar: null,
        password: null,
        status: null,
        schoolId:undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        collegeId: [
          { required: true, message: "学院id不能为空", trigger: "blur" }
        ],
        studentName: [
          { required: true, message: "学生姓名不能为空", trigger: "blur" }
        ],
        studentNumber: [
          { required: true, message: "学号不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getSchoolList();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_user_sex").then(response => {
      this.sexOptions = response.data;
    });
  },
  watch: {
    // 根据名称筛选学院树
    collegeName(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    /** 查询学生信息列表 */
    getList() {
      this.loading = true;
      listStudent(this.queryParams).then(response => {
        this.studentList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    

    /** 查询学校 */
     getSchoolList(){
       this.loading = true;
      listCollege().then(response => {
         this.collegeOptions =response.rows;
         this.loading = false;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.collegeId = data.id;
      this.getList();
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        studentId: null,
        collegeId: null,
        studentName: null,
        studentNumber: null,
        email: null,
        phoneNumber: null,
        sex: null,
        avatar: null,
        password: null,
        status: "0",
        delFlag: null,
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
      this.ids = selection.map(item => item.studentId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加学生信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const studentId = row.studentId || this.ids
      getStudent(studentId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改学生信息";
      });
    },
    /** 停用学生 */
    bindStudent(row){
      const student = {
        studentId: row.studentId,
        status: "1"
      }
      const studentIds = row.studentId || this.ids;
      this.$confirm('是否确认停用学生信息编号为"' + studentIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          if (student.studentId != null) {
            return updateStudent(student);
          }
        }).then(() => {
          this.getList();
          this.msgSuccess("停用成功");
        })
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.studentId != null) {
            updateStudent(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStudent(this.form).then(response => {
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
      const studentIds = row.studentId || this.ids;
      this.$confirm('是否确认删除学生信息编号为"' + studentIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStudent(studentIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有学生信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportStudent(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>