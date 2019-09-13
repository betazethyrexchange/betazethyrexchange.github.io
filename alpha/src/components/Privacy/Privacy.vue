<template>
     <div style="background: #E5E5E5" class="pb-5 pt-5 descriptipn-info">
		<b-container>   
	       	<div class="privacy-content">
					<div class="content-top">
						<h2>{{$t('message.privacy.Title')}}</h2>
						<h5>{{$t('message.privacy.time')}}</h5>
						
						<p>{{$t('message.privacy.textThisPrivacy')}}</p>
						<p>{{$t('message.privacy.textBy')}}</p>
						<p>{{$t('message.privacy.textThe')}}</p>
					</div>

				<!-- INFORMATION BINANCE COLLECTS  -->

					<div class="infomation">
						<h4>{{$t('message.privacy.information.title')}}</h4>
						<h5>{{$t('message.privacy.information.we')}}</h5>
						
						<p>{{$t('message.privacy.information.informationYou')}}</p>
						<p>{{$t('message.privacy.information.when')}}</p>
						<p>{{$t('message.privacy.information.informationYou')}}</p>
						<p>{{$t('message.privacy.information.informationWe')}}</p>
						<p>{{$t('message.privacy.information.informationWeCollect')}}</p>
						
						<h5>{{$t('message.privacy.services.title')}}</h5>
						<p>{{$t('message.privacy.services.text')}}</p>
						
						<h5>{{$t('message.privacy.transaction.title')}}</h5>
						<p>{{$t('message.privacy.transaction.text')}}</p>
					</div>

				<!-- WHY DOES BINANCE COLLECT THIS INFORMATION -->
	
					<div class="why-does">
						<h4>{{$t('message.privacy.whyDoes.title')}}</h4>
						
						<h5>{{$t('message.privacy.whyDoes.provide.title')}}</h5>
						<p>{{$t('message.privacy.whyDoes.provide.text')}}</p>
						<p>{{$t('message.privacy.whyDoes.provide.text')}}</p>
						
						<h5>{{$t('message.privacy.whyDoes.protect.title')}}</h5>
						<p>{{$t('message.privacy.whyDoes.protect.text')}}</p>
						<p>{{$t('message.privacy.whyDoes.protect.text1')}}</p>
						<p>{{$t('message.privacy.whyDoes.protect.text2')}}</p>
						
						<h5>{{$t('message.privacy.whyDoes.comply.title')}}</h5>
						<p>{{$t('message.privacy.whyDoes.comply.text')}}</p>
						
						<h5>{{$t('message.privacy.whyDoes.measure.title')}}</h5>
						<p>{{$t('message.privacy.whyDoes.measure.text')}}</p>
						<p>{{$t('message.privacy.whyDoes.measure.text1')}}</p>
						
						<h5>{{$t('message.privacy.whyDoes.communicate.title')}}</h5>
						<p>{{$t('message.privacy.whyDoes.communicate.text')}}</p>
						
						<h5>{{$t('message.privacy.whyDoes.enforce.title')}}</h5>
						<p>{{$t('message.privacy.whyDoes.enforce.text')}}</p>
					</div>

				<!-- HOW DOES BINANCE PROTECT USER DATA -->
					<div class="how-does">
						<h4>{{$t('message.privacy.howDoesTitle')}}</h4>
						<p>{{$t('message.privacy.howDoesBinance')}}</p>
						<p>{{$t('message.privacy.howDoesIf')}}</p>
					</div>

				<!-- CONTACT US -->
					<div class="contact">
						<h4>{{$t('message.privacy.contactUsTitle')}}</h4>
						<p>{{$t('message.privacy.contactUsText')}}</p>
					</div>
	       	</div>
	     </b-container>
    </div>
</template>


<script>

</script>
<style scoped>
		.privacy-content{
			background: #FFF;
			padding: 16px 32px;
		}
		.title-terms{
			font-weight: bold;
		}
</style>