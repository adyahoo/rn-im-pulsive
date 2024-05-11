/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */

export interface User {
  id: string;
  name: string;
  email: string;
  profile: null | string;
  thumbnail: null | string;
}

export interface LoginItem {
  token: string;
  user: User;
}

export interface LoginResponse {
  data: LoginItem;
}
