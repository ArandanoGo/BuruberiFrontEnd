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
import ReviewManagementComponent from "../review/pages/review-management.component.vue";
import ListaProductoresComponent from "../lists/pages/Lista-Productores.component.vue";
import ListaLotesComponent from "../lists/pages/Lista-Lotes.component.vue";
import ListaContactosComponent from "../lists/pages/Lista-Contactos.component.vue";
import PromotionManagementComponent from "../promotions/pages/promotion-management.component.vue";
import ReviewProducerComponent from "../review/pages/review-producer.component.vue";
import OrderManagementComponent from "../orders/pages/order-management.component.vue";
import OrderDistribuidorComponent from "../orders/pages/order-distribuidor.component.vue";
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
            path: "/lotes/:id/productor",
            name: "LoteManagement",
            component: LoteManagementComponent,
            props: true,
        },
        { path: '/lotes/crear/:id',
            name: "LoteCrear",
            component: LoteCrearComponent,
            props: true,
        },
        { path: '/catalogo',
            name: "LoteCatalogo",
            component: LoteCatalogoComponent,
        },
        { path: '/reserva/:id/productor',
            name: "ReservaManagement",
            component: ReservaManagementComponent,
            props: true,
        },
        { path: '/pedidos/:id/distribuidor',
            name: "PedidosManagement",
            component: ReservaDistribuidorComponent,
            props: true,
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
        { path: '/catalogo/:id/Review',
            name: 'review',      component: ReviewManagementComponent,
            meta: { title: 'Review' }
        },
        { path: '/Productores',
            name: 'productores',      component: ListaProductoresComponent,
            meta: { title: 'Productores' }
        },
        {
            path: '/lotes/:id/productor',
            name: 'lotes-productor',
            component: ListaLotesComponent,
            props: true
        },
        {
            path: '/contactos/:id',
            name: 'contactos-productor',
            component: ListaContactosComponent,
            props: true
        },
        {
            path: '/promotions/:id/productor',
            name: 'PromotionManagement',
            component: PromotionManagementComponent
        },
        { path: '/lotes/:id/Review',
            name: 'review-lote',      component: ReviewProducerComponent,
            meta: { title: 'ReviewLote' }
        },
        {
            path: '/orders/:id/Productor',
            name: 'order-management',
            component: OrderManagementComponent,
            props: true
        },
        {
            path: '/orders/:id/Distribuidor',
            name: 'order-distribuidor',
            component: OrderDistribuidorComponent,
            props: true
        },
        ]
});


router.beforeEach((to, from, next) => {
    let baseTitle = 'Buruberi';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})

export default router;