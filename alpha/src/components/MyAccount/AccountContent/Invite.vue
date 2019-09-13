<template>
  <div class="account-invite-page">

    <div class="banner text-center d-flex align-items-center justify-content-center">
      <div>
        <h2>{{$t('message.invert.invite')}}</h2>
        <h3 class="mb-3">{{$t('message.invert.gets')}}</h3>
        <a href="#" class="rules button mx-auto">{{$t('message.invert.rules')}}</a>
      </div>
    </div>
    <div class="account-invite-body">
      <div class="account-invite-link d-flex align-items-center">
          <div class="invite-link-group mr-2 w-100">
            <b-form-input id="input-sm" class="invite-link w-100" v-model="urlWeb" size="sm"></b-form-input>
            <b-button class="invite-link-copy" @click="coppy">{{$t('message.invert.copy')}}</b-button>
          </div>
          <b-button block variant="primary" class="invite-link-produce">{{$t('message.invert.produce')}}</b-button>
      </div>
      <div class="account-invite-main">
          <b-row>
                <b-col class="account-invite-col-item mb-3">
                    <div class="text-center title mb-2">{{$t('message.invert.number')}}</div>
                    <div class="text-center number mb-3">0</div>
                    <div class="text-center name">{{$t('message.invert.people')}}</div>
                </b-col>
                <b-col class="account-invite-col-item mb-3">
                    <div class="text-center title mb-2">{{$t('message.invert.number')}}</div>
                    <div class="text-center number mb-3">0</div>
                    <div class="text-center name">{{$t('message.invert.people')}}</div>
                </b-col>
                <b-col class="account-invite-col-item mb-3">
                    <div class="text-center title mb-2">{{$t('message.invert.number')}}</div>
                    <div class="text-center number mb-3">0</div>
                    <div class="text-center name">{{$t('message.invert.EOS')}}</div>
                </b-col>
          </b-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components:{
    
  },
  data () {
    return {
        urlWeb:'http://zethyr.exchange/invite/WfsBJv58xvrCV8HJY6SLbCG'
    }
  },
  methods: {
    coppy(){
      this.$copyText(this.urlWeb);
    }
  }
}
</script>
