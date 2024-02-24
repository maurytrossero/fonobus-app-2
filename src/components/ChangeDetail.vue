<template>
  <div class="change-detail-container">

    <h2 class="title">Venta de pasajes</h2>

    <!-- Campo de búsqueda -->
    <div class="search-container">
      <input type="text" v-model="searchTerm" placeholder="Buscar ciudad...">
    </div>

    <!-- Botón para mostrar u ocultar la sección de destinos -->
    <button @click="toggleCityList"  class="toggle-section-button">{{ showCityList ? 'Ocultar Destinos' : 'Mostrar Destinos' }}</button>

    <!-- Listado de ciudades -->
    <ul class="city-list" v-if="showCityList">
      <li v-for="(city, index) in filteredCities" :key="city.id" class="city-item" :class="{ 'separator': index !== filteredCities.length - 1 }" @click="selectCity(city)">
        <span class="city-name">{{ city.name }}</span>
        <span class="city-cost"> $ {{ city.cost }}</span>
      </li>
    </ul>

    <!-- Etiqueta para mostrar la ciudad seleccionada -->
    <div class="selected-city" v-if="selectedCity">
      <label>Ciudad Seleccionada:</label>
      <div>
      <span>{{ selectedCity.name }}</span>
      <span> - $ {{ selectedCity.cost }}</span>
      </div>
      
      <!-- Sección de edición de ciudad -->
      <div class="edit-section" v-if="isEditing" :class="{ 'border-white': isEditing }">
        <!-- Campos de edición para el nombre y el precio -->
        <div class="edit-field">
          <label>Nombre ciudad/destino: </label>
          <input type="text" v-model="selectedCityEdit.name" class="edit-input">
        </div>
        <div class="edit-field">
          <label>Precio pasajes: </label>
          <input type="number" v-model.number="selectedCityEdit.cost" class="edit-input">
        </div>
        <!-- Botones para guardar o cancelar la edición -->
        <div class="button-container">
          <button @click="saveEdit" class="edit-button save">Guardar</button>
          <button @click="cancelEdit" class="edit-button cancel">Cancelar</button>
        </div>
      </div>
      <!-- Botón para modificar ciudad -->
      <button @click="toggleEditSection" v-else class="edit-button">Modificar Ciudad</button>




    </div>

    <!-- Input para la cantidad de pasajes vendidos -->
    <div class="ticket-input" v-if="selectedCity">
      <label for="ticketQuantity">Cantidad de Pasajes: </label>
      <input type="number" id="ticketQuantity" v-model.number="selectedCity.quantity" min="1">
    </div>

    <!-- Etiqueta para mostrar el total de la compra -->
        <div class="total-purchase" v-if="selectedCity">
      <label for="totalPurchase">Total: $ </label>
      <span>{{ totalTicketsCost }}</span>
    </div>

    <!-- Botón para agregar al carrito -->
    <button @click="addToCart" v-if="selectedCity" class="add-to-cart-button">Agregar al Carrito</button>

    <!-- Carrito de compras -->
    <div class="cart" v-if="cart.length > 0">
      <h3>Carrito de Compras</h3>
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          <span>{{ item.city.name }} - Cantidad: {{ item.quantity }} </span>
          <span> - Total: $ {{ item.total }}</span>
          <button @click="removeFromCart(index)" class="remove-from-cart-button">Eliminar</button>
        </li>
      </ul>
      <p class="total-purchase-label" v-if="totalPurchase > 0">Total de la Compra: $ {{ totalPurchase }}</p>

      <!-- Botón para realizar la compra del carrito -->
      <button @click="completePurchase" v-if="cart.length > 0" class="complete-purchase-button">Comprar Carrito</button>
    </div>


    <!-- Input para el pago del cliente -->
    <div class="payment-input">
      <label for="payment">Pago del Cliente: $ </label>
      <input type="number" id="payment" v-model="paymentAmount">
    </div>

    <!-- Etiqueta para mostrar el cambio a devolver al cliente -->
    <div class="change-label" v-if="cart.length > 0 && paymentAmount > 0">
      <label for="change">Cambio para el Cliente: </label>
      <span>{{ changeToReturn }}</span>
    </div>

    <!-- Separador -->
    <div class="section-separator"></div>

    <!-- Botón para mostrar u ocultar la sección de compras -->
    <button @click="togglePurchasesSection" class="toggle-section-button">{{ showPurchasesSection ? 'Ocultar Ventas realizadas' : 'Mostrar Ventas realizadas' }}</button>

    <!-- Sección para mostrar las compras realizadas 
    <div class="purchases-section" v-if="showPurchasesSection">
      <h3>Ventas Realizadas</h3>
      <ul>
        <li v-for="(purchase, index) in purchases" :key="index">
          <ul>
            <li v-for="(item, i) in purchase.items" :key="i">
              <span>{{ item.city.name }} - Cantidad: {{ item.quantity }} - Total: $ {{ item.total }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <p>Total de Ventas del Día: $ {{ totalSales }}</p>
    </div>
-->
    <!-- Sección para mostrar las compras realizadas -->
    <div class="purchases-section" v-if="showPurchasesSection">
      <h3>Ventas Realizadas</h3>
      <ul>
        <li v-for="(purchase, index) in purchases" :key="index">
          <p>Fecha de compra: {{ purchase.datetime }}</p> <!-- Mostrar la fecha de compra -->
          <ul>
            <li v-for="(item, i) in purchase.items" :key="i">
              <span>{{ item.city.name }} - Cantidad: {{ item.quantity }} - Total: $ {{ item.total }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <p>Total de Ventas del Día: $ {{ totalSales }}</p>
    </div>

    <!-- Contenedor para el botón de guardar informe -->
    <div class="save-sales">
      <!-- Botón para guardar informe -->
          <button @click="downloadReport" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Descargar Informe de Ventas</button>
    </div>

    <!-- Botón para abrir el informe -->
    <div class="open-report-container">
      <input type="file" accept=".json" id="report-input" @change="readReport" class="report-input">
      <label for="report-input" class="report-label">Abrir Informe</label>
    </div>


<!-- Sección para mostrar el informe -->
<div v-if="reportData">
  <h3>Informe de Ventas</h3>
  <p>Fecha: {{ reportData.date }}</p>
  <ul>
    <li v-for="(item, index) in reportData.sales" :key="index">
      <p>Fecha de compra: {{ item.datetime }}</p>
      <ul>
        <li v-for="(sale, i) in item.items" :key="i">
          <span>{{ sale.city.name }} - Cantidad: {{ sale.quantity }} - Total: $ {{ sale.total }}</span>
        </li>
      </ul>
    </li>
  </ul>
</div>


    <!-- Contenedor para el botón de resetear ventas -->
    <div class="reset-sales-container">
      <!-- Botón para resetear las ventas realizadas -->
      <button @click="resetSales" class="reset-sales-button">Resetear Ventas</button>
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

interface CartItem {
  city: City;
  quantity: number;
  total: number;
}

interface Purchase {
  datetime: string;
  items: CartItem[];
}

export default defineComponent({
  name: 'ChangeDetail',
  data() {
    return {
      cities: [] as City[],
      paymentAmount: 0,
      selectedCity: null as City | null,
      selectedCityEdit: {
        name: '',
        cost: 0
      },
      showEditSection: false,
      searchTerm: '',
      cart: [] as CartItem[],
      purchases: JSON.parse(localStorage.getItem('purchases') || '[]') as Purchase[],
      showPurchasesSection: false,
      showCityList: true,
      showReportSection: false,
      reportData: null as null | { date: string; sales: any[] }, // Inicializado como null
      isEditing: false, // Agrega esta propiedad para controlar si se está editando o no
    };
  },
  mounted() {
    //  localStorage.clear();
    // Inicializar localStorage si es necesario
    if (!localStorage.getItem('purchases')) {
      localStorage.setItem('purchases', '[]');
    }
    this.loadCities(); // Carga las ciudades al inicio de la aplicación

  },

  computed: {
    filteredCities(): City[] {
      return this.cities.filter(city =>
        city.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },

    totalTicketsCost(): number {
      return this.selectedCity ? this.selectedCity.cost * this.selectedCity.quantity : 0;
    },

    totalPurchase(): number {
      return this.cart.reduce((total, item) => total + item.total, 0);
    },

    changeToReturn(): number | null {
      if (this.cart.length === 0) {
        return null;
      }

      const totalPurchase = this.cart.reduce((total, item) => total + item.total, 0);
      return this.paymentAmount - totalPurchase;
    },
    totalSales(): number {
      let total = 0;

      // Iterar sobre cada compra y sumar los totales de todos los elementos
      this.purchases.forEach((purchase: Purchase) => {
        purchase.items.forEach((item: CartItem) => {
          total += item.total;
        });
      });

      return total;
    },
  },

  methods: {
    selectCity(city: City) {
      this.selectedCity = city;
    },

    loadCities() {
      // Realiza una solicitud HTTP GET para leer los datos desde el archivo JSON
      fetch('/cities.json')
        .then(response => response.json())
        .then(data => {
          // Almacena los datos leídos en la variable cities
          this.cities = data.cities;
        })
        .catch(error => {
          console.error('Error al cargar las ciudades:', error);
        });
    },

    editCity() {
      if (this.selectedCity) {
        // Guardar los valores originales
        const originalName = this.selectedCity.name;
        const originalCost = this.selectedCity.cost;

        // Aplicar los cambios si el nombre no está vacío y el precio no es null o 0
        if (this.selectedCityEdit.name.trim() !== '') {
          this.selectedCity.name = this.selectedCityEdit.name;
        }
        if (this.selectedCityEdit.cost !== null && this.selectedCityEdit.cost !== 0) {
          this.selectedCity.cost = this.selectedCityEdit.cost;
        }

        // Limpiar los campos de edición
        this.selectedCityEdit.name = '';
        this.selectedCityEdit.cost = 0;

        // Actualizar el archivo JSON
        this.updateCitiesInJSON();

        // Actualizar el localStorage si es necesario
        // (Debes agregar la lógica para actualizar el localStorage según tus necesidades específicas)
      }
    },

    saveEdit() {
  if (this.selectedCity) {
    // Guardar el nombre original antes de realizar cambios
    const originalName = this.selectedCity.name;
    console.log("Nombre original:", originalName);

        // Asignar el nombre editado a la ciudad seleccionada si no está vacío o nulo
        if (this.selectedCityEdit.name && this.selectedCityEdit.name.trim() !== '') {
          this.selectedCity.name = this.selectedCityEdit.name.trim();
          console.log("Nuevo nombre asignado:", this.selectedCity.name);
          console.log(this.selectedCity); // Aquí agregas el console.log()
        }

        // Verificar si el precio editado es válido (no nulo ni 0)
        if (this.selectedCityEdit.cost !== null && this.selectedCityEdit.cost !== 0) {
          // Si el precio editado es válido, asignarlo al precio de la ciudad seleccionada
          this.selectedCity.cost = this.selectedCityEdit.cost;
          console.log("Nuevo costo asignado:", this.selectedCity.cost);
        }

        // Limpiar los campos de edición
        this.selectedCityEdit.name = '';
        this.selectedCityEdit.cost = 0;
        console.log("Campos de edición limpiados.");

        // Desactivar la edición y ocultar la sección de edición
        this.isEditing = false;
        console.log("Edición desactivada y sección ocultada.");

        // Actualizar el archivo JSON
        this.updateCitiesInJSON();
        console.log("Actualización del archivo JSON solicitada.");

        // Actualizar el localStorage si es necesario
        // (Debes agregar la lógica para actualizar el localStorage según tus necesidades específicas)
      }
    },


    updateCitiesInJSON() {
      const data = { cities: this.cities };
      let url;

      if (process.env.NODE_ENV === 'production') {
        url = 'https://fonobus-app-2.vercel.app/cities';
      } else {
        url = 'http://localhost:3000/cities';
      }

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          console.log('Los cambios se guardaron correctamente en el archivo JSON.');
        } else {
          console.error('Error al guardar los cambios en el archivo JSON.');
        }
      })
      .catch(error => {
        console.error('Error al guardar los cambios en el archivo JSON:', error);
      });
    },



    toggleEditSection() {
      this.isEditing = !this.isEditing; // Cambiar el estado de isEditing
    },


    cancelEdit() {
      // Verifica si selectedCity no es nulo
      if (this.selectedCity !== null) {
        // Reiniciar los valores de edición a los originales
        this.selectedCityEdit.name = this.selectedCity.name;
        this.selectedCityEdit.cost = this.selectedCity.cost;

        // Desactivar la edición y ocultar la sección de edición
        this.isEditing = false;
      }
    },


    saveCities() {
      // Guardar los datos en el archivo JSON no es necesario ya que estarían en el archivo estático
      // Solo necesitas cargarlos al inicio de la aplicación y no guardarlos nuevamente
      console.warn('No es necesario guardar los datos en el archivo JSON.');
    },


    addToCart() {
      const existingItemIndex = this.cart.findIndex(item => item.city.id === this.selectedCity!.id);

      if (existingItemIndex !== -1) {
        this.cart[existingItemIndex].quantity = this.selectedCity!.quantity;
        this.cart[existingItemIndex].total = this.selectedCity!.quantity * this.selectedCity!.cost;
      } else {
        this.cart.push({
          city: this.selectedCity!,
          quantity: this.selectedCity!.quantity,
          total: this.selectedCity!.quantity * this.selectedCity!.cost,
        });
      }

      this.selectedCity = null;
    },

    removeFromCart(index: number) {
      this.cart.splice(index, 1);
    },

    completePurchase() {
      const currentDate = new Date(); // Obtener la fecha y hora actual

      // Formatear la fecha y hora en una cadena legible
      const formattedDate = currentDate.toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const purchase: Purchase = {
        datetime: formattedDate, // Usar la fecha y hora formateada
        items: this.cart,
      };

      const purchases = JSON.parse(localStorage.getItem('purchases') || '[]') as Purchase[];
      purchases.push(purchase);
      localStorage.setItem('purchases', JSON.stringify(purchases));

      this.cart = [];
    },

    togglePurchasesSection() {
      this.showPurchasesSection = !this.showPurchasesSection;
    },

    toggleCityList() {
      this.showCityList = !this.showCityList;
    },

    resetSales() {
      // Mostrar una alerta para confirmar si el usuario está seguro de resetear las ventas
      if (confirm('¿Estás seguro de que quieres resetear las ventas realizadas?')) {
        // Limpiar el localStorage
        localStorage.removeItem('purchases');
        // Reiniciar el arreglo de compras
        this.purchases = [];
        // También podrías añadir otra lógica aquí, como reiniciar otras variables relacionadas con las ventas
      }
    },

    //Metodo para guardar reporte del dia
    downloadReport() {
      const currentDate = new Date(); // Obtener la fecha y hora actual
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = String(currentDate.getFullYear());

      const formattedDate = `Informe-Ventas-${day}-${month}-${year}`;

      // Agregar la fecha al informe de ventas antes de convertirlo a JSON
      const salesReport = {
        date: formattedDate, // Agregar la fecha actual al informe
        sales: this.purchases, // Usar las ventas existentes
      };

      // Convertir el informe de ventas a JSON
      const salesReportJSON = JSON.stringify(salesReport);

      // Crear un objeto Blob con el JSON
      const blob = new Blob([salesReportJSON], { type: 'application/json' });

      // Crear un enlace <a> para descargar el archivo
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formattedDate}.json`; // Nombre del archivo de descarga con formato de fecha
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    //Metodo para leer informe guardado
    readReport(event: Event) {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      
      if (!file) return; // No se seleccionó ningún archivo
      
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const salesReport = JSON.parse(reader.result as string);

          // Validar si el informe tiene el formato esperado
          if (salesReport && salesReport.date && salesReport.sales) {
            // Mostrar la sección del informe con la información leída
            this.showReportSection = true;
            this.reportData = salesReport;
          } else {
            alert('El archivo seleccionado no tiene un formato válido.');
          }
        } catch (error) {
          alert('Ocurrió un error al leer el archivo. Asegúrate de seleccionar un archivo JSON válido.');
          console.error(error);
        }
      };
      
      reader.readAsText(file);
    }


  },
});
</script>


<style scoped>
/* Estilos mejorados para el componente de detalle de cambios */
body {
  font-family: 'Open Sans', Arial, sans-serif; /* Fuente Open Sans para todo el documento */
}

.change-detail-container {
  max-width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #005a3c; /* Verde corporativo de Fono Bus */
  border-radius: 10px;
  color: #ffffff; /* Letras blancas */
}

.title {
  margin-bottom: 20px;
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



/* Estilos para el input de cantidad de pasajes */
.ticket-input {
  margin-top: 20px;
}

.ticket-input label {
  font-weight: bold;
}

.ticket-input input {
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Estilos para el input */
.input-field {
  padding: 8px; /* Añadir espacio dentro del input */
  border: 1px solid #ccc; /* Añadir borde al input */
  border-radius: 4px; /* Añadir esquinas redondeadas al input */
  width: 200px; /* Ajustar el ancho del input según sea necesario */
  font-size: 16px; /* Tamaño de fuente del input */
}

/* Estilos para el input de pago del cliente */
.payment-input {
  margin-top: 20px;
}

.payment-input label {
  font-weight: bold;
}

.payment-input input {
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Estilos para la etiqueta de cambio a devolver */
.change-label {
  margin-top: 20px;
}

.change-label label {
  font-weight: bold;
}

.change-label span {
  display: block;
  margin-top: 5px;
}

/* Estilos para la sección de ciudad seleccionada */



.search-container {
  margin-bottom: 20px;
}

.search-container input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Estilos para el botón "Agregar al Carrito" */
.add-to-cart-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff; /* Azul */
  color: #ffffff; /* Letras blancas */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  background-color: #0056b3; /* Azul más oscuro al hacer hover */
}

/* Estilos para el botón "Eliminar" del carrito */
.remove-from-cart-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #dc3545; /* Rojo */
  color: #ffffff; /* Letras blancas */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-from-cart-button:hover {
  background-color: #bd2130; /* Rojo más oscuro al hacer hover */
}

/* Estilos para el carrito de compras */
.cart {
  margin-top: 20px;
  padding: 20px;
  background-color: #f0f0f0; /* Fondo gris claro */
  border-radius: 5px;
  color: #000000; /* Letras negras */
}

.cart h3 {
  margin-bottom: 10px;
}

.cart ul {
  list-style-type: none;
  padding: 0;
}

.cart li {
  margin-bottom: 10px;
}

/* Estilos para el elemento del "Total de la Compra" en el carrito */
.total-purchase-label {
  font-weight: bold;
  font-size: 18px; /* Tamaño de fuente más grande */
  color: #007bff; /* Color azul para resaltar */
}

.toggle-section-button {
  margin-bottom: 10px;
}
.purchases-section {
  /* Estilos para la sección de compras */
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 10px;
}

/* Estilos para el botón de mostrar/ocultar compras */
.toggle-section-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 10px;
}

.toggle-section-button:hover {
  background-color: #0056b3;
}

/* Estilos para el botón de comprar carrito */
.complete-purchase-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.complete-purchase-button:hover {
  background-color: #218838;
}

.section-separator {
    border-top: 1px solid #ccc; /* Establece el grosor y el color de la línea */
    margin: 20px 0; /* Agrega espacio alrededor de la línea */
}

.reset-sales-button {
  background-color: #ff0000; /* Rojo para indicar una acción peligrosa */
  color: #ffffff; /* Texto blanco para mayor contraste */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset-sales-button:hover {
  background-color: #cc0000; /* Color más oscuro al pasar el cursor para indicar interactividad */
}

.reset-sales-container {
  margin-top: 10px; /* Ajusta el margen superior según sea necesario */
}
.reset-sales-button:active {
  background-color: #aa0000; /* Color aún más oscuro cuando se hace clic para indicar que se está ejecutando una acción */
}

.download-report-button {
  background-color: #4CAF50; /* Color de fondo */
  border: none;
  color: white; /* Color del texto */
  padding: 10px 20px; /* Espaciado interno */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px; /* Bordes redondeados */
}
.save-sales {
  margin-top: 10px; /* Ajusta el margen superior según sea necesario */
}

.open-report-container {
  margin-top: 20px; /* Espacio entre el botón y otros elementos */
}

.report-input {
  display: none; /* Oculta el input real */
}

.report-label {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff; /* Azul para indicar una acción positiva */
  color: white; /* Texto blanco para mayor contraste */
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-block; /* Añadimos esto para que ocupe solo el espacio necesario */
}

.report-label:hover {
  background-color: #0056b3; /* Color más oscuro al pasar el cursor para indicar interactividad */
}

.edit-section {
  margin-top: 20px;
}

.edit-field {
  margin-bottom: 10px;
}

.save-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.edit-input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

.edit-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #45a049;
}

/* Estilos para la sección de edición */
.edit-section {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc; /* Borde más fino */
  border-radius: 5px;
}

/* Estilos para los campos de edición */
.edit-field {
  margin-bottom: 10px;
}

.edit-field label {
  display: block;
  margin-bottom: 5px;
}

.edit-input {
  width: calc(100% - 20px); /* Ajustar el ancho para que quepan dentro del borde */
  padding: 8px; /* Reducir el padding para evitar que se salgan del borde */
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Estilos para los botones */
.button-container {
  text-align: right;
}

.edit-button {
  padding: 8px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button.save {
  background-color: #4CAF50;
  color: white;
}

.edit-button.cancel {
  background-color: #f44336;
  color: white;
}

/* Estilos para el botón de modificar ciudad */
.edit-button.modificar {
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}



</style>
