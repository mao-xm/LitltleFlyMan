<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="学生id" prop="studentId" label-width="150px" >
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入学生id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="配送地址信息" prop="addressId" label-width="100px" >
        <el-input
          v-model="queryParams.addressId"
          placeholder="请输入配送地址信息"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        /> -->
      </el-form-item>
      <el-form-item label="洗衣负责人Id" prop="userWashId" label-width="150px" >
        <el-input
          v-model="queryParams.userWashId"
          placeholder="请输入洗衣负责人Id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="配送人员Id" prop="userDeliveryId" label-width="150px" >
        <el-input
          v-model="queryParams.userDeliveryId"
          placeholder="请输入配送人员Id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接取衣物人员Id" prop="userPikeId" label-width="150px" >
        <el-input
          v-model="queryParams.userPikeId"
          placeholder="请输入接取衣物人员Id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="衣物类型" prop="clothesType">
        <el-select v-model="queryParams.clothesType" placeholder="请选择衣物类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
       <el-form-item label="衣物类型" prop="clothesType" label-width="150px" >
        <el-select v-model="queryParams.clothesType" placeholder="请选择衣物类型" clearable size="small">
          <el-option
            v-for="dict in clothesTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
       <el-form-item label="清洗类型" prop="washType" label-width="150px" >
        <el-select v-model="queryParams.washType" placeholder="请选择清洗类型" clearable size="small">
          <el-option
            v-for="dict in washTypeOptions"
             :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="清洗类型" prop="washType">
        <el-select v-model="queryParams.washType" placeholder="请选择清洗类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="衣物数量" prop="clothesNumber" label-width="150px" >
        <el-input
          v-model="queryParams.clothesNumber"
          placeholder="请输入衣物数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="顾客备注" prop="customerRemark" label-width="100px" >
        <el-input
          v-model="queryParams.customerRemark"
          placeholder="请输入顾客备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
       <el-form-item label="订单状态" prop=" status" label-width="150px" >
        <el-select v-model="queryParams. status" placeholder="请选择订单状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
             
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="订单状态(0下单 1支付 2接单 3清洗 4派送 5完成)" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择订单状态(0下单 1支付 2接单 3清洗 4派送 5完成)" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="费用" prop="fee" label-width="100px" > 
        <el-input
          v-model="queryParams.fee"
          placeholder="请输入费用"
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['activity:laundry:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['activity:laundry:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['activity:laundry:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['activity:laundry:export']"
        >导出</el-button>
      </el-col> -->
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="laundryList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="洗衣订单Id" align="center" prop="laundryId" />
      <el-table-column label="学生id" align="center" prop="studentId" />
      <el-table-column label="配送地址信息" align="center" prop="addressId" />
      <!-- <el-table-column label="洗衣负责人Id" align="center" prop="userWashId" /> -->
      <!-- <el-table-column label="配送人员Id" align="center" prop="userDeliveryId" /> -->
      <!-- <el-table-column label="接取衣物人员Id" align="center" prop="userPikeId" /> -->
      <el-table-column label="衣物类型" align="center">
              <template slot-scope="scope">
                <div v-for="dict in clothesTypeOptions">
                  <span v-if= "dict.dictValue === scope.row.clothesType">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
       <el-table-column label="清洗类型" align="center">
              <template slot-scope="scope">
                <div v-for="dict in washTypeOptions">
                  <span v-if= "dict.dictValue === scope.row.washType">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      <el-table-column label="衣物数量" align="center" prop="clothesNumber" />
      <el-table-column label="顾客备注" align="center" prop="customerRemark" />
      <!-- <el-table-column label="订单状态(0下单 1支付 2接单 3清洗 4派送 5完成)" align="center" prop="status" /> -->
      <el-table-column label="订单状态" align="center">
              <template slot-scope="scope">
                <div v-for="dict in statusOptions">
                  <span v-if= "dict.dictValue === scope.row.status">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      <el-table-column label="费用" align="center" prop="fee" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['activity:laundry:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-more"
            @click="handleDetail(scope.row)"
            v-hasPermi="['activity:laundry:remove']"
          >详情</el-button>
        </template>s
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
     <!-- 洗衣详情对话框 -->
     <el-dialog title="洗衣详情" :visible.sync="open1" width="500px" append-to-body >
     <div id="detail" width="500px">   
         <div class="content1">
           <div class="title">洗衣Id:</div>
           <div class="washContent">{{laundryDetail.laundryId}}</div>
         </div>
          <div class="content">
           <div class="title">学生Id：</div>
           <div class="washContent">{{laundryDetail.studentId}}</div>
         </div>
          <div class="content">
           <div class="title">学生姓名：</div>
           <div class="washContent">{{laundryDetail.studentName}}</div>
         </div>
          <div class="content">
           <div class="title">学生地址:</div>
           <div class="washContent">{{laundryDetail.address}}</div>
         </div>
          <!--<div class="content">
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
         </div>-->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listLaundry, getLaundry, delLaundry, addLaundry, updateLaundry, exportLaundry } from "@/api/activity/wash";

export default {
  name: "Laundry",
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
      // 洗衣订单信息表格数据
      laundryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open1: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        studentId: null,
        addressId: null,
        userWashId: null,
        userDeliveryId: null,
        userPikeId: null,
        clothesType: null,
        washType: null,
        clothesNumber: null,
        customerRemark: null,
        status: null,
        fee: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        studentId: [
          { required: true, message: "学生id不能为空", trigger: "blur" }
        ],
        addressId: [
          { required: true, message: "配送地址信息不能为空", trigger: "blur" }
        ],
      },
       clothesTypeOptions:[],
       washTypeOptions: [],
       statusOptions:  [],
       laundryDetail:{}
      

    };
  },
  created() {
    this.getList();
    this.getDicts("sys_clothes_type").then(response => {
      this.clothesTypeOptions = response.data;
    });
    this.getDicts("sys_wash_type").then(response => {
      this.washTypeOptions = response.data;
    });
    this.getDicts("sys_order_type").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询洗衣订单信息列表 */
    getList() {
      this.loading = true;
      listLaundry(this.queryParams).then(response => {
        this.laundryList = response.rows;
        this.total = response.total;
        this.loading = false
      })},
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        laundryId: null,
        studentId: null,
        addressId: null,
        userWashId: null,
        userDeliveryId: null,
        userPikeId: null,
        clothesType: null,
        washType: null,
        clothesNumber: null,
        customerRemark: null,
        status: "0",
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
          return  updateLaundry(Params);
        }).then(() => {
           this.msgSuccess("修改成功");
           this.getList();
        })
         
      }
      if(row.status=='接单'){
         this.updateParams.status='3';
         var Params= this.updateParams;
          this.$confirm('是否确认修改为清洗状态?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return  updateLaundry(Params);
        }).then(() => {
           this.msgSuccess("修改成功");
           this.getList();
        })
        
      }
       if(row.status=='清洗'){
         this.updateParams.status='4';
         var Params= this.updateParams;
          this.$confirm('是否确认修改为派送状态?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return  updateLaundry(Params);
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
      getLaundry(row.laundryId).then(response => {
         this.laundryDetail=response.data;
         this.open1 = true;
      });
    },
    cancel1() {
      this.open1 = false;
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
 .washContent{
   font-size:16px;
   width:330px;
   margin-left:15px;
   padding-top:1px;
 }
</style>