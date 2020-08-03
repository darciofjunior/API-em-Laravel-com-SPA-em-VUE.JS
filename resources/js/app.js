require('./bootstrap');
window.Vue = require('vue');

Vue.component('list_cars', require('./components/list_cars.vue').default);

const app = new Vue({
    el: '#app'
});