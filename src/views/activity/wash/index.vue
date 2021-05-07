<template>
  <!-- <div class="app-container"> -->
     <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="学生Id" prop="studentId"  label-width="150px">
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入学生Id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="配送地址id" prop="addressId"  label-width="150px">
        <el-input
          v-model="queryParams.addressId"
          placeholder="请输入配送地址id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="清洗类型" prop="washType"  label-width="150px">
          <el-select v-model="queryParams.washType" placeholder="请选择清洗类型" clearable size="small">
          <el-option
            v-for="dict in washTypeOptions"
             :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="衣物类型" prop="clothesType"  label-width="150px">
        <el-select v-model="queryParams.clothesType" placeholder="请选择衣物类型" clearable size="small">
          <el-option
            v-for="dict in clothesTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="衣物数量" prop="clothesNumber"  label-width="150px">
        <el-input
          v-model="queryParams.clothesNumber"
          placeholder="请输入衣物数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金额" prop="fee"  label-width="150px">
        <el-input
          v-model="queryParams.fee"
          placeholder="请输入金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="清洗订单状态" prop="status"  label-width="150px">
        <el-select v-model="queryParams.status" placeholder="请选择清洗订单状态" clearable size="small">
           <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="接单员工id" prop="userTakeId"  label-width="150px">
        <el-input
          v-model="queryParams.userTakeId"
          placeholder="请输入接单员工id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接衣服员工id" prop="userFetchId"  label-width="150px">
        <el-input
          v-model="queryParams.userFetchId"
          placeholder="请输入接衣服员工id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="配送衣服员工id" prop="userDeliveryId"  label-width="150px">
        <el-input
          v-model="queryParams.userDeliveryId"
          placeholder="请输入配送衣服员工id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="清洗衣服员工id" prop="userWashingId"  label-width="150px">
        <el-input
          v-model="queryParams.userWashingId"
          placeholder="请输入清洗衣服员工id"
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

    <el-row :gutter="10" class="mb8">
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="washingList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="洗衣Id" align="center" prop="washingId" />
      <el-table-column label="学生Id" align="center" prop="studentId" />
      <el-table-column label="配送地址id" align="center" prop="addressId" show-overflow-tooltip="true"/>
      <!-- <el-table-column label="清洗类型" align="center" prop="washType" />
      <el-table-column label="衣物类型" align="center" prop="clothesType" /> -->
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
      <el-table-column label="金额" align="center" prop="fee" />
      <el-table-column label="学生备注" align="center" prop="studentRemark" show-overflow-tooltip="true"/>
      <el-table-column label="清洗订单状态" align="center">
              <template slot-scope="scope">
                <div v-for="dict in statusOptions">
                  <span v-if= "dict.dictValue === scope.row.status">{{dict.dictLabel}}</span>
                </div>
              </template>
      </el-table-column>
      <el-table-column label="接单员工id" align="center" prop="userTakeId" />
      <el-table-column label="接衣服员工id" align="center" prop="userFetchId" />
      <el-table-column label="配送衣服员工id" align="center" prop="userDeliveryId" />
      <el-table-column label="清洗衣服员工id" align="center" prop="userWashingId" />
      <el-table-column label="备注" align="center" prop="remark" show-overflow-tooltip="true"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200px">
        <template slot-scope="scope">
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
      <!-- 洗衣详情对话框 -->
     <el-dialog title="洗衣详情" :visible.sync="open1" width="700px" append-to-body>
      <el-form ref="form" :model="laundryDetail" label-width="100px" size="mini" class="content" v-if="laundryDetailFlag"> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="学生id：" label-width="120px" v-if="laundryDetail.studentId">{{laundryDetail.studentId}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学生姓名：" label-width="120px"  v-if="laundryDetail.studentName">{{ laundryDetail.studentName }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学生备注：" label-width="120px" v-if="laundryDetail.remark">{{laundryDetail.remark}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="学生地址：" label-width="120px"  v-if="laundryDetail.address">{{laundryDetail.address}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="衣物类型：" label-width="120px" v-if=" laundryDetail.clothesType">
              <div v-for="dict in clothesTypeOptions">
                    <span v-if= "dict.dictValue === laundryDetail.clothesType">{{dict.dictLabel}}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="清洗类型：" label-width="120px" v-if=" laundryDetail.washType">
              <div v-for="dict in washTypeOptions">
                    <span v-if= "dict.dictValue === laundryDetail.washType">{{dict.dictLabel}}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单状态：" label-width="120px"  v-if=" laundryDetail.status">
               <div v-for="dict in statusOptions">
                    <span v-if= "dict.dictValue === laundryDetail.status">{{dict.dictLabel}}</span>
              </div>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="费用:" label-width="113px" v-if=" laundryDetail.fee">{{laundryDetail.fee}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="派送人员id：" label-width="120px" v-if=" laundryDetail.userDelivery&&laundryDetail.userDelivery.userId">{{ laundryDetail.userDelivery.userId}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="派送人员姓名：" label-width="120px" v-if=" laundryDetail.userDelivery&&laundryDetail.userDelivery.userName">{{laundryDetail.userDelivery.userName}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="派送人员电话：" label-width="120px" v-if=" laundryDetail.userDelivery&&laundryDetail.userDelivery.phonenumber">{{laundryDetail.userDelivery.phonenumber}}</el-form-item>
          </el-col>
         <el-col :span="12">
            <el-form-item label="派送人员邮箱：" label-width="120px"  v-if=" laundryDetail.userDelivery&&laundryDetail.userDelivery.email">{{ laundryDetail.userDelivery.email}}</el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item label="派送人员性别：" label-width="120px"  v-if=" laundryDetail.userDelivery&&laundryDetail.userDelivery.sex">
              <div v-for="dict in userSexOptions"  >
                  <span v-if= "dict.dictValue ===laundryDetail.userDelivery.sex">{{dict.dictLabel}}</span>
                </div>
            </el-form-item>
           </el-col>
           <el-col :span="12">
            <el-form-item label="派送人员备注：" label-width="120px" v-if=" laundryDetail.userDelivery&&laundryDetail.userDelivery.remark">{{laundryDetail.userDelivery.remark}}</el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="接衣人员id：" label-width="120px" v-if=" laundryDetail.userPike&&laundryDetail.userPike.userId">{{laundryDetail.userPike.userId}}</el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item label="接衣人员姓名：" label-width="120px" v-if=" laundryDetail.userPike&&laundryDetail.userPike.userName">{{laundryDetail.userPike.userName}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="接衣人员电话：" label-width="120px" v-if=" laundryDetail.userPike&&laundryDetail.userPike.phonenumber">{{laundryDetail.userPike.phonenumber}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接衣人员邮箱：" label-width="120px"  v-if=" laundryDetail.userPike&&laundryDetail.userPike.email">{{laundryDetail.userPike.email}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接衣人员性别：" label-width="120px"  v-if=" laundryDetail.userPike&&laundryDetail.userPike.sex">
              <div v-for="dict in userSexOptions"  >
                  <span v-if= "dict.dictValue ===laundryDetail.userPike.sex">{{dict.dictLabel}}</span>
                </div>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="接衣人员备注：" label-width="120px" v-if=" laundryDetail.userPike&&laundryDetail.userPike.remark">{{laundryDetail.userPike.remark}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="清洗人员id：" label-width="120px" v-if=" laundryDetail.userWash&&laundryDetail.userWash.userId">{{laundryDetail.userWash.userId}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="清洗人员姓名：" label-width="120px" v-if=" laundryDetail.userWash&&laundryDetail.userWash.userName">{{laundryDetail.userWash.userName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="清洗人员电话：" label-width="120px" v-if=" laundryDetail.userWash&&laundryDetail.userWash.phonenumber">{{laundryDetail.userWash.phonenumber}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="清洗人员邮箱：" label-width="120px"  v-if=" laundryDetail.userWash&&laundryDetail.userWash.email">{{laundryDetail.userWash.email}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="清洗人员性别：" label-width="120px"  v-if=" laundryDetail.userWash&&laundryDetail.userWash.sex">
               <div v-for="dict in userSexOptions"  >
                  <span v-if= "dict.dictValue ===laundryDetail.userWash.sex">{{dict.dictLabel}}</span>
                </div>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="清洗人员备注：" label-width="120px"  v-if=" laundryDetail.userWash&&laundryDetail.userWash.remark">{{laundryDetail.userWash.remark}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="取消时间：" label-width="120px" v-if="laundryDetail.cancelTime">{{parseTime(laundryDetail.cancelTime, '{y}-{m}-{d}') }}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="创建时间：" label-width="120px" v-if="laundryDetail.createTime">{{parseTime(laundryDetail.createTime, '{y}-{m}-{d}') }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="派送时间：" label-width="120px" v-if="laundryDetail.deliveryTime">{{parseTime(laundryDetail.deliveryTime, '{y}-{m}-{d}')}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="完成时间：" label-width="120px" v-if="laundryDetail.finishTime">{{parseTime(laundryDetail.finishTime, '{y}-{m}-{d}')}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付时间：" label-width="120px" v-if="laundryDetail.payTime">{{parseTime(laundryDetail.payTime, '{y}-{m}-{d}')}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="清洗时间：" label-width="120px" v-if="laundryDetail.washingTime">{{parseTime(laundryDetail.washingTime, '{y}-{m}-{d}')}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="接衣时间：" label-width="120px" v-if="laundryDetail.takeTime">{{parseTime(laundryDetail.takeTime, '{y}-{m}-{d}')}}</el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="更新时间：" label-width="120px" v-if="laundryDetail.updateTime">{{parseTime(laundryDetail.updateTime, '{y}-{m}-{d}')}}</el-form-item>
          </el-col>
        </el-row>
      </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="open1 = false">关 闭</el-button>
      </div>
    </el-dialog>
   
  </div>
    <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="学生id" prop="studentId" label-width="150px" >
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入学生id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item label="衣物数量" prop="clothesNumber" label-width="150px" >
        <el-input
          v-model="queryParams.clothesNumber"
          placeholder="请输入衣物数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table v-loading="loading" :data="laundryList" @selection-change="handleSelectionChange">
      <el-table-column label="洗衣订单Id" align="center" prop="laundryId" />
      <el-table-column label="学生id" align="center" prop="studentId" />
      <el-table-column label="配送地址信息" align="center" prop="addressId" />
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
     <!-- <el-dialog title="洗衣详情" :visible.sync="open1" width="700px" append-to-body>
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
       <div class="detail1" v-if="pikeFlag">接衣人员信息：</div>
       <div class="detail2" v-if="!pikeFlag">接衣人员暂无信息：</div>
      <el-form ref="form"  :model="userPike" label-width="100px" size="mini" class="content" v-if="pikeFlag"> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="接衣人员id：" label-width="120px">{{(userPike.userId!=null?userPike.userId:'暂无数据')}}</el-form-item>
            <el-form-item label="接衣人员姓名：" label-width="120px">{{(userPike.userName!=null?userPike.userName:'暂无数据')}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接衣人员电话：" label-width="120px">{{(userPike.phonenumber!=null?userPike.phonenumber:'暂无数据')}}</el-form-item>
            <el-form-item label="接衣人员邮箱：" label-width="120px">{{(userPike.email!=null?userPike.email:'暂无数据') }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接衣人员性别：" label-width="120px">
              <div v-if="userPike.sex== 0">男</div>
              <div v-else-if="userPike.sex == 1">女</div>
               <div v-else>暂无数据</div>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="接衣人员备注：" label-width="120px">{{(userPike.remark!=null?userPike.remark:'暂无数据')}}</el-form-item>
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
    </el-dialog> -->
  <!-- </div> -->
</template>

<script>
import { listWashing, getWashing, delWashing, addWashing,editWashingStatus,editTakeStatus,editFetchStatus,editDeliveryStatus, exportWashing,editCancelStatus } from "@/api/activity/washing";
import store from "@/store";
export default {
  name: "Washing",
  data() {
    return {
       laundryDetail:{},
       laundryDetailFlag:false,
       open1: false,
       uId: store.getters.uId,
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
      // 洗衣订单表格数据
      washingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      updateParams:{},
      cancelParams:{},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        studentId: null,
        addressId: null,
        washType: null,
        clothesType: null,
        clothesNumber: null,
        fee: null,
        studentRemark: null,
        status: null,
        userTakeId: null,
        userFetchId: null,
        userDeliveryId: null,
        userWashingId: null,
        payTime: null,
        takeTime: null,
        fetchTime: null,
        washingTime: null,
        deliveryTime: null,
        finishTime: null,
        cancelTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        studentId: [
          { required: true, message: "学生Id不能为空", trigger: "blur" }
        ],
        addressId: [
          { required: true, message: "配送地址id不能为空", trigger: "blur" }
        ],
        washType: [
          { required: true, message: "清洗类型不能为空", trigger: "change" }
        ],
        clothesType: [
          { required: true, message: "衣物类型不能为空", trigger: "change" }
        ],
        clothesNumber: [
          { required: true, message: "衣物数量不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "清洗订单状态不能为空", trigger: "blur" }
        ],
        delFlag: [
          { required: true, message: "删除标志不能为空", trigger: "blur" }
        ]
      },
      clothesTypeOptions:[],
       washTypeOptions: [],
       userSexOptions:[],
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
    this.getDicts("sys_washing_status").then(response => {
      this.statusOptions = response.data;
    });
     this.getDicts("sys_user_sex").then(response => {
      this.userSexOptions = response.data;
    });
  },
  methods: {
    /** 查询洗衣订单列表 */
    getList() {
      this.loading = true;
      listWashing(this.queryParams).then(response => {
        var arr=[];
        var res=response.rows;;
        res.forEach((item)=>{
          if(item.status=='1'||item.status=='2'||item.status=='3'||item.status=='4'){
            item.flag=true;
            if(item.status=='1'){
              item.cancelFlag=true;
              item.updateValue='接单';
            }
            else if(item.status=='2'){
              item.cancelFlag=true;
              item.updateValue='取件';
            }
            else if(item.status=='3'){
              item.updateValue='清洗';
            }
            else{
              item.updateValue='派送';
            }
          }
          else{
            item.flag=false;
            if(item.status=='0'){
               item.cancelFlag=true;
            }
           
          }
          arr.push(item);
        })
        this.washingList = arr;
        this.total = response.total;
        this.loading = false
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
        washingId: null,
        studentId: null,
        addressId: null,
        washType: null,
        clothesType: null,
        clothesNumber: null,
        fee: null,
        studentRemark: null,
        status: "0",
        userTakeId: null,
        userFetchId: null,
        userDeliveryId: null,
        userWashingId: null,
        payTime: null,
        takeTime: null,
        fetchTime: null,
        washingTime: null,
        deliveryTime: null,
        finishTime: null,
        cancelTime: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        delFlag: null
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
      this.ids = selection.map(item => item.washingId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加洗衣订单";
    },
     //取消订单
    handleCancel(row){
      this.cancelParams.washingId=row.washingId;
       editCancelStatus(this.cancelParams).then(response => {
          this.msgSuccess("取消订单成功");
          this.getList();
       })
    },
    /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.reset();
    //   const washingId = row.washingId || this.ids
    //   getWashing(washingId).then(response => {
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改洗衣订单";
    //   });
    // },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.washingId != null) {
            updateWashing(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWashing(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
         handleDetail(row) {
       this.laundryDetailFlag=true;
      getWashing(row.washingId).then(response => {
         this.laundryDetail=response.data;
         this.open1 = true; 
         if(this.laundryDetail==null){
           this.laundryDetailFlag=false;
         }
      });
    },

         /** 修改按钮操作 */
    handleUpdate(row) {
       this.updateParams.washingId=row.washingId;
      if(row.status=='1'){
         this.updateParams.status='2';
         var Params= this.updateParams;
          this.$confirm('是否确认修改为接单状态?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return  editTakeStatus(Params);
        }).then(() => {
           this.msgSuccess("修改成功");
           this.getList();
        })
         
      }
      if(row.status=='2'){
         this.updateParams.status='3';
         this.updateParams.userFetchId = this.uId;
         var Params= this.updateParams;
          this.$confirm('是否确认修改为取件状态?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return  editFetchStatus(Params);
        }).then(() => {
           this.msgSuccess("修改成功");
           this.getList();
        })
        
      }
       if(row.status=='3'){
         this.updateParams.status='4';
         this.updateParams.userWashingId = this.uId;
         var Params= this.updateParams;
          this.$confirm('是否确认修改为清洗状态?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return  editWashingStatus(Params);
        }).then(() => {
           this.msgSuccess("修改成功");
           this.getList();
        })
        
      }
       if(row.status=='4'){
         this.updateParams.status='5';
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
  }
};
// import { listLaundry, getLaundry, delLaundry, addLaundry, updateLaundry, exportLaundry } from "@/api/activity/wash";
// import store from "@/store";

// export default {
//   name: "Laundry",
//   data() {
//     return {
//       // 遮罩层
//       loading: true,
//       // 选中数组
//       ids: [],
//       // 非单个禁用
//       single: true,
//       // 非多个禁用
//       multiple: true,
//       // 显示搜索条件
//       showSearch: true,
//       uId: store.getters.uId,
//       // 总条数
//       total: 0,
//       // 洗衣订单信息表格数据
//       laundryList: [],
//       // 弹出层标题
//       title: "",
//       // 是否显示弹出层
//       open1: false,
//       // 查询参数
//       queryParams: {
//         pageNum: 1,
//         pageSize: 10,
//         studentId: null,
//         addressId: null,
//         userWashId: null,
//         userDeliveryId: null,
//         userPikeId: null,
//         clothesType: null,
//         washType: null,
//         clothesNumber: null,
//         customerRemark: null,
//         status: null,
//         fee: null,
//       },
//       // 表单参数
//       form: {},
//       // 表单校验
//       rules: {
//         studentId: [
//           { required: true, message: "学生id不能为空", trigger: "blur" }
//         ],
//         addressId: [
//           { required: true, message: "配送地址信息不能为空", trigger: "blur" }
//         ],
//       },
//        clothesTypeOptions:[],
//        washTypeOptions: [],
//        statusOptions:  [],
//        laundryDetail:{},
//        updateParams:{},
//        userDelivery:{},
//        userWash:{},
//        userPike:{},
//        deliveryFlag:true,
//        laundryDetailFlag:true,
//        washFlag:true,
//        pikeFlag:true,

//     };
//   },
//   created() {
//     this.getList();
//     this.getDicts("sys_clothes_type").then(response => {
//       this.clothesTypeOptions = response.data;
//     });
//     this.getDicts("sys_wash_type").then(response => {
//       this.washTypeOptions = response.data;
//     });
//     this.getDicts("sys_order_type").then(response => {
//       this.statusOptions = response.data;
//     });
//   },
//   methods: {
//     /** 查询洗衣订单信息列表 */
//     getList() {
//       this.loading = true;
//       listLaundry(this.queryParams).then(response => {
//          var arr=[];
//         var res=response.rows;;
//         res.forEach((item)=>{
//           if(item.status=='1'||item.status=='2'||item.status=='3'){
//             item.flag=true;
//             if(item.status=='1'){
//               item.updateValue='接单';
//             }
//             else if(item.status=='2'){
//               item.updateValue='清洗';
//             }
//             else{
//               item.updateValue='派送';
//             }
//           }
//           else{
//             item.flag=false;
//           }
//           arr.push(item);
//         })
//         this.laundryList = arr;
//         this.total = response.total;
//         this.loading = false
//       })},
//     // 取消按钮
//     cancel() {
//       this.open = false;
//       this.reset();
//     },
//     // 表单重置
//     reset() {
//       this.form = {
//         laundryId: null,
//         studentId: null,
//         addressId: null,
//         userWashId: null,
//         userDeliveryId: null,
//         userPikeId: null,
//         clothesType: null,
//         washType: null,
//         clothesNumber: null,
//         customerRemark: null,
//         status: "0",
//         fee: null,
//         createBy: null,
//         createTime: null,
//         updateBy: null,
//         updateTime: null,
//         remark: null,
        
//       };
//       this.resetForm("form");
//     },
//     /** 搜索按钮操作 */
//     handleQuery() {
//       this.queryParams.pageNum = 1;
//       this.getList();
//     },
//     /** 重置按钮操作 */
//     resetQuery() {
//       this.resetForm("queryForm");
//       this.handleQuery();
//     },
   
//     /** 修改按钮操作 */
//     handleUpdate(row) {
//        this.updateParams.laundryId=row.laundryId;
//       if(row.status=='1'){
//          this.updateParams.status='2';
//          var Params= this.updateParams;
//           this.$confirm('是否确认修改为接单状态?', "提示", {
//           confirmButtonText: "确定",
//           cancelButtonText: "取消",
//           type: "warning"
//         }).then(function() {
//           return  updateLaundry(Params);
//         }).then(() => {
//            this.msgSuccess("修改成功");
//            this.getList();
//         })
         
//       }
//       if(row.status=='2'){
//          this.updateParams.status='3';
//          this.updateParams.userWashId = this.uId;
//          var Params= this.updateParams;
//           this.$confirm('是否确认修改为清洗状态?', "提示", {
//           confirmButtonText: "确定",
//           cancelButtonText: "取消",
//           type: "warning"
//         }).then(function() {
//           return  updateLaundry(Params);
//         }).then(() => {
//            this.msgSuccess("修改成功");
//            this.getList();
//         })
        
//       }
//        if(row.status=='3'){
//          this.updateParams.status='4';
//          this.updateParams.userDeliveryId = this.uId;
//          var Params= this.updateParams;
//           this.$confirm('是否确认修改为派送状态?', "提示", {
//           confirmButtonText: "确定",
//           cancelButtonText: "取消",
//           type: "warning"
//         }).then(function() {
//           return  updateLaundry(Params);
//         }).then(() => {
//            this.msgSuccess("修改成功");
//            this.getList();
//         })
        
//       }
//     },
//      handleDetail(row) {
//        this.deliveryFlag=true;
//        this.laundryDetailFlag=true;
//        this.washFlag=true;
//         this.pikeFlag=true;
//       getLaundry(row.laundryId).then(response => {
//          this.laundryDetail=response.data;
//          this.userDelivery=this.laundryDetail.userDelivery;
//          this.userWash=this.laundryDetail.userWash;
//          this.userPike=this.laundryDetail.userPike;
//          this.open1 = true; 
//          if(this.userDelivery==null){
//            this.deliveryFlag=false;
//          }
//          if(this.laundryDetail==null){
//            this.laundryDetailFlag=false;
//          }
//          if(this.userWash==null){
//            this.washFlag=false;
//          }
//           if(this.userPike==null){
//            this.pikeFlag=false;
//          }
//       });
//     },
//     cancel1() {
//       this.open1 = false;
//     },
//   }
// };
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