<template>
    <div class="cart">
      <h3>Carrito de Compras</h3>
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          <span>{{ item.city.name }} - Cantidad: {{ item.quantity }} </span>
          <span> - Total: $ {{ item.total }}</span>
          <button @click="removeFromCart(index)" class="remove-from-cart-button">Eliminar</button>
        </li>
      </ul>
      <p class="total-purchase-label" v-if="totalPurchase > 0">Total de la Compra: $ {{ totalPurchase }}</p>
      <button @click="completePurchase" v-if="cart.length > 0" class="complete-purchase-button">Comprar Carrito</button>
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
    name: 'ShoppingCart',
    props: {
      cart: {
        type: Array as () => CartItem[],
        required: true
      }
    },
    computed: {
      totalPurchase(): number {
        return this.cart.reduce((total, item) => total + item.total, 0);
      }
    },
    methods: {
      removeFromCart(index: number) {
        this.$emit('removeFromCart', index);
      },
      completePurchase() {
        this.$emit('completePurchase');
      }
    }
  });
  </script>
  


  
  <style scoped>
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
  </style>
  