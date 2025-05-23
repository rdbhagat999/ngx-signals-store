export type LoginResponse = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  email: string;
  username: string;
  password: string;
  image: string;
  role: 'admin' | 'moderator' | 'user';
  accessToken: string;
  refreshToken: string;
};

export type User = Omit<LoginResponse, 'accessToken' | 'refreshToken'>;
