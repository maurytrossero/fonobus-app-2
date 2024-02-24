const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configura CORS para permitir solicitudes desde el dominio de producción y http://localhost:8080
app.use(cors({
  origin: ['https://fonobus-app-2.vercel.app', 'http://localhost:8080'],
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Manejo de rutas
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

// Otras rutas y lógica del servidor...

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
