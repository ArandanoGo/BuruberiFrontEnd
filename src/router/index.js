
import { createRouter, createWebHistory } from 'vue-router'
import DistributorList from '@/modules/distributor/pages/DistributorList.vue'
import DistributorProfile from '@/modules/distributor/pages/DistributorProfile.vue'
import ChatRoom from '@/modules/chat/pages/ChatRoom.vue';
import HomeContentComponent from "@/public/pages/home.content.component.vue";



const routes = [
    {path: '/distributors', name: 'DistributorList', component: DistributorList},
    { path: '/', name: 'Home', component: HomeContentComponent},
    { path: '/distributors/:id', name: 'DistributorProfile', component: DistributorProfile },
    {path: '/chat/:distributorId', name: 'ChatRoom', component: ChatRoom }
]

export default createRouter({ history: createWebHistory(), routes })
