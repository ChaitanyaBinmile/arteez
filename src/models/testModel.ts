import { DataTypes } from 'sequelize';
import testDbconnection from '../config/test.db';

export default testDbconnection.define(
    'languages',
    {
        id: {
            type: DataTypes.NUMBER, // Assuming you meant DataTypes.INTEGER instead of NUMBER
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
        },
    },{
        freezeTableName: true,
        modelName: 'languages',
        tableName: 'languages',
        timestamps: true,
    }
);
