const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/clientes.json');

// Función auxiliar para leer los clientes
const leerClientes = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return data ? JSON.parse(data) : [];
};

// GET /clientes: Devuelve todos los registros
router.get('/', (req, res) => {
    const clientes = leerClientes();
    res.json(clientes);
});

// POST /clientes: Registra un nuevo cliente con validaciones
router.post('/', (req, res) => {
    const { nombre, edad, ciudad } = req.body;

    // Validación 1: Campos completos
    if (!nombre || !edad || !ciudad) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios para acceder a las barajitas.' });
    }

    // Validación 2: Edad numérica y positiva
    const edadNum = Number(edad);
    if (isNaN(edadNum) || edadNum <= 0) {
        return res.status(400).json({ error: 'La edad debe ser un número positivo válido.' });
    }

    // Generar respuesta personalizada según la edad para Colletions
    let mensaje = `Hola ${nombre} de ${ciudad}, tienes ${edadNum} años. `;
    if (edadNum >= 18) {
        mensaje += '¡Bienvenido a Colletions! Ya puedes comprar y canjear tus barajitas de leyenda de la NBA.';
    } else {
        mensaje += 'Este producto de canje avanzado en Colletions es solo para mayores de edad.';
    }

    // Guardar en clientes.json
    const nuevoCliente = { nombre, edad: edadNum, ciudad, fecha: new Date().toISOString() };
    const clientes = leerClientes();
    clientes.push(nuevoCliente);

    // Asegurar que exista la carpeta data
    const dirData = path.dirname(dataFilePath);
    if (!fs.existsSync(dirData)) {
        fs.mkdirSync(dirData, { recursive: true });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(clientes, null, 2), 'utf-8');

    // Enviar respuesta al frontend
    res.status(201).json({ mensaje, cliente: nuevoCliente });
});

module.exports = router;
