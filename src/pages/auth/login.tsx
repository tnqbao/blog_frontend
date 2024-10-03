import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input, Image, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';


type FieldType = {
  username?: string;
  password?: string;
  keepLogin?: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const onFinish = async (values: FieldType) => {
    const typeWithStringField = {
      ...values,
      keepLogin: values.keepLogin?.toString() || "false"  
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_API}/auth/login`,
        typeWithStringField,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      router.push("../");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white p-2 border rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex flex-wrap flex-1 p-4 items-center justify-center">
          <h2 className="text-center text-2xl font-bold mb-6 w-full">
            {t('welcome')}
          </h2>
          <Form
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            labelCol={{ span: 24 }} 
            autoComplete="off"
            className="flex flex-col justify-evenly w-full h-full"
          >
            <Form.Item
              label={t('username')}
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Enter your username"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                suffix={
                  <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
              />
            </Form.Item>

            <Form.Item
              label={t('password')}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password  placeholder="Enter your password"/>
            </Form.Item>

            <Form.Item
              name="keepLogin"
              valuePropName="checked"
              className="text-center"
            >
              <Checkbox>{t('keep_me_logged_in')}</Checkbox>
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" size="large" htmlType="submit">
                {t('login')}
              </Button>
            </Form.Item>

            <Form.Item className="text-right">
              <a href="../auth/register">{t('no_have_account')}</a>
            </Form.Item>
          </Form>
        </div>

        <div className="hidden md:block border-l mx-2"></div>

        <div className="hidden md:flex flex-1 justify-center items-center">
          <Image
            className="max-w-full h-auto"
            src="https://i.imgur.com/I9Qjk2t.png"
            alt="Login illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
