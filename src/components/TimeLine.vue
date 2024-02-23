<template>
    <div class="timeline">
      <div v-for="(city, index) in cities" :key="index" class="timeline-event">
        <div class="timeline-event-dot"></div>
        <div class="timeline-event-content">
          <div class="city-info" :style="{ minWidth: cityInfoMinWidth }">
            <h3>{{ city.name }}</h3>
            <p class="cost">Costo: ${{ city.cost }}</p>
          </div>
        </div>
      </div>
    </div>
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
        cityInfoMinWidth: 'auto', // Inicialmente, el ancho mínimo es automático
      };
    },

    mounted() {
    // Calcular el ancho máximo del nombre de la ciudad
    this.cityInfoMinWidth = `${this.getMaxCityNameWidth()}px`;
    },
    methods: {
        getMaxCityNameWidth() {
        // Obtener los anchos de todos los nombres de ciudad
        const cityNamesWidths = this.cities.map(city => this.getTextWidth(city.name));

        // Obtener el ancho máximo
        return Math.max(...cityNamesWidths);
        },
        getTextWidth(text: string) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return 0;
        context.font = getComputedStyle(document.body).font;
        return context.measureText(text).width;
        }
    }



  });
  </script>
  
  <style scoped>
  .timeline {
    position: relative;
    margin: 0 auto; /* Centrar horizontalmente */
    width: 10px; /* Ancho de la línea vertical */
    background-color: #00a957; /* Verde */
  }
  
  .timeline-event {
    position: relative;
    padding: 20px 0;
    display: flex;
    align-items: center;
  }
  
  .timeline-event-dot {
    position: absolute;
    top: 0;
    left: -5px;
    width: 20px; /* Tamaño del punto */
    height: 20px; /* Tamaño del punto */
    background-color: #00a957; /* Verde */
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
  
  .timeline-event-content {
    margin-left: 25px;
  }
  
  .city-info {
    display: flex;
    align-items: center;
  }
  
  .city-info h3 {
    margin: 0;
    margin-right: 10px;
    white-space: nowrap; /* Evitar saltos de línea */
  }
  
  .city-info p {
    margin: 0;
    white-space: nowrap; /* Evitar saltos de línea */
  }


  .city-info {
  display: flex;
  align-items: center;
}

.city-info h3 {
  margin: 0;
  margin-right: 10px;
  white-space: nowrap; /* Evitar saltos de línea */
}

.city-info .cost {
  margin: 0;
  margin-left: 10px; /* Margen izquierdo para separar del nombre de la ciudad */
  white-space: nowrap; /* Evitar saltos de línea */
}
  </style>