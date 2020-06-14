import {get,post,post_array} from '@/http/axios'

export default {
    namespaced:true,
    state:{
        products:[],
        productById:{},
        productsList:[],
        categories:[],
        categoryName:''
    },
    getters:{
        // 根据所属栏目名查询 产品  ----
        // findCategoryName(state){
        //     // console.log('findCategoryName--')
        //     return state.products.list.filter((item)=>{
        //         return item.category.name == state.categoryName;
        //     })
        // },
    },
    mutations:{
        // refreshCategoryName(state,categoryName){
        //     state.categoryName = categoryName
        // },
        refreshProductById(state,productById){
            state.productById = productById;
        },
        refreshCategory(state,categories){
            state.categories = categories
        },
        refreshProduct(state,products){
            state.products = products
        },
    },
    actions:{
        // 根据所属栏目名查询 产品  ----
        // async findCategoryName(context,params,name){
        //     console.log(params,'--',name)
        //     // let res = await post('/product/queryProductCascadeCategory',params);
        //     // context.commit('refreshProduct',res.data);
        // },
        // 查询栏目名称
        // async commitCategoryName(context,name){
        //     context.commit('refreshCategoryName',name)
        // },

        //根据id查找产品
         async findProductById(context,id){
            let res = await get('/product/findById',{id})
            context.commit('refreshProductById',res.data);
         },
        // 删除
        async deleteProductsById(context,id){
            console.log(id)
            return await get('/product/deleteById',{id});
        },
        // 批量删除
        async deleteBatchProducts(context,ids){
            //ids = ids.join(',')
            return await post_array('/product/batchDelete',{ids});
        },
        // 查询所有栏目
        async findAllCategory(context){
            let res = await get('/category/findAll');
            context.commit('refreshCategory',res.data)
        },
        // 保存编辑  新增产品
        async saveOrUpdate(context,params){
            return await post('/product/saveOrUpdate',params);
        },
        // 查询所有产品  分页
        async findAllProduct(context,params){
            let res = await post('/product/queryProductCascadeCategory',params);
            context.commit('refreshProduct',res.data);
        },
    }
}