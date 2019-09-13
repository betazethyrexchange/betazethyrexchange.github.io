<template>
  <div class="user-page">
    <b-container class="bv-example-row">
      <b-row class="row-exchange">
        <b-col lg="2" md="12" class="row-col-exchange">
            <AccountMenu />
        </b-col>
        <b-col lg="10" md="12" class="row-col-exchange">
            <AccountInvite />
        </b-col>
      </b-row>
    </b-container>       
  </div>
</template>

<script>
import AccountMenu from'./../../components/MyAccount/AccountMenu/Account-Menu.vue'
import AccountInvite from'./../../components/MyAccount/AccountContent/Invite.vue'
export default { 

  components:{
    AccountMenu,
    AccountInvite
  }
}
</script>

<style lang="scss">

</style>