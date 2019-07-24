module.exports = (sequelize, DataTypes) => {
    const ProjItemDict = sequelize.define('projItemDict', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID'   //in DB it's ID. Specify it so that when created one can get the returned id.
        },
        PROJECT_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DICTIONARY_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        SEQ: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'TAC_ProjItemDict',
        // options
    });

    return ProjItemDict;
}