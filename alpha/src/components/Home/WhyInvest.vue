<template>
  <div class="why-invest padding-home home-block">
      	<b-container>
      		<h3 class="text-center title-home mb-5">{{$t('message.whyInvest.Title')}}</h3>
      		<b-row class="row-exchange">
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/images/vector.png"></div>
			    	<div class="text text-center">
		    			<h6>{{$t('message.whyInvest.ContentReturn')}}</h6>
		    			<div>{{$t('message.whyInvest.TextReturn')}} </div>
			    	</div>
			    </b-col>
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/images/vector-1.png"></div>
			    	<div class="text text-center">
		    			<h6>{{$t('message.whyInvest.ContentTime')}}</h6>
		    			<div>{{$t('message.whyInvest.TextTime')}}</div>
			    	</div>
			    </b-col>
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/images/vector-2.png"></div>
			    	<div class="text text-center">
		    			<h6>{{$t('message.whyInvest.ContentTrade')}}</h6>
		    			<div>{{$t('message.whyInvest.TextTrade')}}</div>
			    	</div>
			    </b-col>
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/images/vector-3.png"></div>
			    	<div class="text text-center">
		    			<h6>{{$t('message.whyInvest.ContentZero')}}</h6>
		    			<div>{{$t('message.whyInvest.TextZero')}}</div>
		    			<div>{{$t('message.whyInvest.TextZero2')}}</div>
			    	</div>
			    </b-col>
			</b-row>
      	</b-container>
  </div>
</template>
<script>

export default {

  data () {
    return {
    
    }
  },
  methods: {
   
  }
}
</script>
