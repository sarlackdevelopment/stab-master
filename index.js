const express = require('express');
const app = express();

const PORT = process.env.port || 80;

app.get('/', (req, res) => {
    res.json({message: `API has been initialized!`});
})

app.listen(PORT, () => {
    console.log('Сервер работает');
})