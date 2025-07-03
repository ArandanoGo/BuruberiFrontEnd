<script>
import ToolbarHome from "../component/toolbar-home.component.vue";

export default {
  name: "home-content",
  components: { ToolbarHome },
  data() {
    return {
      testimonios: [
        { id: "juan", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: "maria", foto: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: "carlos", foto: "https://randomuser.me/api/portraits/men/65.jpg" },
        { id: "ana", foto: "https://randomuser.me/api/portraits/women/68.jpg" },
        { id: "luis", foto: "https://randomuser.me/api/portraits/men/76.jpg" },
        { id: "laura", foto: "https://randomuser.me/api/portraits/women/51.jpg" },
        { id: "ricardo", foto: "https://randomuser.me/api/portraits/men/40.jpg" },
        { id: "carmen", foto: "https://randomuser.me/api/portraits/women/22.jpg" },
        { id: "pedro", foto: "https://randomuser.me/api/portraits/men/15.jpg" },
        { id: "sofia", foto: "https://randomuser.me/api/portraits/women/60.jpg" },
      ],
      indiceActual: 0,
      testimoniosPorPagina: 3,
    };
  },
  computed: {
    testimoniosVisibles() {
      return this.testimonios.slice(
          this.indiceActual,
          this.indiceActual + this.testimoniosPorPagina
      );
    },
  },
  methods: {
    siguienteTestimonio() {
      if (this.indiceActual + this.testimoniosPorPagina < this.testimonios.length) {
        this.indiceActual += this.testimoniosPorPagina;
      }
    },
    anteriorTestimonio() {
      if (this.indiceActual - this.testimoniosPorPagina >= 0) {
        this.indiceActual -= this.testimoniosPorPagina;
      }
    },
  },
};
</script>

<template>
  <toolbar-home />

  <div class="fondo-morado">
    <div class="home-content">
      <div class="information-content">
        <div class="text-wrapper">
          <h1 class="titulo-home">{{ $t("titulo") }}</h1>
          <p class="descripcion-home">{{ $t("descripcion") }}</p>
        </div>
      </div>
      <div class="image-home">
        <img src="../../assets/cosecha.jpg" alt="Cosecha de arándanos" />
      </div>
    </div>

    <section class="seccion beneficios">
      <h2>{{ $t("beneficios.titulo") }}</h2>
      <ul>
        <li>{{ $t("beneficios.1") }}</li>
        <li>{{ $t("beneficios.2") }}</li>
        <li>{{ $t("beneficios.3") }}</li>
      </ul>
    </section>

    <section class="seccion testimonios">
      <h2>{{ $t("testimonios.titulo") }}</h2>
      <div class="contenedor-testimonios testimonios-grandes">
        <div
            class="testimonio-activo"
            v-for="(testimonio, index) in testimoniosVisibles"
            :key="index"
        >
          <img :src="testimonio.foto" :alt="$t(`testimonios.${testimonio.id}.nombre`)" class="foto-testimonio" />
          <p class="mensaje">"{{ $t(`testimonios.${testimonio.id}.mensaje`) }}"</p>
          <strong>{{ $t(`testimonios.${testimonio.id}.nombre`) }} – {{ $t(`testimonios.${testimonio.id}.rol`) }}</strong>
        </div>
      </div>
      <div class="botones-testimonios">
        <button @click="anteriorTestimonio">⬅️</button>
        <button @click="siguienteTestimonio">➡️</button>
      </div>
    </section>

    <section class="seccion planes">
      <h2>{{ $t("planes.titulo") }}</h2>
      <div class="planes-contenedor">
        <div class="plan">
          <h3>{{ $t("planes.productor.titulo") }}</h3>
          <ul>
            <li v-for="(item, i) in $tm('planes.productor.caracteristicas')" :key="i">{{ item }}</li>
          </ul>
        </div>
        <div class="plan">
          <h3>{{ $t("planes.distribuidor.titulo") }}</h3>
          <ul>
            <li v-for="(item, i) in $tm('planes.distribuidor.caracteristicas')" :key="i">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="seccion faq">
      <h2>{{ $t("faq.titulo") }}</h2>
      <ul>
        <li v-for="(item, index) in $tm('faq.items')" :key="index">
          <strong>{{ item.pregunta }}</strong> {{ item.respuesta }}
        </li>
      </ul>
    </section>

  </div>
</template>
<style scoped>
.fondo-morado {
  background-color: #572364;
  color: #f3e8ff;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  padding: 60px 40px;
  box-sizing: border-box;
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

.seccion {
  width: 100%;
  padding: 60px 40px;
  border-top: 1px solid #ffffff;
  text-align: center;
}

.beneficios ul,
.faq ul,
.planes ul {
  list-style: none;
  padding: 0;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}

.beneficios li,
.faq li,
.planes li {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #f5eafc;
}

.contenedor-testimonios {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 20px;
}

.testimonio-activo {
  flex: 1 1 250px;
  max-width: 350px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 12px;
  text-align: center;
}

.foto-testimonio {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
}

.mensaje {
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.6;
  margin: 10px 0;
}

.botones-testimonios {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.botones-testimonios button {
  background-color: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  font-size: 1.2rem;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.botones-testimonios button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.planes-contenedor {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  margin-top: 40px;
}

.plan {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 30px 40px;
  border-radius: 16px;
  width: 320px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  border: 2px solid #ffffff;
}

.plan h3 {
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: #ffffff;
}

.plan ul {
  list-style: none;
  padding-left: 0;
  text-align: left;
}

.plan li {
  margin-bottom: 10px;
  color: #f3e8ff;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}


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
  .home-content {
    padding: 30px 20px;
  }

  .titulo-home {
    font-size: 1.8rem;
  }

  .descripcion-home {
    font-size: 1rem;
  }

  .seccion {
    padding: 40px 20px;
  }

  .planes-contenedor {
    flex-direction: column;
    align-items: center;
  }
}
</style>
