import express, { json } from 'express'
import fs from 'fs'
const app = express()
const PORT = 5000
const PATH_FILE = 'public/resources/data.json'
app.use(json())

app.get('/api/nodes', (req, res) => {
    fs.readFile(PATH_FILE, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Error reading file')
        res.send(JSON.parse(data))
    })
})

app.post('/update/nodes', (req, res) => {
    const newData = req.body
    console.log("Nueva data server: " + JSON.stringify(newData))
    fs.writeFile(PATH_FILE, JSON.stringify(newData, null, 2), (err) => {
        if (err) return res.status(500).send('Error al escribir el archivo');
        res.send(req.body)
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});