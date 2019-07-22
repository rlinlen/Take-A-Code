module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', {
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'TAC_Project',
        // options
    });

    return Project;
}