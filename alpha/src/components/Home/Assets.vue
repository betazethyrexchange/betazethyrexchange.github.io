<template>
  <div class="why-invest  padding-home home-block">
      	<b-container>
      		<h3 class="text-center title-home mb-5">{{$t('message.assets.Title')}}</h3>
      		<b-row class="row-exchange pl-5 pr-5">
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/images/vector-7.png"></div>
			    	<div class="text">
		    			<h6 class="text-center">{{$t('message.assets.Untouchable')}}</h6>
		    			<div class="text-center">{{$t('message.assets.ContentUntouchable')}}</div>
			    	</div>
			    </b-col>
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/images/vector-8.png"></div>
			    	<div class="text">
		    			<h6 class="text-center">{{$t('message.assets.Never')}}</h6>
		    			<div class="text-center">{{$t('message.assets.ContentNever')}}</div>
			    	</div>
			    </b-col>
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/images/vector-9.png"></div>
			    	<div class="text">
		    			<h6 class="text-center">{{$t('message.assets.Truthful')}}</h6>
		    			<div class="text-center">{{$t('message.assets.ContentTruthful')}}</div>
			    	</div>
			    </b-col>
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/images/vector-10.png" style="margin-bottom: 3px;"></div>
			    	<div class="text">
		    			<h6 class="text-center">{{$t('message.assets.Vector')}}</h6>
		    			<div class="text-center">{{$t('message.assets.ContentVector')}}</div>
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
<style lang="scss" scoped>
      .assets{
        background: white;
      }
  </style>