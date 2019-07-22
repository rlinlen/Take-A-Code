module.exports = (sequelize, DataTypes) => {
    const Dictionary = sequelize.define('dictionary', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID'   //in DB it's ID. Specify it so that when created one can get the returned id.
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Dict_Rule: {
            type: DataTypes.STRING
        },
        Dict_Current: {
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'TAC_Dictionary',
        // options
    });

    

    return Dictionary;
}