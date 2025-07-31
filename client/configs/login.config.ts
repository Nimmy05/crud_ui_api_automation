import 'tsconfig-paths/register';

const thisTestConfig = {
  login_user: {
    login_test_user_one: {
      email: 'test67@gmail.com',
      password: 'abc123',
    }
  },
  invalid_email_format: 'test.com',
  wrong_email: 'auto_test_deaduser@gmail.com',
  wrong_password: 'test.com',
};

export default thisTestConfig;
