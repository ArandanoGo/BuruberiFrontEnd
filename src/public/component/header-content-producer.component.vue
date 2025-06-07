<script>
import ToolbarHome from "../component/toolbar-home.component.vue";

export default {
  name: "home-content",
  components: { ToolbarHome },

  created() {
    console.log("HomeContent created");
  },
};
</script>

<template>
  <toolbar-home></toolbar-home>

  <div class="pantalla-completa">
    <div class="contenido-inicio">
      <div class="texto-inicio">
        <h1 class="titulo-grande">Buruberi</h1>
        <p class="frase-grande">
          Del campo a tu mesa: conecta con los mejores productores de arándanos en un solo clic.
        </p>
      </div>

      <div class="imagen-inicio">
        <img src="../../assets/cosecha.jpg" alt="Cosecha de arándanos" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pantalla-completa {
  width: 100%;
  height: 100vh;
  background-color: #572364;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 100px;
  box-sizing: border-box;
}

.contenido-inicio {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1600px;
  gap: 60px;
}

.texto-inicio {
  flex: 1;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.titulo-grande {
  font-size: 6rem;
  font-weight: 800;
  margin-bottom: 30px;
}

.frase-grande {
  font-size: 2.4rem;
  line-height: 1.8;
  color: #f3e8ff;
}

.imagen-inicio {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imagen-inicio img {
  width: 100%;
  max-width: 1000px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  object-fit: cover;
}

/* Responsive */
@media (max-width: 992px) {
  .contenido-inicio {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }

  .titulo-grande {
    font-size: 3rem;
  }

  .frase-grande {
    font-size: 1.4rem;
  }

  .imagen-inicio img {
    max-width: 90%;
  }
}
</style>
