import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { api } from '../config/api';

interface LoginResponse {
  data: { token: string };
}

const useLogin = (
  onSuccess: (response: AxiosResponse<LoginResponse>) => void,
  onError: (error: AxiosError) => void,
) => {
  return useMutation(
    (data: { email: string; password: string }) =>
      api.post('/users/login', data),
    {
      onSuccess: (response) => {
        onSuccess(response);
      },
      onError: (error) => {
        onError(error as AxiosError);
      },
    },
  );
};

export { useLogin };
