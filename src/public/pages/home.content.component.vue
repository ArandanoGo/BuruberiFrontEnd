<script>
import ToolbarHome from "../component/toolbar-home.component.vue";

export default {
  name: "home-content",
  components: {ToolbarHome},



  created() {
    console.log('HomeContent created');
  }
}
</script>

<template>

  <toolbar-home></toolbar-home>

  <div class="home-content" >

    <div class="information-content">
      <div style="width: 80%">
        <h1>Buruberi</h1>
        <p>Del campo a tu mesa: conecta con los mejores productores de arándanos en un solo clic.</p>
      </div>
    </div>


    <div class="image-home">
      <img src="../../assets/cosecha.jpg" alt="Cosecha de arándanos" />
    </div>

  </div>

</template>

<style scoped>

.home-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;

}


.home-content .information-content {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  padding: 20px;

}

.home-content .image-home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  max-width: 100%;
  max-height: 100%;
}
.image-home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  padding: 20px;
  background-color: #fff;
}

.image-home img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px; /* Opcional: bordes redondeados */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Opcional: sombra */
}


</style>