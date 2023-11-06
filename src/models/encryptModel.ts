import { DataTypes } from 'sequelize';
import testDbconnection from '../config/test.db';

export default testDbconnection.define(
  'encrypt',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:'email'
    },
    password: {
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
    modelName: 'encrypt',
    tableName: 'encrypt',
    timestamps: true,
  },
);
