module.exports = (sequelize, DataTypes, Dictionary) => {
    const DictionaryItem = sequelize.define('dictionaryItem', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID'   //in DB it's ID. Specify it so that when created one can get the returned id.
        },
        DICT_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        VALUE: {
            type: DataTypes.STRING
        },
        DISPLAY: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'TAC_DictionaryItem',
        // options
    });

    Dictionary.hasMany(DictionaryItem, {foreignKey: 'DICT_ID'}); //, sourceKey: 'id'
    DictionaryItem.belongsTo(Dictionary, {foreignKey: 'DICT_ID'}); //, sourceKey: 'id'

    return DictionaryItem;
}