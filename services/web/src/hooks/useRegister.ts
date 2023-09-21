import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { api } from '../config/api';

interface RegisterResponse {
  data: { token: string };
}

const useRegister = (
  onSuccess: (response: AxiosResponse<RegisterResponse>) => void,
  onError: (error: AxiosError) => void,
) => {
  return useMutation(
    (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => api.post('/users/register', data),
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

export { useRegister };
