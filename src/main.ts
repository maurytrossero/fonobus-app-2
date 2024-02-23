import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWhatsapp, faInstagram, faFacebookMessenger, faTelegram } from '@fortawesome/free-brands-svg-icons' // Remove faEnvelope from here
import { faEnvelope } from '@fortawesome/free-solid-svg-icons' // Import faEnvelope from here

// Agrega los iconos al conjunto de íconos
library.add(faWhatsapp, faInstagram, faFacebookMessenger, faTelegram, faEnvelope)

// Crea una aplicación Vue y monta el componente principal
createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon) // Registra el componente FontAwesomeIcon
  .mount('#app')
