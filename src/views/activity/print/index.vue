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
      <el-form-item label="打印员工Id" prop="printId" label-width="100px" >
        <el-input
          v-model="queryParams.printId"
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
            :value="dict.dictLabel"
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
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table v-loading="loading" :data="printList" @selection-change="handleSelectionChange">
      <el-table-column label="学生Id" align="center" prop="studentId" />
      <el-table-column label="文件名" align="center" prop="fileName" show-overflow-tooltip="true"/>
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
                  <span v-if= "dict.dictValue === scope.row.paperSize">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      
        <el-table-column label="打印订单状态" align="center">
              <template slot-scope="scope">
                <div v-for="dict in printOptions">
                  <span v-if= "dict.dictValue === scope.row.status">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
        <el-table-column label="封面颜色" align="center">
              <template slot-scope="scope">
                <div v-for="dict in coverColorOptions">
                  <span v-if= "dict.dictValue === scope.row.coverColor">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      <el-table-column label="金额" align="center" prop="fee" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="250px">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="text"
           icon="el-icon-more"
            @click="handleDetail(scope.row)"
            v-hasPermi="['activity:print:edit']"
            v-if=""
          >详情</el-button>
         <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)" v-if="scope.row.flag">{{scope.row.updateValue}}</el-button>
          <el-button
           <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleCancel(scope.row)" v-if="scope.row.cancelFlag">取消订单</el-button>
          <el-button
          icon="el-icon-download"
          type="text"
          size="mini"
          @click="handleDownload(scope.row.fileUrl)"
        >下载</el-button>
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
    <el-dialog title="打印详情" :visible.sync="open1" width="700px" append-to-body>
      <el-form ref="form" :model="printDetail" label-width="100px" size="mini" class="content" v-if="printDetailFlag"> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="学生id：" label-width="120px"  v-if="printDetail.studentId">{{printDetail.studentId}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="学生姓名：" label-width="120px" v-if="printDetail.studentName">{{ printDetail.studentName}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="学生备注：" label-width="120px" v-if="printDetail.remark">{{printDetail.remark}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学生地址：" label-width="120px" v-if="printDetail.address">{{printDetail.address}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单双面标志：" label-width="120px"  v-if="printDetail.bothSideFlag">
              <div v-for="dict in bothSideOptions">
                    <span v-if= "dict.dictValue === printDetail.bothSideFlag">{{dict.dictLabel}}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="封胶标志：" label-width="120px" v-if="printDetail.sealingFlag">
               <div v-for="dict in sealingOptions">
                    <span v-if= "dict.dictValue === printDetail.sealingFlag">{{dict.dictLabel}}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单状态：" label-width="120px" v-if="printDetail.status">
               <template slot-scope="scope">
                <div v-for="dict in printOptions">
                  <span v-if= "dict.dictValue ===printDetail.status">{{dict.dictLabel}}</span>
                </div>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="彩印标志：" label-width="120px" v-if="printDetail.colorFlag">
               <div v-for="dict in colorOptions">
                  <span v-if= "dict.dictValue ===printDetail.colorFlag">{{dict.dictLabel}}</span>
                </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="封面颜色：" label-width="120px" v-if="printDetail.coverColor">
               <div v-for="dict in coverColorOptions">
                  <span v-if= "dict.dictValue ===printDetail.coverColor">{{dict.dictLabel}}</span>
                </div>
            </el-form-item>
          </el-col>
             <el-col :span="12">
          <el-form-item label="学生备注：" label-width="120px"  v-if="printDetail.fee">{{printDetail.fee}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="派送人员id：" label-width="120px" v-if="printDetail.userDelivery&&printDetail.userDelivery.userId">{{printDetail.userDelivery.userId}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="派送人员姓名：" label-width="120px" v-if="printDetail.userDelivery&&printDetail.userDelivery.userName">{{ printDetail.userDelivery.userName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="派送人员电话：" label-width="120px" v-if="printDetail.userDelivery&&printDetail.userDelivery.phonenumber">{{printDetail.userDelivery.phonenumber}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="派送人员邮箱：" label-width="120px"  v-if="printDetail.userDelivery&&printDetail.userDelivery.email">{{printDetail.userDelivery.email}}</el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item label="派送人员性别：" label-width="120px"  v-if="printDetail.userDelivery&&printDetail.userDelivery.sex">
              <div v-for="dict in userSexOptions">
                  <span  v-if= "dict.dictValue ===printDetail.userDelivery.sex">{{dict.dictLabel}}</span>
                </div>
            </el-form-item>
           </el-col>
           <el-col :span="12">
            <el-form-item label="派送人员备注：" label-width="120px" v-if="printDetail.userDelivery&&printDetail.userDelivery.remark">{{printDetail.userDelivery.remark}}</el-form-item>
            </el-col>
             <el-col :span="12">
            <el-form-item label="打印人员id：" label-width="120px" v-if="printDetail.userPrint&&printDetail.userPrint.userId">{{printDetail.userPrint.userId}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="打印人员姓名：" label-width="120px"  v-if="printDetail.userPrint&&printDetail.userPrint.userName">{{printDetail.userPrint.userName }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打印人员电话：" label-width="120px" v-if="printDetail.userPrint&&printDetail.userPrint.phonenumber">{{printDetail.userPrint.phonenumber}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="打印人员邮箱：" label-width="120px" v-if="printDetail.userPrint&&printDetail.userPrint.email">{{ printDetail.userPrint.email}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打印人员性别：" label-width="120px" v-if="printDetail.userPrint&&printDetail.userPrint.sex">
                <div v-for="dict in userSexOptions"  >
                  <span v-if= "dict.dictValue ===userPrint.sex">{{dict.dictLabel}}</span>
                </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打印人员备注：" label-width="120px" v-if="printDetail.userPrint&&printDetail.userPrint.remark">{{printDetail.userPrint.remark}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="取消时间：" label-width="120px" v-if="printDetail.cancelTime">{{timeChange(printDetail.cancelTime)}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="创建时间：" label-width="120px" v-if="printDetail.createTime">{{timeChange(printDetail.createTime)}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="派送时间：" label-width="120px" v-if="printDetail.deliveryTime">{{timeChange(printDetail.deliveryTime)}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="完成时间：" label-width="120px" v-if="printDetail.finishTime">{{timeChange(printDetail.finishTime)}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付时间：" label-width="120px" v-if="printDetail.payTime">{{timeChange(printDetail.payTime)}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="打印时间：" label-width="120px" v-if="printDetail.printTime">{{timeChange(printDetail.printTime)}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="打印时间：" label-width="120px" v-if="printDetail.updateTime">{{timeChange(printDetail.updateTime)}}</el-form-item>
          </el-col>
        </el-row>
      </el-form> 
      </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="open1 = false">关 闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listPrint, getPrint, delPrint, addPrint, updatePrint, exportPrint,editDeliveryStatus,editCancelStatus } from "@/api/activity/print";
import store from "@/store";

export default {
  name: "Print",
  data() {
    return {
      // 遮罩层
      loading: true,
      uId: store.getters.uId,
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
        printId: null,
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
       printDetailFlag:true,
        deliveryFlag:true,
        printFlag:true,
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
        options:{
          value1:'下单'
        },
        printOptions: [],
        bothSideOptions: [],
        colorOptions: [],
        sealingOptions: [],
        paperOptions: [],
        coverColorOptions: [],
        userSexOptions:[],
        printDetail:{},
         //修改参数
        updateParams:{},
        userDelivery:{},
        userPrint:{},
        //取消订单参数
        cancelParams:{},
        
        
    };
  },
  created() {
    this.getList();
     this.getDicts("sys_bothside_type").then(response => {
      this.bothSideOptions = response.data;
    });
    this.getDicts("sys_color_type").then(response => {
      this.colorOptions = response.data;
    });
    this.getDicts("sys_sealing_type").then(response => {
      this.sealingOptions = response.data;
    });
     this.getDicts("sys_paper_type").then(response => {
      this.paperOptions = response.data;
    });
  
     this.getDicts("sys_print_status").then(response => {
      this.printOptions = response.data;
    });
     this.getDicts("sys_cover_type").then(response => {
      this.coverColorOptions = response.data;
    });
      this.getDicts("sys_user_sex").then(response => {
      this.userSexOptions = response.data;
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
          // item.fileName= item.fileName.slice(0,3)+'...';
          if(item.status=='1'||item.status=='2'){
            item.cancelFlag=true;
            item.flag=true;
            if(item.status=='1'){
              item.updateValue='接单';
            }
            else{
              item.updateValue='派送';
            }
          }
          else{
             item.flag=false;
            if(item.status=='0'){
                item.cancelFlag=true;
            }else{
            item.cancelFlag=false};
           
          }
          arr.push(item);
        })
        
        this.printList = arr;
        this.total = response.total;
        this.loading = false;
      });
    },
    //取消订单
    handleCancel(row){
      this.cancelParams.printId=row.printId;
       editCancelStatus(this.cancelParams).then(response => {
          this.msgSuccess("取消订单成功");
          this.getList();
       })
        
       
      

    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
      cancel1() {
      this.open1 = false;
    },
    timeChange(UTCDateString) {
    if (!UTCDateString) {
      return '-';
    }
    function formatFunc(str) {
      return str > 9 ? str : '0' + str
    }
    var date2 = new Date(UTCDateString);
    console.log('时间', date2)
    var year = date2.getFullYear();
    var mon = formatFunc(date2.getMonth() + 1);
    var day = formatFunc(date2.getDate());
   
    var dateStr = year + '-' + mon + '-' + day ;
    return dateStr;
  },
    // 表单重置
    reset() {
      this.form = {
        printId: null,
        studentId: null,
        fileName: null,
        fileUrl: null,
        printId: null,
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
    handleDownload(url){
       try {
          var elemIF = document.createElement("iframe");
          elemIF.src = url;
          elemIF.style.display = "none";
          document.body.appendChild(elemIF);
        } catch (e) {
          alert("下载异常！");
        }
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
       this.updateParams.printId=row.printId;
      if(row.status=='1'){
        //  this.updateParams.status='2';
         this.updateParams.printId = row.printId;
         this.updateParams.userPrintId=this.uId;
          // this.updateParams.studentId=row.studentId;
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
      if(row.status=='2'){
        //  this.updateParams.status='3';
        this.updateParams.printId = row.printId;
         this.updateParams.userDeliveryId = this.uId;
         var Params= this.updateParams;
          this.$confirm('是否确认修改为派送状态?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return  editDeliveryStatus(Params);
        }).then(() => {
           this.msgSuccess("修改成功");
           this.getList();
        })
        
      }
    },
     handleDetail(row) {
       this.printDetailFlag=true;
       this.deliveryFlag=true;
       this.printFlag=true;
      getPrint(row.printId).then(response => {
         this.printDetail=response.data;
         this.userDelivery=this.printDetail.userDelivery;
         this.userPrint=this.printDetail.userPrint;
         this.open1 = true;
          if(this.printDetail==null){
            console.log("printDetail==null");
           this.printDetailFlag=false;
         }
         if(this.userDelivery==null){
           console.log("userDelivery==null");
           this.deliveryFlag=false;
         }
         if(this.userPrint==null){
           this.printFlag=false;
         }
      });
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