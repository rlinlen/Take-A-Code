module.exports = (sequelize, DataTypes, Dictionary) => {
    const DictionaryItem = sequelize.define('dictionaryItem', {
        Dict_Id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Value: {
            type: DataTypes.STRING
        },
        Display: {
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