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

  <div class="fondo-morado">
    <div class="home-content">
      <div class="information-content">
        <div class="text-wrapper">
          <h1 class="titulo-home">Buruberi</h1>
          <p class="descripcion-home">
            Del campo a tu mesa: conecta con los mejores productores de arándanos en un solo clic.
          </p>
        </div>
      </div>

      <div class="image-home">
        <img src="../../assets/cosecha.jpg" alt="Cosecha de arándanos" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fondo-morado {
  background-color: #572364;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 40px;
  box-sizing: border-box;
}

.home-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  gap: 60px;
}

.information-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.text-wrapper {
  max-width: 600px;
}

.titulo-home {
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.descripcion-home {
  color: #f3e8ff;
  font-size: 1.4rem;
  line-height: 1.6;
}

.image-home {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-home img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 992px) {
  .home-content {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }

  .titulo-home {
    font-size: 2.2rem;
  }

  .descripcion-home {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .fondo-morado {
    padding: 30px 20px;
  }

  .titulo-home {
    font-size: 1.8rem;
  }

  .descripcion-home {
    font-size: 1rem;
  }
}
</style>
