<template>
  <section class="timeline">
    <div class="route-label">
      <p>Ruta 19</p>
    </div>
    <ul>
      <li v-for="(city, index) in cities" :key="city.id">
        <div :class="index % 2 === 0 ? 'timeline-event even' : 'timeline-event odd'">
          <span>{{ city.name }}</span>
          <span> Costo: ${{ city.cost }}</span>
        </div>
      </li>
    </ul>
    <div class="bottom-label">
      <p>Llegada</p>
    </div>
  </section>
</template>


  <script lang="ts">
  import { defineComponent } from 'vue';
  
  interface City {
    id: number;
    name: string;
    cost: number;
    quantity: number;
  }
  
  export default defineComponent({
    data() {
      return {
        cities: [
          { id: 1, name: 'Km 531', cost: 1130, quantity: 1 },
          { id: 2, name: 'Devoto', cost: 1360, quantity: 1 },
          { id: 3, name: 'Jeanmaire', cost: 1740, quantity: 1 },
          { id: 4, name: 'La Francia', cost: 2310, quantity: 1 },
          { id: 5, name: 'Km 581', cost: 2650, quantity: 1 },
          { id: 6, name: 'El Tío', cost: 3060, quantity: 1 },
          { id: 7, name: 'El Fuertecito', cost: 3430, quantity: 1 },
          { id: 8, name: 'Arroyito', cost: 3750, quantity: 1 },
          { id: 9, name: 'Puente del Río Segundo', cost: 3570, quantity: 1 },
          { id: 10, name: 'Tránsito', cost: 3790, quantity: 1 },
          { id: 11, name: 'Santiago Temple', cost: 4840, quantity: 1 },
          { id: 12, name: 'Pedro Vivas', cost: 4900, quantity: 1 },
          { id: 13, name: 'Río Primero', cost: 5190, quantity: 1 },
          { id: 14, name: 'K711 Malvinas Argentinas', cost: 6770, quantity: 1 },
          { id: 15, name: 'Córdoba', cost: 7920, quantity: 1 },
          { id: 16, name: 'Córdoba - Carlos Paz', cost: 1600, quantity: 1 },
        ] as City[],
      };
    }
  });
  </script>
  
  <style scoped>
  /* reglas CSS estructurales para los elementos de la lista*/

  /* Cambiar fuente a color blanco y aplicar otro estilo de fuente */
.timeline ul li div {
  color: #ffffff; /* Cambiar color de fuente a blanco */
  font-family: 'Roboto', sans-serif; /* Cambiar la fuente a Roboto o una fuente sans-serif alternativa */
  font-size: 16px; /* Tamaño de fuente */
}

  .timeline ul li {
  list-style-type: none;
  position: relative;
  width: 6px;
  margin: 0 auto;
  padding-top: 50px;
  background: #4f8840; /*Color del Timeline*/
}
.timeline ul li::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: inherit;
}

.timeline ul li div {
  position: relative;
  bottom: 0;
  width: 400px;
  padding: 15px;
  background: #215530; /* Código hexadecimal para un tono de verde */
}
.timeline ul li div::before {
  content: '';
  position: absolute;
  bottom: 7px;
  width: 0;
  height: 0;
  border-style: solid;
}

/*estilos para nuestros elementos impares:*/
.timeline ul li:nth-child(odd) div {
  left: 45px;
}
.timeline ul li:nth-child(odd) div::before {
  left: -15px;
  border-width: 8px 16px 8px 0;
  border-color: transparent #215530 transparent transparent; /* Cambia el color aquí */
}
/*stilos de nuestros elementos pares:*/
.timeline ul li:nth-child(even) div {
  /*left: -439px;*/
  left: -470px;
}
.timeline ul li:nth-child(even) div::before {
  right: -15px;
  border-width: 8px 0 8px 16px;
  border-color: transparent transparent transparent #215530; /* Cambia el color aquí */
}

/* Estilos para el cartel "Ruta 19" */
.route-label {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
}

.route-label p {
  font-size: 20px;
  margin: 0;
  padding: 10px 20px; /* Ajusta según sea necesario */
  background-color: #ffffff; /* Fondo blanco */
  color: #000000; /* Texto negro */
  display: inline-block;
  position: relative;
  z-index: 1;
}

/* Estilos para el contenedor de la línea de tiempo */
.timeline {
  position: relative;
}

/* Estilos para el cartel "Ruta 19" */
.route-label {
  position: absolute;
  top: -50px; /* Ajusta según sea necesario para centrarlo verticalmente */
  left: 52%;
  transform: translateX(-50%);
  text-align: center;
  width: 200px; /* Ancho del rectángulo */
  background-color: #ffffff; /* Fondo blanco */
  border: 2px solid #000000; /* Borde fino negro */
  border-bottom-color: #ffffff; /* Borde inferior blanco */
  font-family: Arial, sans-serif; /* Fuente típica de carteles de ruta */
}

.route-label p {
  margin: 0;
  padding: 10px;
  font-size: 20px; /* Tamaño de fuente */
  color: #000000; /* Texto negro */
}

/* Triángulo inferior */
.route-label::after {
  content: '';
  position: absolute;
  bottom: -12px; /* Altura del triángulo */
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 100px solid transparent; /* Ancho del triángulo */
  border-right: 100px solid transparent; /* Ancho del triángulo */
  border-top: 10px solid #ffffff; /* Altura del triángulo y color del fondo */
  border-left-color: 2px black;
  border-right-color: 2px black;
}



  </style>
  