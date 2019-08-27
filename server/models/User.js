module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('taken', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID'   //in DB it's ID. Specify it so that when created one can get the returned id.
        },
        UPN: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ROLE: {
            type: DataTypes.STRING
        },
        NAME: {
            type: DataTypes.STRING
        },
        PASSWORDHASH: {
            type: DataTypes.STRING
        },
        STATUS: {
            type: DataTypes.INTEGER,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'TAC_User',
        // options
    });

    return User;
}