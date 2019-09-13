/*----------------HOME---------------*/

const menu = require('./modules/Home/menu.js');
const register = require('./modules/Home/register.js');
const tradeNow = require('./modules/Home/tradeNow.js');
const whyInvest = require('./modules/Home/whyInvest.js');
const whyZtr = require('./modules/Home/whyZtr.js');
const assets = require('./modules/Home/assets.js');
const touch = require('./modules/Home/touch.js');

/*----------------MARTKET---------------*/

const world = require('./modules/Martket/world.js');
const list = require('./modules/Martket/list.js');

/*----------------TRADE---------------*/

const trade = require('./modules/Trade/index.js');

/*----------------ERR,LABEL---------------*/

const label = require('./modules/MyAccount/label.js');
const err = require('./modules/MyAccount/err.js');

/*----------------MY ACCOUNT---------------*/

const myOrder = require('./modules/Trade/myOrder.js');
const note = require('./modules/MyAccount/note.js');
const settings = require('./modules/MyAccount/settings.js');
const invert = require('./modules/MyAccount/invert.js');
const menuUser = require('./modules/MyAccount/menuUser.js');
const tradingPower = require('./modules/MyAccount/tradingPower.js');
const ztrProcess = require('./modules/MyAccount/ztrProcess.js');
const ecoPower = require('./modules/MyAccount/ecoPower.js');
const votingPower = require('./modules/MyAccount/votingPower.js');

/*----------------FOOTER---------------*/

const terms = require('./modules/Footer/Terms/');
const privacy = require('./modules/Footer/Privacy/');
const fee = require('./modules/Footer/Fee/');

/*----------------DIVIDENDS---------------*/

const dividends = require('./modules/Dividends/');
module.exports = {
  message: {

      /*--------------------HOME-----------------------*/
      // Menu
      
            menu:menu, 

      //Register 
          
         register:register,

      // TradeNow 
            
         tradeNow:tradeNow, 

      // WhyInvest 
         
         whyInvest:whyInvest,

      // whyZtr 
         
         whyZtr:whyZtr,

      // Assets 
         
         assets:assets,
         
      // Touch 
         
         touch:touch,
   /*--------------------MARKET-----------------------*/

      // World 
      
         world:world,

      // List 

         list:list,
   /*--------------------TRADE -----------------------*/

      // Trade 
            
          trade:trade, 

      // MyOrder 
         
         myOrder:myOrder,
   /*--------------------MYACCOUNT -----------------------*/
      // TradingPower 
      
         tradingPower:tradingPower,
         
         ztrProcess:ztrProcess,

      // EcoPower 
      
         ecoPower:ecoPower,

      // votingPower

         votingPower:votingPower,

      // Label 

      label:label,

      // Err
         errTrade:err.errTrade,
         errTradeBanlance:err.errTradeBanlance,
         errMinimum:err.errMinimum,
         errMaxLock:err.errMaxLock,
         errPriceTrade:err.errPriceTrade,
         errAmountTrade:err.errAmountTrade,
         errEnterAmount:err.errEnterAmount,
         errLock:err.errLock,
         errTokenEnoght:err.errTokenEnoght,
         errEnterZtr:err.errEnterZtr,

         err:err,

      // Note
      note:note.note,
      noteStrake:note.strake,
      noteYou:note.you,
      noteUnstrake:note.unstrake,

      // MenuUser 
   
      menuUser:menuUser,

      // Settings 
      
      settings:settings,

      // Invert
       
      invert:invert,

      // Terms 
       
      terms:terms,

      // Privacy
      
      privacy:privacy,
      
      // Fee
      
      fee:fee,

      // Dividends
      dividends:dividends

      
  }		
}