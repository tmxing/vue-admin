import {get,post,post_array} from '@/http/axios'

export default {
    namespaced:true,
    state:{
        waiters:[],
        waiterInfo:{},
        waiterOrder:[],
        waiterMoney:[]
    },
    mutations:{
        refreshWaiterMoney(state,waiterMoney){
            state.waiterMoney = waiterMoney
        },
        refreshWaiterOrder(state,waiterOrder){
            state.waiterOrder = waiterOrder
        },
        refreshWaiterInfo(state,waiterInfo){
            state.waiterInfo = waiterInfo
        },
        refreshWaiter(state,waiters){
            state.waiters = waiters
        }
    },
    actions:{
        // 查询员工收益信息
        async basicWaiterMoney({commit},id){
            let res =  await get('/waiter/detailsShou',{id});
            commit('refreshWaiterMoney',res.data);
        },
        // 查询员工订单信息
        async basicWaiterOrder({commit},id){
            let res =  await get('/order/queryBasic',{waiterId:id});
            commit('refreshWaiterOrder',res.data);
        },
        // 查询员工基本信息
        async basicWaiterInfo({commit},id){
            let res =  await get('/waiter/findWaiterById',{id});
            commit('refreshWaiterInfo',res.data);
        },
        // 批量删除
        async deleteBatchWaiter({commit},ids){
            return await post_array('/waiter/batchDelete',{ids});
        },
        // 单个删除
        async deleteWaiter({commit},id){
            return await get('/waiter/deleteById',{id});
        },
        // 新增
        async addWaiter({commit},params){
            // console.log(params)
            return await post('/waiter/saveOrUpdate',params);
        },
        // 分页 查询所有员工信息
        async findAllWaiters(context,params){
            let res = await post('/waiter/query',params);
            context.commit('refreshWaiter',res.data);
        },
    }
}