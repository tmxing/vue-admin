<template>
  <div class="container">
    <el-button type="danger" @click="batchDeleteHandler">批量删除</el-button>
    状态：<el-input v-model.lazy="params.status" placeholder="请输入内容" style="width:300px;"></el-input>
    <el-button type="btn_primary" @click="reset">重置</el-button>
    <!-- 顾客数据 -->
    <el-table
      :header-cell-style="styleSet"
      :cell-style="styleSet"
      :data="customers.list"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="120">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="realname"
        label="真实姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="电话号码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        width="160">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="slot">
          <a href="" @click.prevent='deleteHandler(slot.row.id)' >删除</a>
          <a href="" @click.prevent='detailHandler(slot.row.id)'>查看详情</a>
          <a href="" @click.prevent='editHandler(slot.row)'>编辑</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="customers.total"
      :current-page="customers.page+1"
      :page-size='customers.pageSize'
      @current-change="changePage">
    </el-pagination>
     <!-- 编辑模态框 -->
    <el-dialog title="修改顾客信息" :visible.sync="customer_visible">
      <el-form :model="customer_form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="customer_form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="customer_form.telephone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="customer_form.status" placeholder="请选择状态">
            <el-option label="禁用" value="false" />
            <el-option label="启用" value="true" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://134.175.100.63:5588/file/upload"
            :show-file-list="false"
            :on-success="successHandler"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="customer_visible = false">取 消</el-button>
        <el-button type="primary" @click="saveHandler">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    data(){
      return {
        imageUrl: '',
        formLabelWidth: '120px',
        customer_visible: false,
        customer_form: {
          type: 'customer'
        },
        params:{
          page:0,
          pageSize:10,
        },
        batchIds:[]
      }
    },
    watch:{
      params:{
        handler(){
          this.findAllCustomer(this.params);
        },
        deep:true
      },
      'params.status':function(now){
        if(now == ''){
          this.reset();
        }
      }
    },
    computed:{
      ...mapState('customer',['customers'])
    },
    created(){
      this.findAllCustomer(this.params);
    },
    methods:{
      ...mapActions('customer',['saveOrUpdate','batchDeleteCustomer','findAllCustomer','deleteCustomerById']),
       // 根据id删除
      deleteHandler(id){
        // console.log('删除')
        this.deleteCustomerById(id).then((res)=>{
          this.$message({
            message: "删除成功",
            type: 'success'
          });
          // 改善最后一页只有一条数据 分页效果
          if((this.customers.list.length-1)%this.customers.pageSize == 0){
            this.params.page -= 1;
            this.findAllCustomer(this.params)
          }
          this.findAllCustomer(this.params);
        });
      },
      // 批量删除
      batchDeleteHandler() {
        this.batchDeleteCustomer(this.batchIds).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          // 改善最后一页只有一条数据 分页效果
          if((this.customers.list.length-1)%this.customers.pageSize == 0){
            this.params.page -= 1;
            this.findAllCustomer(this.params)
          }
          this.findAllCustomer(this.params)
        })
      },
       // 获取批量删除的所有id
      handleSelectionChange(val){
        const res = val.map((item) => {
          return item.id
        })
        this.batchIds = res
      },
      // 编辑
      editHandler(row) {
        // 打开模态框
        this.customer_visible = true
        this.customer_form = row
        this.customer_form.id = row.id
        this.customer_form.username = row.username
        this.customer_form.telephone = row.telephone
        this.customer_form.status = row.status
        //   改变this.customer_form的引用地址
        this.customer_form = Object.assign({}, this.customer_form)
        // 用于显示当前顾客的头像
        this.imageUrl = row.imgPhoto
      },
       // 上传图片成功时的钩子函数
      successHandler(response) {
        // 修改头像时，改变页面显示的图片
        this.imageUrl = 'http://134.175.100.63:8686/group1/' + response.data.id
        this.customer_form.imgPhoto = 'http://134.175.100.63:8686/group1/' + response.data.id
        this.customer_form = Object.assign({}, this.customer_form)
      },
      // 保存编辑
      saveHandler() {
        this.saveOrUpdate(this.customer_form).then((res) => {
          this.$message({
            message: "修改成功",
            type: 'success'
          });
          //   更新数据
          this.findAllCustomer(this.params)
        })
        this.customer_visible = false
      },
      // 重置
      reset(){
        this.params = {
          page:0,
          pageSize:10
        }
        this.findAllCustomer(this.params);
      },
      // 分页查询顾客
      changePage(page){
        this.params.page = page-1;
      },
      // 顾客信息详情
      detailHandler(id){
        this.$router.push({
          path:'/customer/detail',
          // 路由传递数据  query显示在任务栏
          query:{customerId:id}
        })
      },
      styleSet(){
        return 'text-align:center';
      },
    }
}
</script>

<style scoped>
  /* >>> 表示深度选择器，用样式穿透 */ 
  .customer >>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .customer >>> .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .container{
    padding:20px 60px
  }
  a{
    margin: 0 6px;
    color: blue;
  }

</style>