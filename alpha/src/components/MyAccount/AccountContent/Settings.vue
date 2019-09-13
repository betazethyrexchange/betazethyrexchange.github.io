<template>
  <div>
     <div class="setting-detail-page">
        <b-row>
          <div class="reset-pass">
            <b-col lg="8" md="12">
                <p>{{$t('message.settings.resset')}}</p>
            </b-col>
            <b-col lg="4" md="12">
                <b-button variant="primary">{{$t('message.settings.go')}}</b-button>
            </b-col>
          </div>
        </b-row>
        <div class="reset-pass clearfix">
            <p>{{$t('message.settings.security')}}</p>
             <div class="section-setting" style="margin-top: 16px;">
              <b-row>
                <b-col lg="8" md="12">
                    <img src="../../../assets/images/vertifi-icon.png">
                    <p>Verification</p>
                    <span>{{$t('message.settings.resset')}}</span>
                </b-col>
                <b-col lg="4" md="12">
                    <b-button variant="primary">{{$t('message.settings.go')}}</b-button>
                </b-col>
            </b-row>
            </div>
            <div class="section-setting">
              <b-row>
                <b-col lg="8" md="12">
                    <img src="../../../assets/images/cpu-icon.png">
                    <p>CPU receiving account</p>
                    <span>{{$t('message.settings.resset')}}</span>
                </b-col>
                <b-col lg="4" md="12">
                    <b-button variant="primary">{{$t('message.settings.go')}}</b-button>
                </b-col>
            </b-row>
            </div>
            <div class="section-setting">
              <b-row>
                <b-col lg="8" md="12">
                    <img src="../../../assets/images/device-icon.png">
                    <p>Manager device</p>
                    <span>{{$t('message.settings.resset')}}</span>
                </b-col>
                <b-col lg="4" md="12">
                    <!-- <b-button variant="primary">{{$t('message.settings.go')}}</b-button> -->
                </b-col>
            </b-row>
            </div>
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
    
    }
  },
  methods: {
   
  }
}
</script>
