require('./bootstrap');
window.Vue = require('vue');
import Notifications from 'vue-notification'

var Decimal = require('decimal.js');
Vue.use(Notifications);
const app = new Vue({
    el: '#app',
    data: {
        markets: markets,
        user_id: user_id,
        notification_enabled: notification_enabled,
        search:"",
    },
    mounted() {
        if (this.notification_enabled) {

            Echo.private('trades.' + this.user_id)
                .listen('.TradeDeleted', (e) => {
                    e.data.trade.price = Decimal(e.data.trade.price).toFixed(8);
                    e.data.trade.amount = Decimal(e.data.trade.amount).toFixed(8);
                    this.$notify({
                        group: 'notifications',
                        title: e.data.trade.market + " trade deleted",
                        text: "Trade in market " + e.data.trade.market + " deleted",
                        duration: 3000
                    });
                })
                .listen('.NewTrade', (e) => {
                    e.data.trade.price = Decimal(e.data.trade.price).toFixed(8);
                    e.data.trade.amount = Decimal(e.data.trade.amount).toFixed(8);
                    this.$notify({
                        group: 'notifications',
                        title: e.data.trade.market + " trade created",
                        text: "Trade in market " + e.data.trade.market + " created",
                        duration: 3000
                    });
                })
                .listen('.TradeSuccessful', (e) => {
                    //console.log('success');
                    //console.log(e);
                    e.data.trade.price = Decimal(e.data.trade.price).toFixed(8);
                    e.data.trade.amount = Decimal(e.data.trade.amount).toFixed(8);
                    this.$notify({
                        group: 'notifications',
                        title: e.data.trade.market + " trade successful",
                        text: "Trade in market " + e.data.trade.market + " successful for " + e.data.trade.amount + " " + e.data.trade.market.split("/")[1],
                        duration: 3000
                    });
                });
            Echo.private('balances.' + this.user_id)
                .listen('.WithdrawalSent', (e) => {
                    this.$notify({
                        group: 'notifications',
                        title: e.data.withdrawal.name + " withdrawal sent",
                        text: "Tx:" + e.data.withdrawal.tx,
                        duration: 3000
                    });
                })
                .listen('.WithdrawalApproved', (e) => {
                    this.$notify({
                        group: 'notifications',
                        title: e.data.withdrawal.name + " withdrawal approved",
                        text: "Withdrawal will be processed soon",
                        duration: 3000
                    });
                })
                .listen('.WithdrawalRequested', (e) => {
                    this.$notify({
                        group: 'notifications',
                        title: e.data.withdrawal.name + " withdrawal requested",
                        text: "Withdrawal will be approved soon",
                        duration: 3000
                    });
                })
                .listen('.TxConfirmation', (e) => {

                    this.$notify({
                        group: 'notifications',
                        title: e.data.deposit.name + " deposit confirmation",
                        text: "Deposit received " + e.data.deposit.confirmations + "/" + e.data.deposit.needed_confirmations + " confirmations",
                        duration: 3000
                    });


                })
                .listen('.TxConfirmed', (e) => {
                    this.$notify({
                        group: 'notifications',
                        title: e.data.deposit.name + " deposit confirmed",
                        text: "Deposit for " + Decimal(e.data.deposit.value).toPrecision(8).toString() + e.data.deposit.name + " confirmed",
                        duration: 3000
                    });


                })
                .listen('.TxReceived', (e) => {
                    this.$notify({
                        group: 'notifications',
                        title: e.data.deposit.name + " deposit received",
                        text: "Deposit for " + Decimal(e.data.deposit.value).toFixed(8).toString() + " " + e.data.deposit.name + " received",
                        duration: 3000
                    });

                });
        }

    },
    computed:{
        filteredMarkets:function(){
            return this.markets.filter((market)=>{
                return market.name.match(this.search.toUpperCase());
            });
        }
    }
});


