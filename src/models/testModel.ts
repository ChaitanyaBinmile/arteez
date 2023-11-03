import { DataTypes } from 'sequelize';
import testDbconnection from '../config/test.db';

export default testDbconnection.define(
  'languages',
  {
    id: {
      type: DataTypes.INTEGER,
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
      defaultValue: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    modelName: 'languages',
    tableName: 'languages',
    timestamps: true,
  },
);
