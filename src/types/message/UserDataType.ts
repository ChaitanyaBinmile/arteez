export interface saveUserParams {
  email: string;
  password: string;
}


export interface findUserParams {
  limit: number;
  page_num: number;
}

export interface findUserDto {
  users: any[];
  users_count: number;
}

