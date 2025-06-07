<script>
import LanguageSwitcher from "./language-switcher.component.vue";

export default {
  name: "toolbar-home",
  components: { LanguageSwitcher },

  data() {
    return {
      items: [
        { label: 'Productor', to: "/MenuP", icon: 'pi pi-user' },
        { label: 'Distribuidor', to: "/MenuD", icon: 'pi pi-user-plus' }
      ]
    };
  },

  created() {
    console.log('ToolbarHome created for Buruberi');
  }
}
</script>

<template>
  <div class="toolbar-container z-auto">
    <pv-toolbar class="w-full fixed top-0 left-0 pr-6 pl-6" style="background-color:#8B0000; max-height:80px; width:100%; height:100%">

      <template #start>
        <!-- Cambiar por el logo de Buruberi si ya lo tienes -->
        <img src="../../assets/logo.jpg" alt="Buruberi Logo" height="55" />
      </template>

      <template #end>
        <div class="button-options m-1">
          <router-link v-for="item in items" :key="item.label" :to="item.to">
            <pv-button class="options m-1">
              <i :class="item.icon" class="mr-2"></i>
              {{ $t(item.label) }}
            </pv-button>
          </router-link>
        </div>

        <language-switcher />
      </template>

    </pv-toolbar>
  </div>
</template>

<style scoped>
.button-options {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.button-options .options {
  background-color: #F5F5DC;
  color: #000000;
  font-weight: normal;
  border: solid 2px #CFAE75;
}

.button-options .options:not(:disabled):hover {
  background-color: #CFAE75;
  color: white;
  font-weight: bold;
  border: solid 2px #CFAE75;
}
</style>
