<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="学生Id" prop="studentId">
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入学生Id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="文件名" prop="fileName">
        <el-input
          v-model="queryParams.fileName"
          placeholder="请输入文件名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="打印员工Id" prop="userPrintId" label-width="100px" >
        <el-input
          v-model="queryParams.userPrintId"
          placeholder="请输入打印员工Id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        /> 
      </el-form-item>
      <el-form-item label="派送员工Id" prop="userDeliveryId" label-width="100px">
        <el-input
          v-model="queryParams.userDeliveryId"
          placeholder="请输入派送员工Id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="打印数量" prop="printNumber">
        <el-input
          v-model="queryParams.printNumber"
          placeholder="请输入打印数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="单双面标志" prop="bothSideFlag" label-width="100px">
        <el-select v-model="queryParams.bothSideFlag" placeholder="请选择单双面标志" clearable size="small">
          <el-option
            v-for="dict in bothSideOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="彩印标志" prop="colorFlag" label-width="100px">
        <el-select v-model="queryParams.colorFlag" placeholder="请选择彩印标志" clearable size="small">
          <el-option
            v-for="dict in colorOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
       <el-form-item label="封胶标志" prop="sealingFlag" label-width="100px">
        <el-select v-model="queryParams.sealingFlag" placeholder="请选择封胶标志" clearable size="small">
          <el-option
            v-for="dict in sealingOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
       <el-form-item label="纸张大小" prop="paperSize" label-width="100px">
        <el-select v-model="queryParams.paperSize" placeholder="请选择纸张大小" clearable size="small">
          <el-option
            v-for="dict in paperOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item label="打印订单状态" prop="status" label-width="100px">
        <el-select v-model="queryParams.status" placeholder="请选择打印订单状态" clearable size="small">
          <el-option
            v-for="dict in printOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
       <el-form-item label="封面颜色" prop="coverColor" label-width="100px">
        <el-select v-model="queryParams.coverColor" placeholder="请选择封面颜色" clearable size="small">
          <el-option
            v-for="dict in coverColorOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="金额" prop="fee">
        <el-input
          v-model="queryParams.fee"
          placeholder="请输入金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table v-loading="loading" :data="printList" @selection-change="handleSelectionChange">
      <!-- <el-table-column label="打印Id" align="center" prop="printId" /> -->
      <el-table-column label="学生Id" align="center" prop="studentId" />
      <el-table-column label="文件名" align="center" prop="fileName" />
      <!-- <el-table-column label="文件url" align="center" prop="fileUrl" /> -->
      <!-- <el-table-column label="打印员工Id" align="center" prop="userPrintId" />
      <el-table-column label="派送员工Id" align="center" prop="userDeliveryId" /> -->
      <el-table-column label="打印数量" align="center" prop="printNumber" />
      <el-table-column label="单双面标志" align="center">
              <template slot-scope="scope">
                <div v-for="dict in bothSideOptions">
                  <span v-if= "dict.dictValue === scope.row.bothSideFlag">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
       <el-table-column label="彩印标志" align="center">
              <template slot-scope="scope">
                <div v-for="dict in colorOptions">
                  <span v-if= "dict.dictValue === scope.row.colorFlag">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
       <el-table-column label="封胶标志" align="center">
              <template slot-scope="scope">
                <div v-for="dict in sealingOptions">
                  <span v-if= "dict.dictValue === scope.row.sealingFlag">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
       <el-table-column label="纸张大小" align="center">
              <template slot-scope="scope">
                <div v-for="dict in paperOptions">
                  <span v-if= "dict.dictLabel === scope.row.paperSize">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      <!-- <el-table-column label="学生备注" align="center" prop="studentRemark" /> -->
        <el-table-column label="打印订单状态" align="center">
              <template slot-scope="scope">
                <div v-for="dict in printOptions">
                  <span v-if= "dict.dictValue === scope.row.status">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      <!-- <el-table-column label="配送地址id" align="center" prop="addressId" /> -->
        <el-table-column label="封面颜色" align="center">
              <template slot-scope="scope">
                <div v-for="dict in coverColorOptions">
                  <span v-if= "dict.dictValue === scope.row.coverColor">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      <el-table-column label="金额" align="center" prop="fee" />
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="text"
           icon="el-icon-more"
            @click="handleDetail(scope.row)"
            v-hasPermi="['activity:print:edit']"
          >详情</el-button>
         <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['activity:print:edit']"
          >修改</el-button>
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
     <!-- 打印详情对话框 -->
     <el-dialog title="打印详情" :visible.sync="open1" width="500px" append-to-body >
     <div id="detail" width="500px">   
         <div class="content1">
           <div class="title">打印Id:</div>
           <div class="printContent">{{printDetail.printId}}</div>
         </div>
          <div class="content">
           <div class="title">学生Id：</div>
           <div class="printContent">{{printDetail.studentId}}</div>
         </div>
         <div class="content">
           <div class="title">学生姓名：</div>
           <div class="printContent">{{printDetail.studentName}}</div>
         </div>
          <div class="content">
           <div class="title">文件名:</div>
           <div class="printContent">{{printDetail.fileName}}</div>
         </div>
          <div class="content">
           <div class="title">文件url:</div>
           <div class="printContent">{{printDetail.fileUrl}}</div>
         </div>
         <div class="content">
           <div class="title">打印员工Id：</div>
           <div class="printContent">{{printDetail.userPrintId}}</div>
         </div>
         <div class="content">
           <div class="title">派送员工Id：</div>
           <div class="printContent">{{printDetail.userDeliveryId}}</div>
         </div>
          <div class="content">
           <div class="title"> 打印数量：</div>
           <div class="printContent">{{printDetail.printNumber}}</div>
         </div>
        <div class="content"  >
            <div class="title"> 单双面标志：</div>
            <div v-for="dict in bothSideOptions" v-if= "dict.dictValue ==printDetail.bothSideFlag" class="printContent">{{dict.dictLabel}}</div>
        </div>
         <div class="content">
            <div class="title"> 彩印标志：</div>
            <div v-if= "dict.dictValue ==printDetail.colorFlag" v-for="dict in colorOptions" class="printContent">{{dict.dictLabel}}</div>
        </div>
        <div class="content">
            <div class="title"> 封胶标志：</div>
              <div v-if= "dict.dictValue ==printDetail.sealingFlag" v-for="dict in sealingOptions" class="printContent">{{dict.dictLabel}}</div>
        </div>
        <div class="content">
            <div class="title"> 纸张大小：</div>
              <div v-if= "dict.dictLabel ==printDetail.paperSize" v-for="dict in paperOptions" class="printContent">{{dict.dictLabel}}</div>
        </div>
          <div class="content">
           <div class="title"> 学生备注：</div>
           <div class="printContent">{{printDetail.studentRemark}}</div>
         </div>
         <div class="content">
            <div class="title"> 打印订单状态：</div>
            <div v-if= "dict.dictValue ==printDetail.status"  v-for="dict in printOptions" class="printContent">{{dict.dictLabel}}</div>  
        </div>
           <div class="content">
           <div class="title"> 配送地址:</div>
           <div class="printContent">{{printDetail.address}}</div>
         </div>
          <div class="content">
            <div class="title"> 封面颜色：</div>
              <div v-for="dict in coverColorOptions" class="printContent" v-if= "dict.dictValue ==printDetail.coverColor">{{dict.dictLabel}}</div>
        </div>
          <div class="content">
           <div class="title"> 金额 ：</div>
           <div class="printContent">{{printDetail.fee}}</div>
         </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listPrint, getPrint, delPrint, addPrint, updatePrint, exportPrint } from "@/api/activity/print";

export default {
  name: "Print",
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
      // 打印订单表格数据
      printList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      open1: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        studentId: null,
        fileName: null,
        fileUrl: null,
        userPrintId: null,
        userDeliveryId: null,
        printNumber: null,
        bothSideFlag: null,
        colorFlag: null,
        sealingFlag: null,
        paperSize: null,
        studentRemark: null,
        status: null,
        addressId: null,
        coverColor: null,
        fee: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        studentId: [
          { required: true, message: "学生Id不能为空", trigger: "blur" }
        ],
        fileName: [
          { required: true, message: "文件名不能为空", trigger: "blur" }
        ],
        fileUrl: [
          { required: true, message: "文件url不能为空", trigger: "blur" }
        ],
        addressId: [
          { required: true, message: "配送地址id不能为空", trigger: "blur" }
        ],
      },
        printOptions: [],
        bothSideOptions: [],
        colorOptions: [],
        sealingOptions: [],
        paperOptions: [],
        coverColorOptions: [],
        printDetail:{},
         //修改参数
        updateParams:{
        },
        
    };
  },
  created() {
    this.getList();
     this.getDicts("sys_bothside_type").then(response => {
      this.bothSideOptions = response.data;
    });
    this.getDicts("sys_ color_type").then(response => {
      this.colorOptions = response.data;
    });
    this.getDicts("sys_sealing_type").then(response => {
      this.sealingOptions = response.data;
    });
     this.getDicts("sys_paper_type").then(response => {
      this.paperOptions = response.data;
    });
     this.getDicts("sys_status_type").then(response => {
      this.printOptions = response.data;
    });
     this.getDicts("sys_cover_type").then(response => {
      this.coverColorOptions = response.data;
    });

  },
  methods: {
    /** 查询打印订单列表 */
    getList() {
      this.loading = true;
      listPrint(this.queryParams).then(response => {
        var arr=[];
        var res=response.rows;;
        res.forEach((item)=>{
          // item.fileUrl= item.fileUrl.slice(0,4)+'...';
          item.fileName= item.fileName.slice(0,3)+'...';
          arr.push(item);
        })
        this.printList = arr;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
      cancel1() {
      this.open1 = false;
    },
    // 表单重置
    reset() {
      this.form = {
        printId: null,
        studentId: null,
        fileName: null,
        fileUrl: null,
        userPrintId: null,
        userDeliveryId: null,
        printNumber: null,
        bothSideFlag: null,
        colorFlag: null,
        sealingFlag: null,
        paperSize: null,
        studentRemark: null,
        status:null,
        addressId: null,
        coverColor: null,
        fee: null,
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
      this.ids = selection.map(item => item.printId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加打印订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
       this.updateParams.feedbackId=row.feedbackId;
      if(row.status=='支付'){
         this.updateParams.status='2';
         var Params= this.updateParams;
          this.$confirm('是否确认修改为接单状态?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return  updatePrint(Params);
        }).then(() => {
           this.msgSuccess("修改成功");
           this.getList();
        })
         
      }
      if(row.status=='接单'){
         this.updateParams.status='3';
         var Params= this.updateParams;
          this.$confirm('是否确认修改为派送状态?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return  updatePrint(Params);
        }).then(() => {
           this.msgSuccess("修改成功");
           this.getList();
        })
        
      }
      this.$message({
          message: '当前状态不可修改',
          type: 'warning'
        });
      
      
     
    },
     handleDetail(row) {
      getPrint(row.printId).then(response => {
         this.printDetail=response.data;
         this.open1 = true;
      });
    },
  }
};
</script>
<style scoped>
.title{
   font-size:16px;
   font-weight:100px;
   /* margin-left:20px; */
 }
 .content1{
   margin-top:25px;
   flex-wrap: wrap;
   display:flex;
 }
 .content{
   margin-top:20px;
   flex-wrap: wrap;
   display:flex;
 }
 .printContent{
   font-size:16px;
   width:330px;
   margin-left:15px;
   /* margin-right:50px; */
   padding-top:1px;
 }
</style>