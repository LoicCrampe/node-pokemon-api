const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const { success, getUniqueId } = require('./helper')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app 
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    // .use(express.urlencoded({ extended: true }))
    .use(express.json())

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

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))