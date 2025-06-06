<template>
  <div class="page">
    <HeaderContentProducer/>
    <main class="card">
      <div class="filters">
        <input v-model="companyFilter" placeholder="Filter by company" />
        <input v-model="locationFilter" placeholder="Filter by location" />
      </div>
      <p>{{ filteredDistributors.length }} distributors found</p>
      <div class="grid">
        <div
            class="card-user"
            v-for="d in filteredDistributors"
            :key="d.id"
            @click="goToProfile(d.id)"
        >
          <img :src="d.avatar" class="avatar" />
          <h4>{{ d.name }}</h4>
          <div class="stars">★★★★★</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchDistributors } from '../services/distributorService'
import HeaderContentProducer from '@/public/component/header-content-producer.component.vue'
const router = useRouter()
const distributors = ref([])

const companyFilter = ref('')
const locationFilter = ref('')

onMounted(async () => {
  distributors.value = await fetchDistributors()
})

function goToProfile(id) {
  router.push(`/distributors/${id}`)
}

const filteredDistributors = computed(() => {
  return distributors.value.filter(d =>
      d.company.toLowerCase().includes(companyFilter.value.toLowerCase()) &&
      d.location.toLowerCase().includes(locationFilter.value.toLowerCase())
  )
})
</script>
