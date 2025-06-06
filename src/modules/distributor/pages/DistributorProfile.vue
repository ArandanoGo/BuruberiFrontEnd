<template>
  <div class="page">
    <HeaderContentProducer />


    <main class="card card-profile" v-if="distributor">
      <button class="back-button-inside" @click="$router.back()">
        <img src="/Icons/arrow-back.png" alt="Volver" style="width: 34px;" />
      </button>

      <!-- Izquierda -->
      <div class="card-left">
        <h2>{{ distributor.name }}</h2>
        <img :src="distributor.avatar" class="avatar-large" />
        <div class="stars">★★★★☆</div>
        <button class="contact" @click="goToChat">Contactar</button>
      </div>

      <!-- Derecha -->
      <div class="card-right">

        <!-- Empresa -->
        <section>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <img src="/Icons/empresa.png" alt="Empresa" style="width: 150px; height: 120px;" />
            <div>
              <p><strong>Razón Social:</strong> {{ distributor.legalName }}</p>
              <p><strong>RUC:</strong> {{ distributor.ruc }}</p>
              <p><strong>Nombre:</strong> {{ distributor.company }}</p>
            </div>
          </div>
        </section>

        <!-- Logros -->
        <section>
          <h3>Logros:</h3>
          <div class="badge-group">
            <div v-if="distributor.badges?.includes('Nivel 01')" class="badge-item">
              <img src="/Icons/Nivel01.png" alt="Nivel 01" />
              Nivel 01
            </div>
            <div v-if="distributor.badges?.includes('Nivel 02')" class="badge-item">
              <img src="/Icons/Nivel02.png" alt="Nivel 02" />
              Nivel 02
            </div>
          </div>
        </section>

        <!-- Productores a mando -->
        <section>
          <h3>Productores a mando:</h3>
          <div class="row">
            <img v-for="p in distributor.producers" :key="p" :src="p" class="mini-avatar" />
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { fetchDistributorById } from '../services/distributorService'

import HeaderContentProducer from '@/public/component/header-content-producer.component.vue'

const route = useRoute()
const router = useRouter()
const distributor = ref(null)

onMounted(async () => {
  distributor.value = await fetchDistributorById(route.params.id)
})
function goToChat(){
  router.push(`/chat/${distributor.value.id}`)
}
</script>
