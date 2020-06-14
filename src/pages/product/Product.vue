<template>
  <div class="product" style="margin:1em">
    <el-button type="primary" @click="addProductHandler" style="margin-right:1em">添加</el-button>
    <el-button type="danger" @click="batchDeleteHandler" style="margin-right:1em">批量删除</el-button>
    <el-table
      :header-cell-style="styleSet"
      :cell-style="styleSet"
      :data="products.list"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="120">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="300">
      </el-table-column>
      <el-table-column
        prop="category.name"
        label="所属栏目"
        width="260">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="slot">
          <a href="" @click.prevent='deleteHandler(slot.row.id)' >删除</a>
          <a href="" @click.prevent='detailHandler(slot.row.id)'>详情</a>
          <a href="" @click.prevent='editHandler(slot.row)'>编辑</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="products.total"
      :current-page="products.page+1"
      :page-size='products.pageSize'
      @current-change="changePage">
    </el-pagination>
     <!-- 模态框 -->
    <el-dialog title="修改产品信息" :visible.sync="product_visible">
      <el-form :model="product_form">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="product_form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品价格" :label-width="formLabelWidth">
          <el-input v-model="product_form.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所属栏目" :label-width="formLabelWidth">
          <el-select v-model="product_form.categoryId" placeholder="请选择状态">
            <el-option v-for="item in categories" :key="item.id" :value="item.id" :label="item.name"/>
          </el-select>
          
        </el-form-item>
        <el-form-item label="产品状态" :label-width="formLabelWidth">
          <el-select v-model="product_form.status" placeholder="请选择状态">
            <el-option label="下架" value="" />
            <el-option label="上架" value="正常" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="3" v-model="product_form.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品图片" :label-width="formLabelWidth">
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
        <el-button @click="product_visible = false">取 消</el-button>
        <el-button type="primary" @click="saveHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
    data(){
      return {
        params:{
          page:0,
          pageSize:10,
        },
        imageUrl: '',
        formLabelWidth: '120px',
        product_visible:false,
        product_form:{},
        batchIds:[]

      }
    },
    watch:{
      params:{
        handler(){
          this.findAllProduct(this.params);
        },
        deep:true
      },
    },
    computed:{
      ...mapState('product',['products','categories'])
    },
    created(){
      this.findAllProduct(this.params);
      this.findAllCategory();
    },
    methods:{
        ...mapActions('product',['findAllProduct','saveOrUpdate','findAllCategory','deleteBatchProducts','commitCategoryName','deleteProductsById']),
        
        // 详情
        detailHandler(id){
          this.$router.push({
            path:'/product/detail',
            query:{productId:id}
          });
        },
        // 删除
        deleteHandler(id){
          this.deleteProductsById(id).then(()=>{
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.findAllProduct(this.params);
          })
        },
        // 批量删除
        batchDeleteHandler(){
          this.deleteBatchProducts(this.batchIds).then(()=>{
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.findAllProduct(this.params);
          });
        },
        // 获取批量删除的所有id
        handleSelectionChange(val){
          this.batchIds = val.map((item)=>{
            return item.id
          })
        },
        // 新增产品
        addProductHandler(){
          this.product_form = {};
          this.imageUrl = "";
          this.product_visible = true;
        },
        // 编辑
        editHandler(row){
            // 打开模态框
            this.product_visible = true
            this.product_form = row
            this.product_form.id = row.id
            this.product_form.name = row.name
            this.product_form.price = row.price
            this.product_form.description = row.description
            //   改变this.product_form的引用地址
            this.product_form = Object.assign({}, this.product_form)
            // 用于显示当前顾客的头像
            this.imageUrl = row.photo
        },
        // 图片上传成功函数
        successHandler(response){
          // 修改头像时，改变页面显示的图片
          this.imageUrl = 'http://134.175.100.63:8686/group1/' + response.data.id
          this.product_form.photo = 'http://134.175.100.63:8686/group1/' + response.data.id
          this.product_form = Object.assign({}, this.product_form)
        },
        // 保存编辑  新增产品保存
        saveHandler(){
          this.saveOrUpdate(this.product_form).then((res) => {
            this.$message({
              message: this.product_form.id?'编辑成功':'新增成功',
              type: 'success'
            });
            //   更新数据
            this.findAllProduct(this.params)
          })
          this.product_visible = false
        },
        // 重置
        reset(){
            this.params = {
                page:0,
                pageSize:10
            }
            this.findAllProduct(this.params);
        },
        // 分页
        changePage(page){
            this.params.page = page-1;
        },
        styleSet(){
            return 'text-align:center;';
        },
    }
}
</script>

<style scoped>
  /* >>> 表示深度选择器，用样式穿透 */ 
  .product >>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .product >>> .avatar-uploader .el-upload:hover {
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
    color: rgba(0, 51, 255, 0.647058823529412);
  }

</style>