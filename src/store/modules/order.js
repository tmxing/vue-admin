import {get,post,post_array} from '@/http/axios'

export default {
    namespaced:true,
    state:{
        orders:[],
        ordersStatus:[],
        orderById:{},
    },
    getters:{
        orderStatus(state){
            return (status) =>{
                return state.ordersStatus.filter(item => item.status === status)
            }
        },
    },
    mutations:{
        refreshOrderById(state,orderById){
            state.orderById = orderById;
        },
        refreshOrder(state,orders){
            state.orders = orders;
        },
        refreshAll(state,ordersStatus){
            state.ordersStatus = ordersStatus;
        }
    },
    actions:{
        // 服务
        // /order/confirmOrder
        async confirmOrder(context,params){
            let res = await get('/order/confirmOrder',params);
            return res;
        },
        // 接单
        // /order/takeOrder
        async takeOrder(context,params){
            let res = await get('/order/takeOrder',params);
            return res;
        },
        // 保存订单
        // /order/sendOrder
        async sendOrder(context,params){
            let res = await get('/order/sendOrder',params);
            return res;
        },
        // 根据id查询订单
        async findOrderById(context,id){
            let res = await get('/order/findById',{id});
            context.commit('refreshOrderById',res.data);
        },
        // 删除
        // async deleteOrder(context,id){
        //     return await get('/order/deleteById',{id})
        // },
        // 分页查询订单
        async findAllOrder(context,params){
            let res = await post('/order/queryPage',params);
            context.commit('refreshOrder',res.data);
        },
        // 查询所有订单
        async findAll(context){
            let res = await get('/order/findAll');
            context.commit('refreshAll',res.data);
        },

    }
}
