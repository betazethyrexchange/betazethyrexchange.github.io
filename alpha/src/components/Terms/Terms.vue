<template>
     <div style="background: #E5E5E5" class="pb-5 pt-5 descriptipn-info">
		<b-container>   
	       	<div class="terms-content">
	       		<!--  -->
		       		<div class="content-top">
		       			<h2>{{$t('message.terms.Title')}}</h2>
		       			<h5>{{$t('message.terms.Time')}}</h5>
		       			<p>
		       				<span>{{$t('message.terms.textThis')}}</span>
		       				<a href="" >({{$t('message.terms.httpBinance')}})</a>
		       				<span>{{$t('message.terms.theAPI')}}</span>
		       				<a href="" >({{$t('message.terms.httpAPIBinance')}})</a>
		       				<span>{{$t('message.terms.textOur')}}</span>
		       				<a href="" >({{$t('message.terms.httpBinancePrivacy')}}).</a>
		       				<span>{{$t('message.terms.textAdditionally')}}</span>
		       			</p>
		       			<p>{{$t('message.terms.textPLEASE')}}</p>
		       			<p>{{$t('message.terms.textBY')}}</p>
		       		</div>

	       		<!-- 1. Agreement Conditions -->
				
					<div class="agreement">
						<h4>{{$t('message.terms.AgreementTitle')}}</h4>
						<p>
							<span>{{$t('message.terms.AgreementText')}}</span>
							<a href="" >({{$t('message.terms.AgreementHttp')}})</a>
							<span>{{$t('message.terms.AgreementText2')}}</span>
						</p>
					</div>

				<!-- 2. Eligibility -->

					<div class="eligibility">
						<h4>{{$t('message.terms.EligibilityTitle')}}</h4>
						<p>{{$t('message.terms.EligibilityText')}}</p>
					</div>

				<!-- 3. Prohibition of Use -->

					<div class="prohibition">
						<h4>{{$t('message.terms.ProhibitionTitle')}}</h4>
						<p>{{$t('message.terms.ProhibitionText')}}</p>
					</div>

				<!-- 4. Description of Services -->

					<div class="description">
						<h4>{{$t('message.terms.DepartmentTitle')}}</h4>
						<p>{{$t('message.terms.DepartmentText')}}</p>
						<p>{{$t('message.terms.DepartmentText2')}}</p>
					</div>

				<!-- 5. Binance Account Registration & Requirements -->

					<div class="binance">
						<h4>{{$t('message.terms.Binance.Title')}}</h4>
						
						<h5>{{$t('message.terms.Binance.Registration')}}</h5>
						<p>
							<span>{{$t('message.terms.Binance.RegistrationText')}}</span>
							<a href="" >({{$t('message.terms.Binance.RegistrationHttp')}})</a>
							<span>{{$t('message.terms.Binance.RegistrationText2')}}</span>
						</p>
						
						<h5>{{$t('message.terms.Binance.User')}}</h5>
						<p>{{$t('message.terms.Binance.UserTetxWith')}}</p>
						<p>{{$t('message.terms.Binance.UserTetxThe')}}</p>
						<p>{{$t('message.terms.Binance.UserTetxBy')}}</p>
						
						<h5>{{$t('message.terms.Binance.AccountUsage')}}</h5>
						<p>{{$t('message.terms.Binance.AccountUsageText')}}</p>
						
						<h5>{{$t('message.terms.Binance.AccountSecurity')}}</h5>
						<p>{{$t('message.terms.Binance.AccountSecurityBinance')}}</p>
						<p>{{$t('message.terms.Binance.AccountSecurityYou')}}</p>
						<p>{{$t('message.terms.Binance.AccountSecurityBy')}}</p>
						<ul>
							<li>{{$t('message.terms.Binance.AccountSecurityByI')}}</li>
							<li>{{$t('message.terms.Binance.AccountSecurityByII')}}</li>
							<li>{{$t('message.terms.Binance.AccountSecurityByIII')}}</li>
						</ul>
					</div>

				<!-- 6. Guidelines for Usage of the Services -->
				
					<div class="guidelines">
						<h4>{{$t('message.terms.Guidelines.Title')}}</h4>
						
						<h5>{{$t('message.terms.Guidelines.License')}}</h5>
						<p>{{$t('message.terms.Guidelines.LicenseSubject')}}</p>
						<p>{{$t('message.terms.Guidelines.LicenseThere')}}</p>
						<p>{{$t('message.terms.Guidelines.LicenseBinance')}}</p>
						
						<h5>{{$t('message.terms.Guidelines.Restrictions')}}</h5>
						<p>{{$t('message.terms.Guidelines.RegistrationWhen')}}</p>
						<ul>
							<li>i. {{$t('message.terms.Guidelines.RegistrationWhenI')}}</li>
							<li>ii. {{$t('message.terms.Guidelines.RegistrationWhenII')}}</li>
							<li>iii. {{$t('message.terms.Guidelines.RegistrationWhenIII')}}</li>
							<li>iv. {{$t('message.terms.Guidelines.RegistrationWhenIV.RegistrationWhenIVtitle')}}
									<ul>
										<li>{{$t('message.terms.Guidelines.RegistrationWhenIV.RegistrationWhenIV1')}}</li>
										<li>{{$t('message.terms.Guidelines.RegistrationWhenIV.RegistrationWhenIV2')}}</li>
										<li>{{$t('message.terms.Guidelines.RegistrationWhenIV.RegistrationWhenIV3')}}</li>
									</ul>
							</li>
							<li>v. {{$t('message.terms.Guidelines.RegistrationWhenV')}}</li>
							<li>vi. {{$t('message.terms.Guidelines.RegistrationWhenVI')}}</li>
						</ul>
						<p>{{$t('message.terms.Guidelines.RegistrationBy.RegistrationByTitle')}}</p>
						<ul>
							<li>{{$t('message.terms.Guidelines.RegistrationBy.RegistrationBy1')}}</li>
							<li>{{$t('message.terms.Guidelines.RegistrationBy.RegistrationBy2')}}</li>
							<li>{{$t('message.terms.Guidelines.RegistrationBy.RegistrationBy3')}}</li>
							<li>{{$t('message.terms.Guidelines.RegistrationBy.RegistrationBy4')}}</li>
							<li>{{$t('message.terms.Guidelines.RegistrationBy.RegistrationBy5')}}</li>
						</ul>
					</div>

				<!-- 7. Orders and Service Fees -->

					<div class="order">
						<h4>{{$t('message.terms.Orders.Title')}}</h4>
						
						<h5>{{$t('message.terms.Orders.Orders')}}</h5>
						<p>{{$t('message.terms.Orders.Text')}}</p>
						
						<h5>{{$t('message.terms.Orders.Cancellations')}}</h5>
						<p>{{$t('message.terms.Orders.CancellationsText')}}</p>
						
						<h5>{{$t('message.terms.Orders.Fees')}}</h5>
						<p>{{$t('message.terms.Orders.FeesText')}}</p>
					</div>

				<!-- 8. Margin Trading -->

					<div class="margin-trading">
						<h4>{{$t('message.terms.Margin.Title')}}</h4>
						
						<h5>{{$t('message.terms.Margin.A.Title')}}</h5>
						<p>{{$t('message.terms.Margin.A.Text')}}</p>
						<ul>
							<li>{{$t('message.terms.Margin.A.i')}}</li>
							<li>{{$t('message.terms.Margin.A.ii')}}</li>
							<li>{{$t('message.terms.Margin.A.iii')}}</li>
							<li>{{$t('message.terms.Margin.A.iv')}}</li>
							<li>{{$t('message.terms.Margin.A.v')}}</li>
							<li>{{$t('message.terms.Margin.A.vi')}}</li>
						</ul>
						
						<h5>{{$t('message.terms.Margin.B.Title')}}</h5>
						<ul>
							<li>{{$t('message.terms.Margin.B.i')}}</li>
							<li>{{$t('message.terms.Margin.B.ii')}}</li>
							<li>{{$t('message.terms.Margin.B.iii')}}</li>
							<li>{{$t('message.terms.Margin.B.iv')}}</li>
							<li>{{$t('message.terms.Margin.B.v')}}</li>
							<li>{{$t('message.terms.Margin.B.vi')}}</li>
							<li>{{$t('message.terms.Margin.B.vii')}}</li>
							<li>{{$t('message.terms.Margin.B.viii')}}</li>
						</ul>
					</div>

				<!-- 9. Liability -->

					<div class="liability">
						<h4>{{$t('message.terms.Liability.Title')}}</h4>
						
						<h5>{{$t('message.terms.Liability.Disclaimer')}}</h5>
						<p>{{$t('message.terms.Liability.DisclaimerTo')}}</p>
						<p>{{$t('message.terms.Liability.DisclaimerThe')}}</p>
						
						<h5>{{$t('message.terms.Liability.DisclaimerOf')}}</h5>
						<p>{{$t('message.terms.Liability.DisclaimerOfTo')}}</p>
						<p>{{$t('message.terms.Liability.DisclaimerOfNOTWITHSTANDING')}}</p>
						
						<h5>{{$t('message.terms.Liability.Indemnification')}}</h5>
						<p>{{$t('message.terms.Liability.IndemnificationText')}}</p>
					</div>

				<!-- 10. Announcements -->

					<div class="announcements">
						<h4>{{$t('message.terms.Announcements.Title')}}</h4>
						<p>
							<span>{{$t('message.terms.Announcements.Text1')}}</span>
							<a href="" >{{$t('message.terms.Announcements.http')}}</a>
							<span>{{$t('message.terms.Announcements.Text2')}}</span>
						</p>
					</div>

				<!-- 11. Termination of Agreement -->

					<div class="termination">
						<h4>{{$t('message.terms.Termination.Title')}}</h4>
						
						<p>{{$t('message.terms.Termination.You')}}</p>
						<ul>
							<li>{{$t('message.terms.Termination.You1')}}</li>
							<li>{{$t('message.terms.Termination.You2')}}</li>
							<li>{{$t('message.terms.Termination.You3')}}</li>
							<li>{{$t('message.terms.Termination.You4')}}</li>
						</ul>
						
						<p>{{$t('message.terms.Termination.In')}}</p>
						<ul>
							<li>{{$t('message.terms.Termination.In1')}}</li>
							<li>{{$t('message.terms.Termination.In2')}}</li>
							<li>{{$t('message.terms.Termination.In3')}}</li>
							<li>{{$t('message.terms.Termination.In4')}}</li>
							<li>{{$t('message.terms.Termination.In5')}}</li>
						</ul>
						
						<p>{{$t('message.terms.Termination.Should')}}</p>
						<p>{{$t('message.terms.Termination.If')}}</p>
						
						<h5>{{$t('message.terms.Termination.ATitle')}}</h5>
						<p>{{$t('message.terms.Termination.AText')}}</p>
						
						<h5>{{$t('message.terms.Termination.BTitle')}}</h5>
						<p>{{$t('message.terms.Termination.BText')}}</p>
					</div>

				<!-- 12. No Financial Advice -->

					<div class="no-financial">
						<h4>{{$t('message.terms.NoFinancialTitle')}}</h4>
						<p>{{$t('message.terms.NoFinancialText')}}</p>
					</div>

				<!-- 13. Compliance with Local Laws -->

					<div class="compliance">
						<h4>{{$t('message.terms.ComplianceTitle')}}</h4>
						<p>{{$t('message.terms.ComplianceText')}}</p>
					</div>

				<!-- 14. Privacy Policy -->

					<div class="privacy">
						<h4>{{$t('message.terms.Privacy.Title')}}</h4>
						<p>
							<span>{{$t('message.terms.Privacy.text1')}}</span>
							<a href="" >{{$t('message.terms.Privacy.http')}}</a>
							<span>{{$t('message.terms.Privacy.text2')}}</span>
						</p>
					</div>

				<!-- 15. RESOLVING DISPUTES: FORUM, ARBITRATION, CLASS ACTION WAIVER, GOVERNING LAW -->

					<div class="RESOLVING">
						<h4>{{$t('message.terms.Resolving.Title')}}</h4>
						<p>{{$t('message.terms.Resolving.Text')}}</p>
						
						<!-- A -->
						<p>
							<span class="title-terms">{{$t('message.terms.Resolving.A.title')}}</span>
							<span>{{$t('message.terms.Resolving.A.text')}}</span>
							<a href="" >{{$t('message.terms.Resolving.A.http')}}</a>
						</p>
						<!-- B -->
						<p>
							<span class="title-terms">{{$t('message.terms.Resolving.B.title')}}</span>
							<span>{{$t('message.terms.Resolving.B.text')}}</span>
						</p>
						<!-- C -->
						<p>
							<span class="title-terms">{{$t('message.terms.Resolving.C.title')}}</span>
							<span>{{$t('message.terms.Resolving.C.text')}}</span>
							<span class="title-terms">{{$t('message.terms.Resolving.C.Judgment')}}</span>
						</p>
						<!-- D -->
						<p>
							<span class="title-terms">{{$t('message.terms.Resolving.D.title')}}</span>
							<span>{{$t('message.terms.Resolving.D.text')}}</span>
						</p>
						<!-- E -->
						<p>
							<span class="title-terms">{{$t('message.terms.Resolving.E.title')}}</span>
							<span>{{$t('message.terms.Resolving.E.text')}}</span>
							<span>{{$t('message.terms.Resolving.E.http')}}</span>
							<span>{{$t('message.terms.Resolving.E.or')}}</span>
						</p>
						<!-- F -->
						<p>
							<span class="title-terms">{{$t('message.terms.Resolving.F.title')}}</span>
							<span>{{$t('message.terms.Resolving.F.text')}}</span>
						</p>
						
										<!-- 16. Miscellaneous -->
						<h4>{{$t('message.terms.Miscellaneous.title')}}</h4>
						<!-- A -->
						<p>
							<span class="title-terms">{{$t('message.terms.Miscellaneous.A.title')}}</span>
							<span>{{$t('message.terms.Miscellaneous.A.text')}}</span>
						</p>
						<!-- B -->
						<p>
							<span class="title-terms">{{$t('message.terms.Miscellaneous.B.title')}}</span>
							<span>{{$t('message.terms.Miscellaneous.B.text')}}</span>
						</p>
						<!-- C -->
						<p>
							<span class="title-terms">{{$t('message.terms.Miscellaneous.C.title')}}</span>
							<span>{{$t('message.terms.Miscellaneous.C.text')}}</span>
						</p>
						<!-- D -->
						<p>
							<span class="title-terms">{{$t('message.terms.Miscellaneous.D.title')}}</span>
							<span>{{$t('message.terms.Miscellaneous.D.text')}}</span>
						</p>
						<!-- E -->
						<p>
							<span class="title-terms">{{$t('message.terms.Miscellaneous.E.title')}}</span>
							<span>{{$t('message.terms.Miscellaneous.E.text')}}</span>
						</p>
						<!-- F -->
						<p>
							<span class="title-terms">{{$t('message.terms.Miscellaneous.F.title')}}</span>
							<span>{{$t('message.terms.Miscellaneous.F.text')}}</span>
						</p>
						<!-- G -->
						<p>
							<span class="title-terms">{{$t('message.terms.Miscellaneous.G.title')}}</span>
							<span>{{$t('message.terms.Miscellaneous.G.text')}}</span>
						</p>
						<!-- H -->
						<p>
							<span class="title-terms">{{$t('message.terms.Miscellaneous.H.title')}}</span>
							<span>{{$t('message.terms.Miscellaneous.H.text')}}</span>
							<a href="" >{{$t('message.terms.Miscellaneous.H.http')}}</a>
						</p>
					</div>

	       	</div>
	     </b-container>
    </div>
</template>


<script>

</script>
<style scoped>
		.terms-content{
			background: #FFF;
			padding: 16px 32px;
		}
		.title-terms{
			font-weight: bold;
		}
</style>