const express = require('express');
const cors = require('cors'); // Importa el módulo CORS
const fs = require('fs');
const path = require('path'); // Importa el módulo path
const app = express();
const PORT = 3000;

// Configura CORS con opciones específicas para permitir solicitudes solo desde http://localhost:8080
app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) tienen problemas con el código de estado 204
}));

app.use(express.json());

// Resto de tu código de servidor...

app.get('/cities', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'cities.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error al leer el archivo JSON.');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.put('/cities', (req, res) => {
  const citiesData = req.body;
  const filePath = path.join(__dirname, 'public', 'cities.json');

  fs.writeFile(filePath, JSON.stringify(citiesData), err => {
    if (err) {
      res.status(500).send('Error al escribir en el archivo JSON.');
    } else {
      res.send('Datos guardados correctamente en el archivo JSON.');
    }
  });
});

// Agrega más rutas según las necesidades de tu aplicación...

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
