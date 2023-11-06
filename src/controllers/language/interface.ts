export interface ResponseData {
  name: string;
}

export interface ResponseDataEncrypt {
  name: string;
  email: string;
  password: string;
}

export interface EncryptDataEntry {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HmacResult {
  words: number[];
  sigBytes: number;
}
