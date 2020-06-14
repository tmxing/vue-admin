<template>
  <div class="container" style="padding:1.5em">
    <el-button  style="margin-right:1em" type="primary" @click="addWaiterHandler">添加</el-button>
    <el-button type="danger" @click="batchDeleteHandler">批量删除</el-button>
    <!-- 顾客数据 -->
    <el-table
      :header-cell-style="styleSet"
      :cell-style="styleSet"
      :data="waiters.list"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="realname"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="电话号码">
      </el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
        width="200">
        <template v-slot="slot">
            <div>{{slot.row.idCard?slot.row.idCard:'还未进行实名验证'}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="bankCard"
        label="银行卡号"
        width="200">
        <template v-slot="slot">
            <div>{{slot.row.bankCard?slot.row.bankCard:'还未绑定卡号'}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="registerTime"
        label="注册时间"
        width="95">
        <template v-slot="slot">
            <div>{{slot.row.registerTime | dateFormat}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="slot">
          <a href="" @click.prevent='deleteHandler(slot.row.id)' >删除</a>
          <a href="" @click.prevent='detailHandler(slot.row.id)'>详情</a>
        </template>
      </el-table-column>
    </el-table>
     <!-- 编辑模态框 -->
    <el-dialog title="员工详细信息" :visible.sync="waiter_visible">
      <el-form :model="waiter_form">
        <el-form-item label="姓名" :label-width="formLabelWidth" :required="true">
          <el-input v-model="waiter_form.realname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" :required="true">
          <el-input v-model="waiter_form.telephone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="省份" :label-width="formLabelWidth" :required="true">
          <el-input v-model="waiter_form.province" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth" :required="true">
          <el-input v-model="waiter_form.city" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-input v-model="waiter_form.area" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" :required="true">
          <el-select v-model="waiter_form.status" placeholder="请选择状态">
            <el-option label="禁用" value="禁用" />
            <el-option label="启用" value="启用" />
          </el-select>
        </el-form-item>
        <el-form-item label="银行卡号" :label-width="formLabelWidth" :required="true">
          <el-input v-model="waiter_form.bankCard" autocomplete="off" />
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth" :required="true">
          <el-input v-model="waiter_form.idCard" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="注册时间" :label-width="formLabelWidth" :required="true">
          <el-input v-model="waiter_form.registerTime"  autocomplete="off"/>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="waiter_visible = false">取 消</el-button>
        <el-button type="primary" @click="saveHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
        background
        layout="prev, pager, next"
        :total="waiters.total"
        :page-size="waiters.pageSize"
        :current-page="waiters.page + 1"
        @current-change="changePage"
    />
  </div>
</template>

<script>
import moment from 'moment'
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return {
            params:{
                page:0,
                pageSize:10
            },
            waiter_visible:false,
            formLabelWidth:'120px',
            waiter_form:{},
            deleteIds:[]

        }
    },
    created(){
        this.findAllWaiters(this.params);
    },
    watch:{
        params:{
            handler(){
                this.findAllWaiters(this.params)
            },
            deep:true
        }
    },
    computed:{
        ...mapState('waiter',['waiters'])
    },
    methods:{
        ...mapActions('waiter',['findAllWaiters','addWaiter','deleteWaiter','deleteBatchWaiter']),
        // 添加
        addWaiterHandler(){
            this.waiter_form = {};
            this.waiter_visible = true;
        },
        // 保存编辑
        saveHandler(){
            this.waiter_form.username = 'waiter'
            this.waiter_form.username =  this.waiter_form.realname;
            if(this.waiter_form.status == '启用')  this.enabled==true;
            else if(this.waiter_form.status = '禁用') this.enabled=false;
            this.waiter_form.money = 0;

            this.addWaiter(this.waiter_form).then((res)=>{
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
                this.waiter_visible = false;
                this.findAllWaiters(this.params)
                this.waiter_form = {};
            });
        },
        // 编辑  显示模态框
        detailHandler(id){
            this.$router.push({
              path:'/waiter/list',
              query:{id}
            })
        },
        // 批量删除
        batchDeleteHandler(){
            this.deleteBatchWaiter(this.deleteIds).then(()=>{
                 this.$message({
                    message: '批量删除成功',
                    type: 'success'
                });
                this.findAllWaiters(this.params)
            })
        },
        // 获取需要批量删除的所有员工id
        handleSelectionChange(val){
            this.deleteIds = []
            for(let item in val){
                this.deleteIds.push(val[item].id)
            }
        },
        // 单个删除
        deleteHandler(id){
            this.deleteWaiter(id).then(()=>{
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
                this.findAllWaiters(this.params)
            })
        },
        // 分页
        changePage(page){
            this.params.page = page-1;
        },
        styleSet(){
            return 'text-align:center';
        },
    }
}
</script>

<style scoped>
    a{
        color: rgba(0, 51, 255, 0.647058823529412);
    }
</style>