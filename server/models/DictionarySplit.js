module.exports = (sequelize, DataTypes, Dictionary) => {
    const DictionarySplit = sequelize.define('dictionarySplit', {
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
        DICT_SPLITVALUE: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DICT_CURRENT: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'TAC_DictionarySplit',
        // options
    });

    Dictionary.hasMany(DictionarySplit, {foreignKey: 'DICT_ID'}); //, sourceKey: 'id'
    //DictionarySplit.belongsTo(Dictionary, {foreignKey: 'DICT_ID'}); //, sourceKey: 'id'

    return DictionarySplit;
}