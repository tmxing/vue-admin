<template>
    <div class="detail">
        <el-page-header @back="goBack" title="返回"></el-page-header>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <template>
                    <div class="baseInfo">
                        <div class="baseTop">
                            <img :src="detailCustomer.imgPhoto" alt="" style="width:150px;border-radius: 100%;">
                            <h2>{{detailCustomer.realname}}</h2>
                            <div>{{detailCustomer.province}}</div>
                        </div><br>
                        <div class="baseBottom">
                            <div>联系方式:&nbsp;{{detailCustomer.telephone}}</div>
                            <div>状态:&nbsp;{{detailCustomer.status}}</div>
                            <div>地址:&nbsp;{{detailCustomer.province}}&nbsp;—&nbsp;{{detailCustomer.city}}</div>
                        </div>
                    </div>
                </template>
            </el-tab-pane>
            <el-tab-pane label="订单信息" name="second">
                <template>
                    <div class="orderInfo">
                        <div class="order"  v-for="item in orderCustomer" :key="item.id">
                            <div class="orderTop">
                                 <span><img src="..\..\assets\order_images\u320.png" alt=""></span>
                                 <span>单号：{{item.orderId}}</span>  
                            </div>
                            <div class="orderBottom">
                                    <span>创建人：{{item.customerName}}</span>
                                    <!-- <span>订购产品：</span> -->
                                    &nbsp;&nbsp;&nbsp;<span>创建时间：{{orderDate(item.orderTime)}}</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>状态</span>
                                    <span>订单金额</span>
                                    <span>服务地址：{{item.address}}</span>
                                    <span>联系电话：{{detailCustomer.telephone}}</span>
                                
                                    <span style="font-weight:500;font-size:20px">{{item.waiterName?'已完成':'待完成'}}</span>
                                    <span style="font-weight:500;font-size:20px">￥{{item.total}}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </el-tab-pane>
            <el-tab-pane label="服务地址" name="third">
                <template>
                    <div class="address">
                        <div class="addressEvery" v-for="item in addressCustomer" :key="item.id">
                            <span style="font-weight:bold">{{detailCustomer.realname}}</span>
                            <span style="font-weight:bold">{{item.telephone}}</span>
                            <span>{{item.province+item.city+item.area+item.address}}</span>
                        </div>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import moment from 'moment'

export default {
    data(){
        return {
            activeName:'first',
        }
    },
    created(){
        // 根据点击顾客id查询详细信息
        this.findDetailCustomerById(this.$route.query.customerId)
        // 根据点击顾客id查询等订单信息
        this.findOrderCustomerById(this.$route.query.customerId)
        // 根据点击顾客id查询等地址信息
        this.findAddressCustomerById(this.$route.query.customerId)
    },
    computed:{
        ...mapState('customer',['detailCustomer','orderCustomer','addressCustomer']),
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        handleClick(){},
        // {{$route.query.customerId}}
        // 查询顾客详细信息  查询顾客订单信息  查询顾客地址信息
        ...mapActions('customer',['findDetailCustomerById','findOrderCustomerById','findAddressCustomerById']),
        orderDate:function(date){
            return moment(date).format('YYYY-MM-DD');
        }
    }

}
</script>

<style scoped>
    .detail{
            margin:1em;
        }
    .baseTop{
        width: 350px;
        text-align: center;
    }
    .baseBottom{
        font-size:14px ;
        color: rgba(0, 0, 0, 0.647058823529412);
        font-family: 'PingFangSC-Regular', 'PingFang SC';
    }
    .baseBottom div{
        margin: 1em 0;
    }
    .order{
        border-bottom: .4px solid #cccccc;
        padding:60px 30px;
    }
    .orderTop img{
        width:30px;
    }
    .orderTop span{
        display: inline-block;
        font-size: 20px;
        font-weight: 700;
        vertical-align: middle;
    }
    .orderBottom{
        display: inline-block;
    }
    .orderBottom span{
        display: inline-block;
        margin: 15px 120px 0 30px;
    }
    .address span{
        display: inline-block;
        width: 250px;
        margin: 20px;
        vertical-align: middle;
    }
    .addressEvery{
        width: 900px;
        border-bottom:1px dashed #cccccc;
    }
</style>