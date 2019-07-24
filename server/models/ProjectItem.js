module.exports = (sequelize, DataTypes) => {
    const ProjectItem = sequelize.define('projectItem', {
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
        NAME: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PROJECTITEM_RULE: {
            type: DataTypes.STRING
        },
        SEQ: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DICT_CURRENT: {
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'TAC_ProjectItem',
        // options
    });

    return ProjectItem;
}