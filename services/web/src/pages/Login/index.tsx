import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLogin } from '../../hooks/useLogin';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutate, isLoading } = useLogin(
    async (response) => {
      await login(response.data.data.token);
      await message.success('Logged in successfully', 2);

      navigate(`/`);
    },

    async (error) => {
      if (error?.response?.status === 401) {
        await message.error('Invalid email or password', 2);
      }
      await message.error('Something went wrong', 2);
    },
  );

  const onFinish = async (values: { email: string; password: string }) => {
    mutate(values);
  };

  return (
    <Card className="flex flex-col justify-center items-center">
      <Form
        name="loginForm"
        onFinish={onFinish}
        layout="vertical"
        title="Login"
        className="flex flex-col justify-center items-center"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
            {
              type: 'email',
              message: 'Invalid email format!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
