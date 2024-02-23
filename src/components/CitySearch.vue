<template>
    <div class="search-container">
      <input type="text" v-model="searchTerm" @input="handleInput" placeholder="Buscar ciudad..." style="margin-bottom: 10px;">
  
      <!-- Botón para mostrar u ocultar la sección de destinos -->
      <button @click="toggleCityList" class="toggle-section-button">{{ showCityList ? 'Ocultar Destinos' : 'Mostrar Destinos' }}</button>
  
      <ul class="city-list" v-if="showCityList">
        <li v-for="(city, index) in filteredCities" :key="city.id" class="city-item" :class="{ 'separator': index !== filteredCities.length - 1 }" @click="selectCity(city)">
          <span class="city-name">{{ city.name }}</span>
          <span class="city-cost"> $ {{ city.cost }}</span>
        </li>
      </ul>
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
    name: 'CitySearch',
    props: {
      cities: {
        type: Array as () => City[],
        required: true
      },
    },
    data() {
      return {
        searchTerm: '',
        showCityList: true,
      };
    },
    computed: {
      filteredCities(): City[] {
        return this.cities.filter(city =>
          city.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
    methods: {
      selectCity(city: City) {
        this.$emit('citySelected', city); // Emitir evento cuando se selecciona una ciudad
        this.addToCart(city); // Agregar la ciudad al carrito
      },
      toggleCityList() {
        this.showCityList = !this.showCityList;
      },
      handleInput() {
        if (!this.showCityList && this.searchTerm.trim() !== '') {
          this.showCityList = true;
        }
      },
      addToCart(city: City) {
        // Lógica para agregar la ciudad al carrito
        console.log('Agregando al carrito:', city);
        // Aquí puedes emitir un evento para agregar al carrito desde este componente si es necesario
      },
    },
  });
  </script>
  
  <style scoped>
  /* Estilos originales de CitySearch.vue */
  .search-container {
    margin-bottom: 20px;
  }
  
  .search-container input {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .city-list {
    list-style-type: none;
    padding: 0;
  }
  
  .city-item {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: #ffffff; /* Fondo blanco */
    color: #000000; /* Letras negras */
  }
  
  .city-item.separator {
    border-bottom: 1px solid #00a957; /* Verde corporativo de Fono Bus */
  }
  
  .city-item:hover {
    background-color: #e7f7ef; /* Verde más claro para resaltar al hacer hover */
  }
  
  .city-name {
    font-weight: bold;
  }
  
  .city-cost {
    margin-left: 10px;
  }
  
  .toggle-section-button {
    margin-bottom: 10px; /* Agregamos margen inferior */
    padding: 10px 20px;
    background-color: #007bff; /* Azul */
    color: #ffffff; /* Letras blancas */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .toggle-section-button:hover {
    background-color: #0056b3; /* Azul más oscuro al hacer hover */
  }
  </style>
  