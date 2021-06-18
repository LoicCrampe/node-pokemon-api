const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize') // Opérateur sequelize, sert entre autre à faire une recherche moins strict
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        if(req.query.name) {
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            if(name.length < 2) {
                const message = "Le terme de recherche doit contenir au minimum 2 caractères."
                return res.status(400).json({ message })
            }

            return Pokemon.findAndCountAll({
                where: {
                    name: { // 'name' est la propriété du modèle pokémon
                        /* [Op.eq]: name // 'name' est le critère de la recherche */
                        // Op.eq sert à afficher les pokemons avec un nom exact ex: 'Bulbizarre' affichera Bulbizarre, 'Bulb' affichera aucun pokémon
                        [Op.like]: `%${name}%` // 'name' est le critère de la recherche 
                        // Op.like sert à afficher les pokemons qui contiennent le critère de recherche ex: 'ou' affichera Roucool et Goupix
                    }
                },
                order: ['name'],
                limit: limit
            })
            .then(({count, rows}) => {
                const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}.`
                res.json({ message, data: rows })
            })
        } else {
            Pokemon.findAll({order: ['name']})
            .then(pokemons => {
                const message = 'La liste des pokémons a bien été récupérée.'
                res.json({ message, data: pokemons })
            })
            .catch(error => {
                const message = "La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants."
                res.status(500).json({ message, data: error })
            })
        }
    })
}