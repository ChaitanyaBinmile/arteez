import { DataTypes } from 'sequelize';
import testDbconnection from '../config/test.db';


const languages = testDbconnection.define(
    'languages',
    {
        id : {
            type : DataTypes.NUMBER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true,
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        is_active : {
            type : DataTypes.BOOLEAN
        },
        is_deleted : {
            type : DataTypes.BOOLEAN
        },
    },{
        freezeTableName : true,
        modelName : 'languages',
        tableName : 'languages',
        timestamps : true,
    }
);
module.exports = languages;