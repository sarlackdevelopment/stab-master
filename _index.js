const express = require('express')
const multer  = require('multer')
const app = express()

app.use(express.static(__dirname))
app.use(multer({dest: 'requests'}).single('filedata'))

const PORT = process.env.PORT || 80

app.get('/', (req, res) => {

    //console.log(req.query)

    //res.json({message: `API has been initialized!`})
    res.sendFile('index.html')
})



app.post("/requests", function (req, res, next) {
   
    const filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
})

app.listen(PORT, () => {
    console.log('Сервер работает')
})