const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
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
        },
        PASSWORD: {
            type: DataTypes.VIRTUAL,
            set: function (val) {
            // Remember to set the data value, otherwise it won't be validated
                //this.setDataValue('password', val);
                this.setDataValue('PASSWORDHASH', bcrypt.hashSync(val, 12));
            },
            get: function (val) {
                this.getDataValue('PASSWORDHASH');
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'TAC_User',
        // options
    });

    return User;
}