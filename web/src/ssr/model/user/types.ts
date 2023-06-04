export type UserResponse = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_updated_at: Date;
};

export type User = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordUpdatedAt: Date;
};
