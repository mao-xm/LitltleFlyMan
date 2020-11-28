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
            @click="handleUpdate(scope.row)" v-if="scope.row.flag">{{updateValue}}</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-if=""
            v-hasPermi="['activity:laundry:edit']"
          >修改</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-more"
            @click="handleDetail(scope.row)"
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
     <el-dialog title="洗衣详情" :visible.sync="open1" width="700px" append-to-body>
      <div class="detail" v-if="laundryDetailFlag">学生信息：</div>
      <div class="detail2" v-if="!laundryDetailFlag">学生暂无信息：</div>
      <el-form ref="form" :model="laundryDetail" label-width="100px" size="mini" class="content" v-if="laundryDetailFlag"> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="学生id：" label-width="120px">{{ (laundryDetail.studentId!=null?laundryDetail.studentId:'暂无数据') }}</el-form-item>
            <el-form-item label="学生姓名：" label-width="120px">{{ (laundryDetail.studentName!=null?laundryDetail.studentName:'暂无数据') }}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="学生备注：" label-width="120px">{{(laundryDetail.remark!=null?laundryDetail.remark:'暂无数据')}}</el-form-item>
            <el-form-item label="学生地址：" label-width="120px">{{ (laundryDetail.address!=null?laundryDetail.address:'暂无数据') }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="衣物类型：" label-width="120px">
              <!-- <div v-if="laundryDetail.clothesType == 0">普通衣物</div> -->
              <div v-for="dict in clothesTypeOptions">
                    <span v-if= "dict.dictValue === laundryDetail.clothesType">{{dict.dictLabel}}</span>
                    <span v-if=" laundryDetail.clothesType===null">暂无数据</span>
              </div>
            </el-form-item>
            <el-form-item label="清洗类型：" label-width="120px">
              <div v-for="dict in washTypeOptions">
                    <span v-if= "dict.dictValue === laundryDetail.washType">{{dict.dictLabel}}</span>
                    <span v-if=" laundryDetail.washType===null">暂无数据</span>
              </div>
              <!-- <div v-if="laundryDetail.washType == 0">正常洗</div>
              <div v-else-if="laundryDetail.washType == 1">干洗</div>
              <div v-else>暂无数据</div> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单状态：" label-width="120px">
              <div v-if="laundryDetail.status == 0">下单</div>
              <div v-else-if="laundryDetail.status == 1">支付</div>
              <div v-else-if="laundryDetail.status == 2">接单</div>
              <div v-else-if="laundryDetail.status == 3">清洗</div>
              <div v-else-if="laundryDetail.status == 4">派送</div>
              <div v-else-if="laundryDetail.status == 4">收获</div>
              <div v-else>暂无数据</div>
            </el-form-item>
            <el-form-item label="费用:" label-width="113px">{{(laundryDetail.fee!=null?laundryDetail.fee:'暂无数据')}}</el-form-item>
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
       <div class="detail1" v-if="washFlag">清洗人员信息：</div>
       <div class="detail2" v-if="!washFlag">清洗人员暂无信息：</div>
      <el-form ref="form"  :model="userWash" label-width="100px" size="mini" class="content" v-if="washFlag"> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="清洗人员id：" label-width="120px">{{(userWash.userId!=null?userWash.userId:'暂无数据')}}</el-form-item>
            <el-form-item label="清洗人员姓名：" label-width="120px">{{(userWash.userName!=null?userWash.userName:'暂无数据')}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="清洗人员电话：" label-width="120px">{{(userWash.phonenumber!=null?userWash.phonenumber:'暂无数据')}}</el-form-item>
            <el-form-item label="清洗人员邮箱：" label-width="120px">{{(userWash.email!=null?userWash.email:'暂无数据') }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="清洗人员性别：" label-width="120px">
              <div v-if="userWash.sex== 0">男</div>
              <div v-else-if="userWash.sex == 1">女</div>
               <div v-else>暂无数据</div>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="清洗人员备注：" label-width="120px">{{(userWash.remark!=null?userWash.remark:'暂无数据')}}</el-form-item>
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
import { listLaundry, getLaundry, delLaundry, addLaundry, updateLaundry, exportLaundry } from "@/api/activity/wash";
import store from "@/store";

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
      uId: store.getters.uId,
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
       laundryDetail:{},
       updateParams:{},
       updateValue:'',
       userDelivery:{},
       userWash:{},
       deliveryFlag:true,
       laundryDetailFlag:true,
       washFlag:true

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
         var arr=[];
        var res=response.rows;;
        res.forEach((item)=>{
          if(item.status=='1'||item.status=='2'||item.status=='3'){
            item.flag=true;
            if(item.status=='1'){
              this.updateValue='接单';
            }
            else if(item.status=='2'){
              this.updateValue='清洗';
            }
            else{
              this.updateValue='派送';
            }
          }
          else{
            item.flag=false;
          }
          arr.push(item);
        })
        this.laundryList = arr;
        // this.laundryList = response.rows;
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
        remark: null,
        
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
       this.updateParams.laundryId=row.laundryId;
      if(row.status=='1'){
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
      if(row.status=='2'){
         this.updateParams.status='3';
         this.updateParams.userWashId = this.uId;
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
       if(row.status=='3'){
         this.updateParams.status='4';
         this.updateParams.userDeliveryId = this.uId;
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
    },
     handleDetail(row) {
      getLaundry(row.laundryId).then(response => {
         this.laundryDetail=response.data;
         this.userDelivery=this.laundryDetail.userDelivery;
         this.userWash=this.laundryDetail.userWash;
         this.open1 = true; 
         if(this.userDelivery==null){
           this.deliveryFlag=false;
         }
         if(this.laundryDetail==null){
           this.laundryDetailFlag=false;
         }
         if(this.userWash==null){
           this.washFlag=false;
         }
      });
    },
    cancel1() {
      this.open1 = false;
    },
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