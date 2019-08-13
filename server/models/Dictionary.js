module.exports = (sequelize, DataTypes) => {
    const Dictionary = sequelize.define('dictionary', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID'   //in DB it's ID. Specify it so that when created one can get the returned id.
        },
        NAME: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DICT_TYPE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DICT_RULE: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'TAC_Dictionary',
        // options
    });

    

    return Dictionary;
}