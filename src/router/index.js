import { createRouter, createWebHistory } from 'vue-router';
import HomeContentComponent from "../public/pages/home.content.component.vue";
import ProducerHomeComponent from "../public/pages/producer-home.component.vue";
import PageNotFoundComponent from "../public/pages/page-not-found.component.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [

        /*=========================== Public Routes ===========================*/
        { path: '/home',             name: 'Home',      component: HomeContentComponent,     meta: { title: 'Home' } },
        { path: '/notfound',         name: 'notfound',  component: PageNotFoundComponent,    meta: { title: 'Página no encontrada' } },
        { path: '/:pathMatch(.*)*',  redirect: '/notfound' },

        /*=========================== Producer Home Routes ===========================*/

        {path: '/producer/home', name: 'Producer-Home', component: ProducerHomeComponent, meta: { title: 'Producer Home'}}

    ]
});


router.beforeEach((to, from, next) => {
    let baseTitle = 'Buruberi';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})




export default router;