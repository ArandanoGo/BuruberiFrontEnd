import { createRouter, createWebHistory } from 'vue-router';
import HomeContentComponent from "../public/pages/home.content.component.vue";
import ProducerHomeComponent from "../public/pages/producer-home.component.vue";
import PageNotFoundComponent from "../public/pages/page-not-found.component.vue";
import LoteCrearComponent from "../inventory/pages/lote-crear.component.vue";
import LoteManagementComponent from "../inventory/pages/lote-management.component.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: "/lotes",
            name: "LoteManagement",
            component: LoteManagementComponent,
        },
        { path: '/lotes/crear',
            name: "LoteCrear",
            component: LoteCrearComponent,
        },
        ]
});


router.beforeEach((to, from, next) => {
    let baseTitle = 'Buruberi';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})




export default router;