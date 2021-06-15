const express = require('express')
const { success } = require('./helper')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app.use((req, res, next) => {
    console.log(`URL : ${req.url}`)
    next()
})

app.get('/', (req, res) => res.send('Hello, Express 5 !'))

app.get('/api/pokemons/', (req, res) => {
    const message = 'Voici la liste des pokémons présent dans le pokédex'
    res.json(success(message, pokemons))
})

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon))
})



app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))