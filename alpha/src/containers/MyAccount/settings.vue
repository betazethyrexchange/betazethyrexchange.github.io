<template>
  <div  style="overflow: hidden;">         
      <AccountSettingsView />
  </div>
</template>

<script>
// components
import { mapGetters, mapActions } from 'vuex'
import AccountSettingsView from './../../view/MyAccount/settings.vue';
export default {
  name :'Invite',
  components: {
    AccountSettingsView,
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
                if(this.tradeCheckLogin == true && this.$router.history.current.name == 'settings'){
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