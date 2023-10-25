import { DataTypes, Model, Optional } from 'sequelize';
import dbConnection from '../config/postgres.database';

interface UserModelAttributes {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_email_verified: boolean;
  password: string;
  phone: string;
  is_phone_verified: boolean;
  country: string;
  state: string;
  city: string;
  gender: string;
  is_private: boolean;
  country_code: string;
  industry_id: number;
  is_completion: boolean;
  dob: string;
  experience:string;
  deptt_id: number;
  org_id: string;
  sub_deptt_id: number;
  functional_area: string;
  profile_image: string;
  profile_image_path:unknown;
  company_name:string;
  exp_year: number;
  exp_month: number;
  designation: string;
  role_id: number;
  type: string;
  reg_for:number;
  is_onboarding:boolean;
  is_active: boolean;
  is_deleted: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// eslint-disable-next-line max-len
export type UserModelInput = Optional<
  UserModelAttributes,
  'id' | 'username' | 'first_name' | 'last_name' | 'email'| 'is_email_verified'| 'password'| 'phone'| 'is_phone_verified'| 'country'| 'state'| 'city'| 'gender'| 'is_private'| 'country_code'| 'industry_id'| 'is_completion'|'dob'| 'experience'| 'deptt_id'|'org_id' |'sub_deptt_id'| 'functional_area'| 'profile_image'| 'profile_image_path'| 'company_name'| 'exp_year'| 'exp_month'| 'designation'| 'role_id'| 'type'|'reg_for'|'is_onboarding'| 'is_active'| 'is_deleted'>;
export type UserModelOutput = Required<UserModelAttributes>;

class UserModel extends Model<UserModelAttributes, UserModelInput> implements UserModelAttributes {
  public id!: string;
  public username!: string;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public is_email_verified!: boolean;
  public password!: string;
  public phone!: string;
  public is_phone_verified!: boolean;
  public country!: string;
  public state!: string;
  public city!: string;
  public gender!: string;
  public is_private!: boolean;
  public country_code!: string;
  public industry_id!: number;
  public is_completion!: boolean;
  public dob!: string;
  public experience!: string;
  public deptt_id!: number;
  public sub_deptt_id!: number;
  public functional_area!: string;
  public profile_image!: string;
  public profile_image_path!: unknown;
  public company_name!: string;
  public exp_year!: number;
  public exp_month!: number;
  public designation!: string;
  public role_id!: number;
  public type!: string;
  public org_id!: string;
  public reg_for!:number;
  public is_onboarding!:boolean;
  public is_active!: boolean;
  public is_deleted!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    is_phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    is_private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    country_code: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    industry_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    org_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    is_completion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dob: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    experience: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    deptt_id: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    sub_deptt_id: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    functional_area: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    profile_image: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    profile_image_path: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    company_name: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    exp_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    exp_month: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    reg_for: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    is_onboarding: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: dbConnection,
    modelName: 'UserModel',
    tableName: 'user',
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ['password', 'created_at', 'updated_at'] },
    },
    scopes: {
      withPassword: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    },
  },
);

export default UserModel;
