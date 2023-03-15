import {createRouter, createWebHistory} from 'vue-router';

import Home from '@/views/Home.vue';
import DiscordAuth from '@/views/DiscordAuth.vue';
import Dashboard from '@/views/Dashboard.vue';
import Settings from '@/views/AppSettings.vue';
import BeginnersHandbook from '@/views/BeginnersHandbook.vue';
import NotFound from '@/views/NotFound.vue';

const history = createWebHistory();

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
       meta: {
            transition: 'fadeback'
        }
    },

    {
        path: `/beginner's_handbook`,
        name: `Beginner's Handbook`,
        component: BeginnersHandbook,
        meta: {
            transition: 'fade'
        }
    },

    {
        path: '/auth/discord/',
        name: 'Auth',
        component: DiscordAuth,
    },

    {
        path: '/dashboard/:userid/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            transition: 'fade'
        }
    },

    {
        path: '/settings/',
        name: 'Settings',
        component: Settings,
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'Not Found',
        component: NotFound, 
    },
]

const router = createRouter({
    history,
    routes,
});

export default router;