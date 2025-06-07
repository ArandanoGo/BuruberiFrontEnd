import { createRouter, createWebHistory } from 'vue-router';
import HomeContentComponent from "../public/pages/home.content.component.vue";
import ProducerHomeComponent from "../public/pages/producer-home.component.vue";
import PageNotFoundComponent from "../public/pages/page-not-found.component.vue";
import LoteCrearComponent from "../inventory/pages/lote-crear.component.vue";
import LoteManagementComponent from "../inventory/pages/lote-management.component.vue";
import LoteCatalogoComponent from "../inventory/pages/lote-catalogo.component.vue";
import ReservaManagementComponent from "../inventory/pages/reserva-management.component.vue";
import MensajeManagementComponent from "../Chat/pages/mensaje-management.component.vue";
import Mensaje2 from "../Chat/pages/mensaje2.vue";
import MenuProductorComponent from "../Menu/pages/menu-productor.component.vue";
import MenuDistribuidorComponent from "../Menu/pages/menu-distribuidor.component.vue";
import ReservaDistribuidorComponent from "../inventory/pages/reserva-distribuidor.component.vue";
import FavoritoManagementComponent from "../favorite/pages/favorito-management.component.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home',             name: 'Home',      component: HomeContentComponent,     meta: { title: 'Home' } },
        { path: '/notfound',         name: 'notfound',  component: PageNotFoundComponent,    meta: { title: 'Página no encontrada' } },
        { path: '/:pathMatch(.*)*',  redirect: '/notfound' },
        {
            path: "/MenuP",
            name: "MenuProductor",
            component: MenuProductorComponent,
            meta: { title: "Menú Productor" }
        },
        {
            path: "/MenuD",
            name: "MenuDistribuidor",
            component: MenuDistribuidorComponent,
        },
        {
            path: "/lotes",
            name: "LoteManagement",
            component: LoteManagementComponent,
        },
        { path: '/lotes/crear',
            name: "LoteCrear",
            component: LoteCrearComponent,
        },
        { path: '/catalogo',
            name: "LoteCatalogo",
            component: LoteCatalogoComponent,
        },
        { path: '/reserva',
            name: "ReservaManagement",
            component: ReservaManagementComponent,
        },
        { path: '/pedidos',
            name: "PedidosManagement",
            component: ReservaDistribuidorComponent,
        },
        { path: '/chat',
            name: "ChatManagement",
            component: MensajeManagementComponent,
        },
        { path: '/chat2',
            name: "ChatManagement2",
            component: Mensaje2,
        },
        { path: '/favoritos',
            name: "FavoritoManagement",
            component: FavoritoManagementComponent,
        },
        ]
});


router.beforeEach((to, from, next) => {
    let baseTitle = 'Buruberi';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})

export default router;