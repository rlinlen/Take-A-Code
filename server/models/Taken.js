module.exports = (sequelize, DataTypes, ProjectItem) => {
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

    Taken.belongsTo(ProjectItem, {foreignKey: 'PROJECTITEM_ID'});

    return Taken;
}