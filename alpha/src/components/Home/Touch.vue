<template>
  <div class="why-ztr padding-home home-block">
      	<b-container>
      		<h3 class="text-center title-home mb-5">{{$t('message.touch.Title')}}</h3>
      		<b-row class="row-exchange pr-5 pl-5">
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/vector-11.png" style="margin-bottom: 3px"></div>
			    	<div class="text">
		    			<h6 class="text-center">{{$t('message.touch.Untouchable')}}</h6>
		    			<div class="text-center">{{$t('message.touch.ContentUntouchable')}}</div>
			    	</div>
			    </b-col>
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/vector-12.png" style="margin-bottom: 3px"></div>
			    	<div class="text">
		    			<h6 class="text-center">{{$t('message.touch.Never')}}</h6>
		    			<div class="text-center">{{$t('message.touch.ContentNever')}}</div>
			    	</div>
			    </b-col>
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/vector-13.png" style="margin-bottom: 6px"></div>
			    	<div class="text">
		    			<h6 class="text-center">{{$t('message.touch.Truthful')}}</h6>
		    			<div class="text-center">{{$t('message.touch.ContentTruthful')}}</div>
			    	</div>
			    </b-col>
			    <b-col lg="3" md="6" class="mb-3 row-col-exchange">
			    	<div class="text-center mb-3"><img src="../../assets/vector-14.png"></div>
			    	<div class="text">
		    			<h6 class="text-center">{{$t('message.touch.Vector')}}</h6>
		    			<div class="text-center">{{$t('message.touch.ContentVector')}}</div>
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