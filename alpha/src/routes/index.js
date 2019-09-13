/*
* create by Falcon
* date: 06/05/2019
*/
import Vue from 'vue'
import Router from 'vue-router'

import HomeContainer from '../containers/Home'
import MarketContainer from '../containers/Market'
import TradeContainer from '../containers/Trade'
import AboutUsContainer from '../containers/AboutUs'
import BlogContainer from '../containers/Blog'
import TermsContainer from '../containers/Terms'
import PrivacyContainer from '../containers/Privacy'
import FeeContainer from '../containers/Fee'
import ContactUsContainer from '../containers/ContactUs'
import UserCenterContainer from '../containers/UserCenter'

import TradingContainer from '../containers/MyAccount/tradingPower.vue'
import ZtrProcessContainer from '../containers/MyAccount/ztrProcess.vue'
import MyTradeDetailContainer from '../containers/MyAccount/tradeDetail.vue'
import InviteContainer from '../containers/MyAccount/invite.vue'
import SettingsContainer from '../containers/MyAccount/settings.vue'
import EcoPowerContainer from '../containers/MyAccount/ecoPower.vue'
import VotingPowerContainer from '../containers/MyAccount/votingPower.vue'
import DividendsContainer from '../containers/Dividends'
import BlogDetailContainer from '../containers/Blog/detail.vue'


Vue.use(Router)

const HomeRoute    = { path: '/', name: 'home', component: HomeContainer, meta: { title: 'Zethyr - A TRON decentralised exchange that distributes 100% revenue to the community' } };
const Market    = { path: '/market', name: 'market', component: MarketContainer, meta: { title: 'Markets - Zethyr Exchange' }};
const Trade    = { path: '/trade/:id', name: 'trade', component: TradeContainer, meta: { title: 'Trade - Zethyr Exchange' }};
const AboutUs = { path: '/about', name: 'About', component: AboutUsContainer, meta: { title: 'Abount - Zethyr Exchange' }};
const Blog = { path: '/blog', name: 'blog-list', component: BlogContainer, meta: { title: 'Blogs - Zethyr Exchange' }};
const Terms = { path: '/terms', name: 'Terms', component: TermsContainer, meta: { title: 'Terms - Zethyr Exchange' }};
const Privacy = { path: '/privacy', name: 'Privacy', component: PrivacyContainer, meta: { title: 'Privacy - Zethyr Exchange' }};
const Fee = { path: '/fee', name: 'Fee', component: FeeContainer, meta: { title: 'Fees - Zethyr Exchange' }};
const ContactUs = { path: '/contactUs', name: 'ContactUs', component: ContactUsContainer, meta: { title: 'ContactUs - Zethyr Exchange' }};
const UserCenter = { path: '/userCenter', name: 'UserCenter', component: UserCenterContainer, meta: { title: 'UserCenter - Zethyr Exchange' }};

const MyAccount    = { path: '/trading-power', name: 'trading-power', component: TradingContainer, meta: { title: 'TradingPower - Zethyr Exchange'} };
const ZtrProcess    = { path: '/ztr', name: 'ztr', component: ZtrProcessContainer, meta: { title: 'ZTR - Zethyr Exchange'} };
const MyTradeDetai = { path: '/trade-detail', name: 'trade-detail', component: MyTradeDetailContainer, meta: { title: 'Trade Detail - Zethyr Exchange'} };
const Invite    = { path: '/invite', name: 'invite', component: InviteContainer, meta: { title: 'Invite - Zethyr Exchange'} };
const Setting    = { path: '/settings', name: 'settings', component: SettingsContainer, meta: { title: 'Setting - Zethyr Exchange'} };
const EcoPower    = { path: '/eco-power', name: 'eco-power', component: EcoPowerContainer, meta: { title: 'EcoPower - Zethyr Exchange'} };
const VotingPower    = { path: '/voting-power', name: 'voting-power', component: VotingPowerContainer, meta: { title: 'VotingPower - Zethyr Exchange'}};
const BlogDetail    = { path: '/blog/:slug', name: 'blog-detail', component: BlogDetailContainer, meta: { title: 'Blog - Zethyr Exchange'}};
const Dividends    = { path: '/dividends', name: 'dividends', component: DividendsContainer, meta: { title: 'ZTR Data Publicity - Zethyr Exchange'}};



const routes = [
	HomeRoute,
	Market,
	Trade,
	AboutUs,
	Terms,
	Privacy,
	Fee,
	ContactUs,
	UserCenter,
	Blog,
	MyAccount,
	MyTradeDetai,
	Invite,
	Setting,
	EcoPower,
	VotingPower,
	BlogDetail,
	Dividends,
	ZtrProcess
];
const router = new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
export default router;
