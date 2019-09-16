module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', {
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
        NOTE: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'TAC_Project',
        // options
    });

    return Project;
}