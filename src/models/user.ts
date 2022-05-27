export type LoginCredentials = {
  email: string;
  password: string;
};

export type User = {
  token: string;
  user: string;
  roles: string[];
};

export interface InformationWhereToRedirect<T = Record<string, unknown>> {
  url: string;
  data: T;
}
