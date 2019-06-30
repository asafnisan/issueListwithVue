import Vue from 'vue';
import VueRouter from 'vue-router';
import Uploader from '../components/Uploader.vue';
import Login from '../components/Login.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/issues',
            component: Uploader
        }
    ]
})

export default router;