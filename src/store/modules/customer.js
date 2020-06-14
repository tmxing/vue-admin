import {get,post,post_array} from '@/http/axios'

export default {
    namespaced:true,
    state:{
        customers:[],
        detailCustomer:{},  //顾客详细信息
        orderCustomer:[],   //顾客订单信息
        addressCustomer:[]   //顾客地址信息

    },
    getters:{},
    mutations:{
        refreshCustomer(state,customers){
            state.customers = customers
        },
        refreshDetailCustomer(state,detailCustomer){
            state.detailCustomer = detailCustomer;
        },
        refreshOrderCustomer(state,orderCustomer){
            state.orderCustomer = orderCustomer;
        },
        refreshAddressCustomer(state,addressCustomer){
            state.addressCustomer = addressCustomer;

        }
    },
    actions:{
        // 批量删除
        async batchDeleteCustomer(context,params) {
            let res = await post_array('/customer/batchDelete',{ids:params})
            return res
        },
        // 根据id删除顾客
        async deleteCustomerById(context,id){
            let res = await get('/customer/deleteById',{id});
            return res;
        },
        // 修改顾客信息
        async saveOrUpdate(context,params) {
            let res = await post('/customer/saveOrUpdate',params);
            return res;
        },
        // 查询所有顾客  分页
        async findAllCustomer(context,params){
            let res = await post('/customer/query',params);
            context.commit('refreshCustomer',res.data);
        },
        // 根据id查询顾客详细信息
        async findDetailCustomerById(context,id){
            let res = await get('/customer/findCustomerById',{id});
            context.commit('refreshDetailCustomer',res.data);
        },
        // 根据id查询顾客订单信息
        async findOrderCustomerById(context,id){
            let res = await get('/order/queryBasic',{customerId:id});
            context.commit('refreshOrderCustomer',res.data);
        },
        // 根据id查询顾客地址信息
        async findAddressCustomerById(context,id){
            let res = await get('/address/findByCustomerId',{id});
            context.commit('refreshAddressCustomer',res.data);
        },
    }
}