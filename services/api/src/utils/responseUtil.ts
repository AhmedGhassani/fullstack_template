import { Response } from 'express';

export const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
) => {
  const response: { code: number; message: string; data?: any } = {
    code: statusCode,
    message,
  };

  if (data !== null && data !== undefined) {
    response.data = data;
  }

  res.status(statusCode).json(response);
};
