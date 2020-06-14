<template>
  <div class="detail" style="margin:1em">
    <el-page-header @back="goBack" title="返回"></el-page-header>
    <el-card class="box-card">
        <div>订单编号：{{orderById.id}}</div>
        <div>创建时间：{{orderById.orderTime | dateFormat}}</div>
        <div>订单数量：{{orderById.total}}</div>
        <div>订单状态：{{orderById.status}}</div>
        <el-collapse v-if="orderById.orderLines" v-model="activeNames">
            <el-collapse-item title="订单产品" name="1">
                <div v-for="item in orderById.orderLines" :key="item.id">
                    <span style="margin-left:2em;"><img :src="item.product.photo" alt="" ></span>
                    <span style="margin-left:2em;">产品名：{{item.product.name}}</span>
                    <span style="margin-left:2em;">产品数量：{{item.number}}</span>
                    <span style="margin-left:2em;">产品价格：￥{{item.price}}</span>
                </div>
            </el-collapse-item>
        </el-collapse>
        <div>订单总额：￥{{orderById.total}}</div>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      activeNames: 1
    };
  },
  computed: {
    ...mapState("order", ["orderById"])
  },
  created() {
    this.findOrderById(this.$route.query.id);
  },
  methods: {
    ...mapActions("order", ["findOrderById"]),
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
    .box-card {
        width: 100%;
        margin-top: 20px;
    }
    .box-card div{
        font-size: 16px;
        margin-top: 1em;
        font-family: '微软雅黑';
    }
</style>