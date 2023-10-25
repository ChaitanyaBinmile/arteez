import { DataTypes, Model, Optional } from 'sequelize';
import dbConnection from '../config/postgres.database';



export interface JobAttributes {
  id: string;
  job_title: string;
  job_description: string;
  job_slug: string| null;
  airline_id: string;
  country: string;
  state: string;
  city: string;
  job_role: string;
  job_type_id: number;
  job_mode_id: number;
  job_image: string;
  job_image_path: string;
  job_url: string;
  source: string;
  industry_id: number;
  designation_id: number;
  deptt_id: number;
  sub_deptt_id: number;
  org_id: string;
  currency_id: number;
  exp_min: number;
  exp_max: number;
  ctc_min: number;
  ctc_max: number;
  no_of_position: number;
  application_count: number;
  start_date?: Date;
  end_date?: Date;
  education: string;
  is_verified: boolean;
  is_active: boolean;
  is_deleted: boolean;
  is_salary_hidden: boolean;
  created_by_id: string;
  updated_by_id: string;
  created_at?: Date;
  updated_at?: Date;
  publish_status: string;
  job_json_data: object;
}

// eslint-disable-next-line max-len
export type JobInput = Optional<
  JobAttributes,
  | 'id'
  | 'job_title'
  | 'airline_id'
  | 'job_description'
  | 'job_slug'
  | 'country'
  | 'state'
  | 'city'
  | 'job_role'
  | 'job_type_id'
  | 'job_mode_id'
  | 'job_image'
  | 'job_image_path'
  | 'job_url'
  | 'source'
  | 'industry_id'
  | 'designation_id'
  | 'deptt_id'
  | 'sub_deptt_id'
  | 'org_id'
  | 'currency_id'
  | 'exp_min'
  | 'exp_max'
  | 'ctc_min'
  | 'ctc_max'
  | 'no_of_position'
  | 'application_count'
  | 'start_date'
  | 'end_date'
  | 'education'
  | 'created_by_id'
  | 'updated_by_id'
  | 'publish_status'
  | 'job_json_data'
>;
export type JobOutput = Required<JobAttributes>;

class JobModel extends Model<JobAttributes, JobInput> implements JobAttributes {
  public id!: string;
  public job_title!: string;
  public airline_id!: string;
  public job_description!: string;
  public job_slug!: string| null;
  public country!: string;
  public state!: string;
  public city!: string;
  public job_role!: string;
  public job_type_id!: number;
  public job_mode_id!: number;
  public job_image!: string;
  public job_image_path!: string;
  public job_url!: string;
  public source!: string;
  public industry_id!: number;
  public designation_id!: number;
  public deptt_id!: number;
  public sub_deptt_id!: number;
  public org_id!: string;
  public currency_id!: number;
  public exp_min!: number;
  public exp_max!: number;
  public ctc_min!: number;
  public ctc_max!: number;
  public no_of_position!: number;
  public application_count!: number;
  public start_date!: Date;
  public end_date!: Date;
  public education!: string;
  public is_verified!: boolean;
  public is_active!: boolean;
  public is_deleted!: boolean;
  public is_salary_hidden!: boolean;
  public created_by_id!: string;
  public updated_by_id!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public publish_status!: string;
  public job_json_data!: object;
}

JobModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    job_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    job_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    job_slug: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    job_role: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    job_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    job_mode_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    job_image: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    job_image_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    job_url: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    industry_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    designation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deptt_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sub_deptt_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    org_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    currency_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    airline_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    exp_min: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    exp_max: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ctc_min: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ctc_max: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    no_of_position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    application_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    education: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    is_salary_hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_by_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_by_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    //TODO: change publish_status to enum
    publish_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_json_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize: dbConnection,
    modelName: 'JobModel',
    tableName: 'jobs',
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ['created_at', 'updated_at'] },
    },
  },
);



export default JobModel;
