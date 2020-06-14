<template>
    <div class="detail" style="margin:1em">
        <el-page-header @back="goBack" title="返回"></el-page-header>
        <div>产品名称：{{productById.name}}</div>
        <div>产品价格：${{productById.price}}</div>
        <div>产品介绍：{{productById.description}}</div>
        <div>产品主图：<img :src="productById.photo" alt="" style="width:400px;height:260px;" align="top"></div>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    computed:{
        ...mapState('product',['productById']),
    },
    created(){
        // console.log(this.$route.query.productId)
        this.findProductById(this.$route.query.productId);
    },
    methods:{
        ...mapActions('product',['findProductById']),

        goBack(){
            this.$router.go(-1);
        },
    }

}
</script>

<style scoped>
    .detail div{
        font-size: 13px;
        color: #333333;
        margin: 20px;
    }
</style>