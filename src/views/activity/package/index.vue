<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="学生id" prop="studentId" label-width="90px">
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入学生id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="配送地址id" prop="addressId" label-width="90px" >
        <el-input
          v-model="queryParams.addressId"
          placeholder="请输入配送地址id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="配送人员Id" prop="userDeliveryId" label-width="90px">
        <el-input
          v-model="queryParams.userDeliveryId"
          placeholder="请输入配送人员Id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="取件码" prop="packageInfo" label-width="90px">
        <el-input
          v-model="queryParams.packageInfo"
          placeholder="请输入取件码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="包裹大小" prop="packageSize" label-width="90px">
        <el-select v-model="queryParams.packageSize" placeholder="请选择包裹大小" clearable size="small">
          <el-option
            v-for="dict in packageSizeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
        <!-- <el-input
          v-model="queryParams.packageSize"
          placeholder="请输入包裹大小(0小件 1大件 2超大件)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        /> -->
      </el-form-item>
      <el-form-item label="顾客备注" prop="customerRemark" label-width="90px">
        <el-input
          v-model="queryParams.customerRemark"
          placeholder="请输入顾客备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单状态" prop="status" label-width="90px">
        <!-- <el-select v-model="queryParams.status" placeholder="请选择订单状态(0下单 1接单 2派送 3支付 4完成)" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select> -->
        <el-select v-model="queryParams.status" placeholder="请选择订单状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="费用" prop="fee" label-width="90px">
        <el-input
          v-model="queryParams.fee"
          placeholder="请输入费用"
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
    <el-table v-loading="loading" :data="packageList" @selection-change="handleSelectionChange">
      <el-table-column label="包裹id" align="center" prop="packageId" />
      <el-table-column label="学生id" align="center" prop="studentId" />
      <el-table-column label="配送地址id" align="center" prop="addressId" width="90px"/>
      <el-table-column label="配送人员Id" align="center" prop="userDeliveryId" width="90px"/>
      <el-table-column label="取件码" align="center" prop="packageInfo" />
      <el-table-column label="包裹大小" align="center">
              <template slot-scope="scope">
                <div v-for="dict in packageSizeOptions">
                  <span v-if= "dict.dictValue === scope.row.packageSize">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      <!-- <el-table-column label="包裹大小(0小件 1大件 2超大件)" align="center" prop="packageSize" /> -->
      <el-table-column label="顾客备注" align="center" prop="customerRemark" />
      <!-- <el-table-column label="订单状态(0下单 1接单 2派送 3支付 4完成)" align="center" prop="status" /> -->
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
            @click="handleUpdate(scope.row)" v-if="scope.row.flag">{{scope.row.updateValue}}</el-button>
            <!-- size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['activity:package:edit']" -->
          <!-- >修改</el-button> -->
          <el-button
          size="mini"
            type="text"
            icon="el-icon-more"
            @click="handleDetail(scope.row)"
          >详情</el-button>
            <!-- size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['activity:package:remove']"
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
 <!-- 包裹详情对话框 -->
     <el-dialog title="包裹详情" :visible.sync="open1" width="700px" append-to-body>
      <div class="detail" v-if="packageDetailFlag">学生信息：</div>
      <div class="detail2" v-if="!packageDetailFlag">学生暂无信息：</div>
      <el-form ref="form" :model="packageDetail" label-width="100px" size="mini" class="content" v-if="packageDetailFlag"> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="学生id：" label-width="120px">{{ (packageDetail.studentId!=null?packageDetail.studentId:'暂无数据') }}</el-form-item>
            <el-form-item label="学生姓名：" label-width="120px">{{ (packageDetail.studentName!=null?packageDetail.studentName:'暂无数据') }}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="学生备注：" label-width="120px">{{(packageDetail.remark!=null?packageDetail.remark:'暂无数据')}}</el-form-item>
            <el-form-item label="学生地址：" label-width="120px">{{ (packageDetail.address!=null?packageDetail.address:'暂无数据') }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="取件码：" label-width="120px">{{ (packageDetail.packageInfo!=null?packageDetail.packageInfo:'暂无数据') }}</el-form-item>
          </el-col>
            <el-form-item label="包裹大小：" label-width="120px">
              <div v-if="packageDetail.packageSize == 0">小件</div>
              <div v-else-if="packageDetail.packageSize == 1">大件</div>
              <div v-else-if="packageDetail.packageSize == 3">超大件</div>
              <div v-else>暂无数据</div>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="反馈状态：" label-width="120px" >
                  <div v-for="dict in feedbackOptions">
                    <span v-if= "dict.dictValue === feedbackDetail.status">{{dict.dictLabel}}</span>
                  </div>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="订单状态：" label-width="120px">
              <div v-for="dict in statusOptions">
                    <span v-if= "dict.dictValue === packageDetail.status">{{dict.dictLabel}}</span>
                    <span v-if=" packageDetail.status===null">暂无数据</span>
              </div>
            </el-form-item>
            <el-form-item label="费用:" label-width="113px">{{(packageDetail.fee!=null?packageDetail.fee:'暂无数据')}}</el-form-item>
          </el-col>
        </el-row>
      </el-form> 
       <div class="detail1" v-if="deliveryFlag">派送人员信息：</div>
        <div class="detail2" v-if="!deliveryFlag">派送人员暂无信息：</div>
      <el-form ref="form" :model="userDelivery" label-width="100px" size="mini" class="content" v-if="deliveryFlag"> 
        <el-row >
          <el-col :span="12">
            <el-form-item label="派送人员id：" label-width="120px">{{ (userDelivery.userId!=null?userDelivery.userId:'暂无数据') }}</el-form-item>
            <el-form-item label="派送人员姓名：" label-width="120px">{{(userDelivery.userName!=null?userDelivery.userName:'暂无数据')}}</el-form-item>
          </el-col>
         <el-col :span="12">
            <el-form-item label="派送人员电话：" label-width="120px">{{ (userDelivery.phonenumber!=null?userDelivery.phonenumber:'暂无数据') }}</el-form-item>
            <el-form-item label="派送人员邮箱：" label-width="120px">{{ (userDelivery.email!=null?userDelivery.email:'暂无数据') }}</el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item label="派送人员性别：" label-width="120px">
              <div v-if="userDelivery.sex== 0">男</div>
              <div v-else-if="userDelivery.sex == 1">女</div>
              <div v-else>暂无数据</div>
            </el-form-item>
           </el-col>
           <el-col :span="12">
            <el-form-item label="派送人员备注：" label-width="120px">{{ (userDelivery.remark!=null?userDelivery.remark:'暂无数据') }}</el-form-item>
            </el-col>
        </el-row> 
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="open1 = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPackage, getPackage, delPackage, addPackage, updatePackage, exportPackage } from "@/api/activity/package";
import store from "@/store";

export default {
  name: "Package",
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
      uId: store.getters.uId,
      // 总条数
      total: 0,
      // 包裹订单信息表格数据
      packageList: [],
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
        userDeliveryId: null,
        packageInfo: null,
        packageSize: null,
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
          { required: true, message: "配送地址id不能为空", trigger: "blur" }
        ],
        packageInfo: [
          { required: true, message: "取件码不能为空", trigger: "blur" }
        ],
      },
      packageSizeOptions:[],
      statusOptions:[],
      // updateValue:'',
      updateParams:{},
      packageDetail:{},
      packageDetailFlag:true,
      deliveryFlag:true,
      userDelivery:{}
    };
  },
  created() {
    this.getList();
     this.getDicts("sys_package_type").then(response => {
      this.packageSizeOptions = response.data;
    });
    this.getDicts("sys_package_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询包裹订单信息列表 */
    getList() {
      this.loading = true;
      listPackage(this.queryParams).then(response => {
        var arr=[];
        var res=response.rows;;
        res.forEach((item)=>{
          item.packageInfo= item.packageInfo.slice(0,3)+'...';
          if(item.status=='1'||item.status=='3'){
            item.flag=true;
            if(item.status=='3'){
              item.updateValue='接单';
            }
             if(item.status=='1'){
              item.updateValue='派送';
            }
          }
          else{
            item.flag=false;
          }
          arr.push(item);
        })
        this.packageList = arr;
        // this.packageList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    handleDetail(row) {
       this.deliveryFlag=true;
      this.packageDetailFlag=true;
      getPackage(row.packageId).then(response => {
         this.packageDetail=response.data;
        this.userDelivery=this.packageDetail.userDelivery;
         this.open1= true; 
         if(this.userDelivery==null){
           this.deliveryFlag=false;
         }
         if(this.packageDetail==null){
           this.packageDetailFlag=false;
         }
      });
    },
    // 取消按钮
    cancel() {
      this.open1 = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        packageId: null,
        studentId: null,
        addressId: null,
        userDeliveryId: null,
        packageInfo: null,
        packageSize: null,
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.packageId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.updateParams.packageId=row.packageId;
      if(row.status=='3'){
         this.updateParams.status='1';
         var Params= this.updateParams;
          this.$confirm('是否确认修改为接单状态?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return  updatePackage(Params);
        }).then(() => {
           this.msgSuccess("修改成功");
           this.getList();
        })
         
      }
      if(row.status=='1'){
         this.updateParams.status='2';
         this.updateParams.userDeliveryId = this.uId;
         var Params= this.updateParams;
          this.$confirm('是否确认修改为派送状态?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return  updatePackage(Params);
        }).then(() => {
           this.msgSuccess("修改成功");
           this.getList();
        })
        
      }
    },
    
    /** 删除按钮操作 */
    handleDelete(row) {
      const packageIds = row.packageId || this.ids;
      this.$confirm('是否确认删除包裹订单信息编号为"' + packageIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPackage(packageIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有包裹订单信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPackage(queryParams);
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