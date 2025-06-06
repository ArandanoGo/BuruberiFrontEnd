<template>
  <div class="page">
    <HeaderContentProducer />
    <main class="card chat-wrapper">
      <div>
        <button class="back-button-inside" @click="$router.back()">
          <img src="/Icons/arrow-back.png" alt="Volver" />
        </button>
      </div>
      <div class="chat-container">
        <!-- Sidebar -->
        <aside class="chat-sidebar">
          <h4>Canales</h4>
          <ul>
            <li># team-chat</li>
            <li># projects</li>
            <li># material</li>
            <li># daily meeting</li>
          </ul>
          <h4>Direct messages</h4>
          <ul class="dm-list">
            <li v-for="user in directMessages" :key="user">
              <img src="/Icons/producter.png" class="mini-avatar" />
              {{ user }}
            </li>
          </ul>
        </aside>

        <!-- Chat Area -->
        <section class="chat-main">
          <div class="chat-header">
            <strong>{{ distributor?.name }}</strong>
          </div>

          <div class="chat-messages">
            <div class="message-bubble">
              <img :src="distributor?.avatar" class="mini-avatar" />
              <div class="bubble-content">
                <span> Ya tiene el lote de arándanos disponible? la demanda aumentó y requerimos más!</span>
              </div>
            </div>
          </div>

          <div class="chat-input">
            <input type="text" placeholder="Escribe un mensaje..." />
            <div class="tools">
              <button>📷</button>
              <button>📤</button>
              <button>➡️</button>
            </div>
          </div>
        </section>

        <!-- Profile Area -->
        <aside class="chat-profile">
          <img :src="distributor?.avatar" class="avatar-chat" />
          <h4>{{ distributor?.name }}</h4>
          <p><a href="#">Ver perfil</a></p>
          <a href="#">Ampliar llamada</a>
          <img src="/Icons/producter.png" class="image-preview" />
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import HeaderContentProducer from '@/public/component/header-content-producer.component.vue'
import { fetchDistributorById } from '@/modules/distributor/services/distributorService'

const route = useRoute()
const distributor = ref(null)
const directMessages = ['Juliana', 'María', 'Carla']

onMounted(async () => {
  distributor.value = await fetchDistributorById(route.params.distributorId)
})
</script>
