export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  token?: string;
  account_number?: string;
}

export interface Account {
  id: string;
  account_number: string;
  balance: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Test {
  testUserOne: User;
  testUserTwo: User;
  BASE_URL: string;
}
