<template>
  <div  style="overflow: hidden;">         
      <MyAccountView />
      
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// components
import MyAccountView from './../../view/MyAccount/invite.vue';
export default {
  name :'Invite',
  components: {
    MyAccountView,
  },
  computed: {
      ...mapGetters([
        'tradeCheckLogin'
      ])
  },
  data () {
    return {
    }
  },
  mounted(){
    this.onTradeCheckLoginChange();
  },
  methods:{

    /*--------------------------------- INIT ---------------------------------*/
    
    loadData() {
    
    },

    /*--------------------------- ON CHANGE STORE ----------------------------*/

    onTradeCheckLoginChange() {
        this.$store.watch(
          (state)=>{
              return this.$store.getters.tradeCheckLogin;
          },
          (val)=>{
                if(this.tradeCheckLogin == true && this.$router.history.current.name == 'invite'){
                  this.$router.push({name:'home'});
                }
          },
          {
            deep:true
          }
        ); 
      },
  }
}
</script>

<style lang="scss">
</style>