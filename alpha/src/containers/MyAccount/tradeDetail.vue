<template>
  <div  style="overflow: hidden;">
      <MyTradeDetaiView />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ZtrNetwork } from '../../js/ZtrNetwork.js';
import MYTronWeb from './../../js/tron-web.js';
// components
import MyTradeDetaiView from './../../view/MyAccount/tradeDetail.vue';

// API
import UserApi from '../../api/user';

export default {
  name :'MyTradeDetai',
  components: {
    MyTradeDetaiView,
  },
  computed: {
      ...mapGetters([
        'tradeCheckLogin',
        'pageOpenOder',
        'pageOpenHistory',
        'accountAddress'
      ])
    },
  created() {    
    this.initData();
  },
  mounted () {
      this.onAccountChange();
      this.onTradeCheckLoginChange();
      this.onOpenOderPageChange();
      this.onOpenHistoryPageChange();
  },
  data () {
    return {
    }
  },
  methods:{
        ...mapActions([
          'initOpenOrderList',
          'initFilledOrderList'
        ]),

      /*--------------------------------- INIT ---------------------------------*/
      initData() {
        this.loadOrderList();
      },

      /*--------------------------- ON CHANGE STORE ----------------------------*/

      onAccountChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.accountAddress;
          },
          (val)=>{
              // this.initData();
          },
          {
            deep:true
          }
        ); 
      },
      onTradeCheckLoginChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.tradeCheckLogin;
          },
          (val)=>{
                if(this.tradeCheckLogin == true && this.$router.history.current.name == 'trade-detail'){
                  this.$router.push({name:'home'});
                }
          },
          {
            deep:true
          }
        ); 
      },
      onOpenOderPageChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.pageOpenOder;
          },
          (val)=>{
             this.loadOpenOrderList(this.pageOpenOder);
          },
          {
            deep:true
          }
        ); 
      },
      onOpenHistoryPageChange() {
        this.$store.watch(
          (state)=>{
            return this.$store.getters.pageOpenHistory;
          },
          (val)=>{
             this.loadFilledOrderList(this.pageOpenHistory);
          },
          {
            deep:true
          }
        ); 
      },

      /*---------------------------- LOAD , GET DATA ---------------------------*/

      loadOrderList() {
        this.initOpenOrderList({ page: 1, limit: 10000, statusList: [1] });
      }
  }
}
</script>
