import { globalAction$, zod$ } from '@builder.io/qwik-city';
import { BASE_API } from '@environments';
import axios from 'axios';
import { RegisterAdapter } from '../pages/login/adapters';
import { REGISTER_USER } from '../pages/login/models/mutations/loginUser';
import { Register } from '../pages/login/models/schemas';
import { IRegisterResponse, IRegisterUser } from '../pages/login/models/types';

export const useRegisterService = globalAction$(
  async (data, { cookie, redirect }) => {
    const { email, username, password } = data;

    const registerData = {
      registerUser: {
        email,
        username,
        password,
      },
    };

    const response = await axios
      .post<IRegisterUser, IRegisterResponse>(BASE_API, {
        query: REGISTER_USER,
        variables: registerData,
      })
      .then((response) => RegisterAdapter(response));

    if (!response.success) {
      console.log('response error');
      redirect(302, '/login');
      return;
    }

    if ('token' in response) {
      console.log('response success');
      const token = response.token;

      if (token) {
        cookie.set('TOKEN', token, { secure: true, path: '/' });
        redirect(302, '/dashboard');
      }
    }
  },
  zod$(Register)
);
