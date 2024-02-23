<template>
  <div>
    <div v-if="selectedCity" class="selected-city">
      Ciudad seleccionada: {{ selectedCity.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SelectedCityLabel',
  props: {
    cities: {
      type: Array as () => { id: number; name: string; cost: number; quantity: number }[],
      required: true
    },
    selectedCity: {
      type: Object as () => { id: number; name: string; cost: number; quantity: number },
      default: null
    }
  },
  data() {
    return {
      searchTerm: '',
    };
  },
  computed: {
    filteredCities(): { id: number; name: string; cost: number; quantity: number }[] {
      if (!this.cities) {
        return [];
      }
      return this.cities.filter(city =>
        city.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
});
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}

.search-container input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.selected-city {
  margin-top: 10px;
  font-weight: bold;
}
</style>
