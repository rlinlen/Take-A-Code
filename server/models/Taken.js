module.exports = (sequelize, DataTypes) => {
    const Taken = sequelize.define('taken', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID'   //in DB it's ID. Specify it so that when created one can get the returned id.
        },
        PROJECTITEM_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        VALUE: {
            type: DataTypes.STRING
        },
        CREATEDTIME: {
            type: DataTypes.DATE
        },
        UPN: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'TAC_Taken',
        // options
    });

    return Taken;
}