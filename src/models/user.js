module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: { 
                msg: 'Ce Username est déjà pris, veuillez en choisir un autre.'
            },
        },
        password: {
            type: DataTypes.STRING
        }
    })
}