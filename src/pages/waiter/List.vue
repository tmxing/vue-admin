<template>
  <div class="detail" style="padding:1.5em">
    <el-page-header @back="goBack" title="返回"></el-page-header>
    <el-tabs type="border-card" style="margin-top:1em">
        <el-tab-pane class="basicInfo" label="员工基本信息">
           <div><img :src="waiterInfo.imgPhoto" alt="" style="width:150px;border-radius:20%"></div>
           <div>员工姓名：{{waiterInfo.realname}}</div>
           <div>电话：{{waiterInfo.telephone}}</div>
           <div>注册时间：{{waiterInfo.registerTime | dateFormat}}</div>
           <div>性别：{{waiterInfo.gender}}</div>
           <div>员工状态：{{waiterInfo.status}}</div>
           <div>银行卡号：{{waiterInfo.bankCard?waiterInfo.bankCard:'无'}}</div>
           <div>员工地址：{{waiterInfo.province}}-{{waiterInfo.city}}</div>
        </el-tab-pane>
        <el-tab-pane class="orderInfo" label="员工订单信息">
            <div   v-for="item in waiterOrder" :key="item.id" > 
                <div>订单编号：{{item.orderId}}</div>
                <div>客户名：{{item.customerName}}</div>
                <div>员工名：{{item.waiterName}}</div>
                <div>订单地址：{{item.address}}</div>
                <div>订单数量：{{item.total}}</div>
                <div>下单时间：{{item.orderTime | dateFormat}}</div>
            </div>
        </el-tab-pane>
        <el-tab-pane class="moneyInfo"  label="员工收益">
            <div v-for="item in waiterMoney" :key="item.id" > 
                <div>用户ID：{{item.userId}}</div>
                <div>类型：{{item.type}}</div>
                <div>收益：￥{{item.money}}</div>
                <div>提现账号：{{item.transferAccounts}}</div>
                <div>收益描述：{{item.description}}</div>
                <div>处理时间：{{item.transactionTime | dateFormat}}</div>
            </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    created(){
        this.basicWaiterInfo(this.$route.query.id) 
        this.basicWaiterOrder(this.$route.query.id)
        this.basicWaiterMoney(this.$route.query.id)
    },
    computed:{
        ...mapState('waiter',['waiterInfo','waiterOrder','waiterMoney'])
    },
    methods:{
        ...mapActions('waiter',['basicWaiterInfo','basicWaiterOrder','basicWaiterMoney']),
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
    .detail{
        font-family: '微软雅黑';
    }
    .detail .basicInfo div{
        margin-left: 2em;
        margin-top: 1em;
    }
    .detail .orderInfo>div,
    .detail .moneyInfo>div{
        border-bottom: 1px solid #333333;
        padding: 1em;
    }
    .detail .orderInfo>div div,
    .detail .moneyInfo>div div{
        margin-top: .5em;
    }
</style>