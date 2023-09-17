import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { api } from '../config/api';

interface UpdatePasswordResponse {
  data: { token: string };
}

const useUpdatePassword = (
  onSuccess: (response: AxiosResponse<UpdatePasswordResponse>) => void,
  onError: (error: AxiosError) => void,
) => {
  return useMutation(
    (data: { password: string; passwordConfirmation: string }) =>
      api.post('/update-password', data),
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

export { useUpdatePassword };
