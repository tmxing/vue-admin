<template>
  <div class="order" style="margin:1em">
    <el-tabs v-model="activeName">
      <el-tab-pane label="所有订单" name="first">
        <!-- 表格 -->
        <el-table
          :data="orders.list"
          style="width: 100%"
          :header-cell-style="styleSet"
          :cell-style="styleSet"
        >
          <el-table-column prop="id" label="订单编号" width="100" />
          <el-table-column prop="orderTime" label="下单时间" width="180">
            <template v-slot="slot">
              <div>{{slot.row.orderTime | dateFormat}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="总价" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="customerId" label="顾客ID" />
          <el-table-column label="操作">
            <template v-slot="slot">
              <a
                href
                style="color:rgba(0, 51, 255, 0.647058823529412)"
                @click.prevent="detailHandler(slot.row.id)"
              >详情</a>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="orders.total"
          :page-size="orders.pageSize"
          :current-page="orders.page + 1"
          @current-change="changePage"
        />
      </el-tab-pane>
      <el-tab-pane label="待支付" name="second">
        <el-table
          :data="orderStatus('待支付')"
          style="width: 100%"
          :header-cell-style="styleSet"
          :cell-style="styleSet"
        >
          <el-table-column prop="id" label="订单编号" width="100" />
          <el-table-column prop="orderTime" label="下单时间" width="180" >
              <template v-slot="slot">
              <div>{{slot.row.orderTime | dateFormat}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="总价" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="customerId" label="顾客ID" />
          <el-table-column label="操作">
                    <template v-slot="slot">
                        <a href="" style="color:rgba(0, 51, 255, 0.647058823529412)" @click.prevent='detailHandler(slot.row.id)'>详情</a>
                    </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待派单" name="third">
        <el-table
          :data="orderStatus('待派单')"
          style="width: 100%"
          :header-cell-style="styleSet"
          :cell-style="styleSet"
        >
          <el-table-column prop="id" label="订单编号" width="100" />
          <el-table-column prop="orderTime" label="下单时间" width="180"  >
              <template v-slot="slot">
              <div>{{slot.row.orderTime | dateFormat}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="总价" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="customerId" label="顾客ID" />
          <el-table-column label="操作">
            <template v-slot="slot">
              <el-button size="small" style="color:rgba(0, 51, 255, 0.647058823529412)" @click.prevent="sendOrderHandler(slot.row)" >派单</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="选择员工" :visible.sync="sendOrder_visible">
          <el-form ref="form" :model="sendOrder_form" label-width="80px">
            <el-form-item label="员工信息">
              <el-select v-model="sendOrder_form.waiterId" placeholder="请选择员工">
                <el-option v-for="item in waiters" :label="item.username" :value="item.id" :key="item.id" ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="sendOrder_visible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrderHandler">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="待接单" name="fourth">
        <el-table
          :data="orderStatus('待接单')"
          style="width: 100%"
          :header-cell-style="styleSet"
          :cell-style="styleSet"
        >
          <el-table-column prop="id" label="订单编号" width="100" />
          <el-table-column prop="orderTime" label="下单时间" width="180">
              <template v-slot="slot">
              <div>{{slot.row.orderTime | dateFormat}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="总价" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="customerId" label="顾客ID" />
           <el-table-column label="操作">
            <template v-slot="slot">
              <el-button size="small" style="color:rgba(0, 51, 255, 0.647058823529412)" @click.prevent="takeOrderHandler(slot.row)" >接单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待服务" name="fiveth">
        <el-table
          :data="orderStatus('待服务')"
          style="width: 100%"
          :header-cell-style="styleSet"
          :cell-style="styleSet"
        >
          <el-table-column prop="id" label="订单编号" width="100" />
          <el-table-column prop="orderTime" label="下单时间" width="180">
              <template v-slot="slot">
              <div>{{slot.row.orderTime | dateFormat}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="总价" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="customerId" label="顾客ID" />
          <el-table-column label="操作">
            <template v-slot="slot">
              <el-button size="small" style="color:rgba(0, 51, 255, 0.647058823529412)" @click.prevent="confirmOrderHandler(slot.row)" >服务</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="sixth">
        <el-table
          :data="orderStatus('已完成')"
          style="width: 100%"
          :header-cell-style="styleSet"
          :cell-style="styleSet"
        >
          <el-table-column prop="id" label="订单编号" width="100" />
          <el-table-column prop="orderTime" label="下单时间" width="180" >
              <template v-slot="slot">
              <div>{{slot.row.orderTime | dateFormat}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="总价" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="customerId" label="顾客ID" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      params: {
        page: 0,
        pageSize: 10
      },
      activeName: "first",
      formLabelWidth: "120px",
      order_form: {},
      sendOrder_visible: false,
      sendOrder_form: {}
    };
  },
  watch: {
    params: {
      handler: function() {
        this.findAllOrder(this.params);
      },
      deep: true
    }
  },
  computed: {
    ...mapState("order", ["orders"]),
    ...mapGetters("order", ['orderStatus']),
    ...mapState("waiter", ["waiters"])
  },
  created() {
    //   分页查询所有订单
    this.findAllOrder(this.params);
    // 查询所有订单
    this.findAll();
    // 查询所有员工
    this.findAllWaiters();
  },
  methods: {
    ...mapActions("order", ["findAllOrder", "findAll", "editOrder","sendOrder","takeOrder","confirmOrder"]),
    ...mapActions("waiter", ["findAllWaiters"]),
    //所有订单中  订单详情
    detailHandler(id) {
        console.log(id)
      this.$router.push({
        path: "/order/list",
        query: {id}
      });
    },
    // 服务
    confirmOrderHandler(row){
        this.sendOrder_form.orderId = row.id
        this.confirmOrder(this.sendOrder_form).then(()=>{
             this.$message({
                message: "服务完成",
                type: 'success'
            });
            this.findAll();
        })
    },
    // 接单
    takeOrderHandler(row){
        this.sendOrder_form = row
        this.sendOrder_form.orderId = row.id
        this.takeOrder(this.sendOrder_form).then(()=>{
             this.$message({
                message: "接单成功",
                type: 'success'
            });
            this.findAll();
        });
    },
    // 保存订单
    saveOrderHandler() {
       this.sendOrder(this.sendOrder_form).then(()=>{
           this.findAll();
           this.$message({
                message: "派单成功",
                type: 'success'
            });
           this.sendOrder_visible = false;
       })

    },
    // 派单
    sendOrderHandler(row) {
        this.sendOrder_form = row
         this.sendOrder_form.orderId = row.id;
        this.sendOrder_visible = true;
    },
    changePage(page) {
      this.params.page = page - 1;
    },
    styleSet() {
      return "text-align:center";
    }
  }
};
</script>

