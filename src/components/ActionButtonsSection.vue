<template>
  <div>
    <!-- Botón para mostrar u ocultar la sección de compras -->
    <button @click="togglePurchasesSection" class="action-button">{{ showPurchasesSection ? 'Ocultar Ventas realizadas' : 'Mostrar Ventas realizadas' }}</button>

    <br>
    <!-- Botón para guardar informe -->
    <div class="save-sales">
      <button @click="downloadReport" class="action-button">Descargar Informe de Ventas</button>
    </div>

    <br>
    <!-- Botón para abrir el informe -->
    <div class="open-report-container">
      <input type="file" accept=".json" id="report-input" @change="readReport" class="report-input">
      <label for="report-input" class="action-button">Abrir Informe</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    showPurchasesSection: {
      type: Boolean,
      required: true
    },
    togglePurchasesSection: {
      type: Function,
      required: true
    },
    downloadReport: {
      type: Function,
      required: true
    },
    readReport: {
      type: Function,
      required: true
    }
  }
});
</script>

<style scoped>
.action-button {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #0056b3;
}

.action-button:active {
  background-color: #004081;
}

.save-sales {
  margin-top: 20px;
}

.open-report-container {
  margin-top: 20px;
}

.report-input {
  display: none;
}
</style>
