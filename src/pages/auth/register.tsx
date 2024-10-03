import React from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Image, DatePicker } from "antd";
import { useTranslation } from 'react-i18next';
import axios from "axios"; 

type FieldType = {
  username?: string;
  mail?: string;
  fullname?:string;
  password?: string;
  dateOfBirth?: string;
};

const Register: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const onFinish = async (values: FieldType) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_API}/auth/register`, values); 
      console.log("Response data:", response.data);
      localStorage.setItem("token", response.data.token);
      alert("Login success: " + response.data.token);

      router.push("../");
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white p-2 border rounded-lg shadow-lg max-w-4xl w-full">
        <div className="hidden md:flex flex-1 justify-center items-center">
          <Image
            className="max-w-full h-auto"
            src="https://i.imgur.com/I9Qjk2t.png"
            alt="Login illustration"
          />
        </div>
        <div className="hidden md:block border-l mx-2"></div>
        <div className="flex flex-wrap flex-1 p-4 items-center justify-center">
          <h2 className="text-center text-2xl font-bold mb-6 w-full">
            {t('register_title')}
          </h2>
          <Form
            name="basic"
            initialValues={{ remember: false }}
            labelCol={{ span: 24 }}
            onFinish={onFinish}
            autoComplete="off"
            className="flex flex-col justify-evenly w-full h-full"
          >
            <Form.Item
              label={t('username')}
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('password')}
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label={t('fullname')}
              name="fullname"
              rules={[{ required: true, message: "Please input your fullname!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('mail')}
              name="mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('date_of_birth')}
              name="dateOfBirth"
              rules={[{ required: true, message: "Please input your bỉthday!" }]
              
              }
            >
              <DatePicker needConfirm  className="w-full"/>
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" size="large" htmlType="submit">
                {t('register')}
              </Button>
            </Form.Item>

            <Form.Item className="text-right">
              <a href="../auth/login">{t('have_account')}</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
