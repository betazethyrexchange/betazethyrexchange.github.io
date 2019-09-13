<template>
  <div class="footer-app">
    <b-container>
      <div class="footer-one">
          <b-navbar toggleable="md">
            <div class="navbar-mobile">
              <b-navbar-toggle target="nav-collapse-footer"><i class="fa fa-bars"></i></b-navbar-toggle>
              <b-navbar-nav class="social-footer flex-row">
                <b-nav-item target="_blank" href="https://medium.com/@zethyrexchange"><img src="../../assets/images/medium.png"></b-nav-item>
                <b-nav-item target="_blank" href="https://t.me/ZethyrExchange"><img src="../../assets/images/telegram2.png"></b-nav-item>
                <b-nav-item target="_blank" href="https://twitter.com/zethyrexchange"><img src="../../assets/images/twitter.png"></b-nav-item>
              </b-navbar-nav>
            </div>
            <b-collapse id="nav-collapse-footer" is-nav>
              <b-navbar-nav class="mr-auto menu-footer">
                <!-- <b-nav-item href="#/about">{{$t('message.menu.About')}}</b-nav-item> -->
                <!-- <b-nav-item href="#/terms">{{$t('message.menu.Terms')}}</b-nav-item> -->
                <!-- <b-nav-item href="#/privacy">{{$t('message.menu.Privacy')}}</b-nav-item> -->
                <b-nav-item href="#/fee">{{$t('message.menu.Fees')}}</b-nav-item>
                <!-- <b-nav-item href="#/contactUs">{{$t('message.menu.Contact')}}</b-nav-item> -->
                <!-- <b-nav-item href="#">{{$t('message.menu.API')}}</b-nav-item> -->
                <!-- <b-nav-item href="#">{{$t('message.menu.ApplyToList')}}</b-nav-item> -->
                <b-nav-item @click="redirectToBlog">{{$t('message.menu.Blog')}}</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
      </div>
      <div class="footer-two">
        {{$t('message.menu.Text')}}
      </div>
    </b-container>
  </div>
</template>
<script>

export default {
  data () {
    return {
    
    };
  },
  mounted () {
    
  },
  methods: {
    redirectToBlog() {
      // window.location = process.env.URL_BLOG;
       window.open(process.env.URL_BLOG, '_blank');
      // this.$router.push({name:'blog-list'});
    }
  }
}
</script>

