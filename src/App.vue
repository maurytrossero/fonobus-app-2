<template>
  <div>
    <!-- Encabezado con fondo blanco transparente -->
    <header class="header">
      <img src="https://www.fonobus.com.ar/blog/wp-content/uploads/2018/11/fonobus-logo.png" alt="Logo de Fono Bus" class="fonobus-logo">
    </header>
    <div class="app-container">
      <div class="background-image"></div>
      <ChangeDetail />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChangeDetail from './components/ChangeDetail.vue';

export default defineComponent({
  name: 'App',
  components: {
    ChangeDetail,
  },
});
</script>

<style scoped>
/* Estilos específicos para App.vue */
.app-container {
  position: relative;
  margin-top: 100px; /* Margen superior para evitar que se superponga con el encabezado */
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco transparente */
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  z-index: 2; /* Asegura que el encabezado esté encima del contenido */
  text-align: center; /* Centra el contenido horizontalmente */
}

.fonobus-logo {
  width: 370px; /* Tamaño del logo */
  margin-top: 10px; /* Espaciado superior */
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://d2idryjws00qar.cloudfront.net/aiv/gra/image/home/img-fono-bus.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  z-index: -1;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .fonobus-logo {
    width: 120px; /* Reducir tamaño del logo en dispositivos móviles */
  }

  .app-container {
    margin-top: 60px; /* Reducir margen superior en dispositivos móviles */
  }
}
</style>
