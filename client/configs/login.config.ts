import testData from 'src/data/testData.json'; 

const thisTestConfig = {
  "login_user": testData.login_test_users.login_test_user_one,
  "invalid_email_format": "test.com",
  "wrong_email": "auto_test_deaduser@gmail.com",
  "wrong_password": "test.com",
};

export default thisTestConfig;
