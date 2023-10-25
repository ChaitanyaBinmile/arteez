import { Request } from 'express';

export interface ExtendedRequest extends Request {
  user?: {
    id: string;
    org_id: string;
    is_deleted: boolean;
    is_active: boolean;
    industry_id: number;
    deptt_id: number;
    sub_deptt_id: number;
    country: string;
    state: string;
    city: string;
  }
}

export interface userInfoObj {
  userId: string;
}

