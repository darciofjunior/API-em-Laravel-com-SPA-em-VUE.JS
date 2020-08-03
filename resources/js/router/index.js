import Vue from 'vue'
import Router from 'vue-router'
import list_cars from './components/list_cars.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'list_cars',
            component: list_cars
        }
    ]
})