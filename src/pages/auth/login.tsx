import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Form, Input, Image, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userApiInstance } from "@/utils/axiosConfig";
import { useAuth } from "@/contexts/AuthContext";
type FieldType = {
  username?: string;
  password?: string;
  keepLogin?: string;
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { t } = useTranslation("login");
  const { login } = useAuth();
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      router.push("../");
    }
  }, [router]);

  const onFinish = async (values: FieldType) => {
    const typeWithStringField = {
      ...values,
      keepLogin: values.keepLogin?.toString() ?? "false",
    };
  
    try {
      const response = await userApiInstance.post("/auth/login", typeWithStringField);
      if (response.status === 200) {
        
        login(typeWithStringField.username, typeWithStringField.keepLogin);
        router.push("../");
      }
    } catch (error) {
      form.setFields([
        {
          name: "username",
          errors: [t("invalidInput")],
        },
        {
          name: "password",
          errors: [t("invalidInput")],
        },
      ]);
      message.error(t("loginFailedMessage"));
    }
  };  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white p-2 border rounded-lg shadow-lg max-w-4xl w-full md:my-10">
        <div className="flex flex-wrap flex-1 p-4 items-center justify-center">
          <h1 className="text-center text-2xl font-bold mb-6 w-full">
            {t("title")}
          </h1>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{ span: 24 }}
            className="flex flex-col justify-evenly w-full h-full"
          >
            <Form.Item
              name="username"
              label={t("username")}
              rules={[{ required: true, message: t("pleaseInputUsername") }]}
            >
              <Input prefix={<UserOutlined />} placeholder={t("username")} />
            </Form.Item>
            <Form.Item
              name="password"
              label={t("password")}
              rules={[{ required: true, message: t("pleaseInputPassword") }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder={t("password")}
              />
            </Form.Item>

            <div className="flex justify-between items-center">
              <Form.Item
                name="keepLogin"
                valuePropName="checked"
                className="text-center"
              >
                <Checkbox>{t("keepMeLoggedIn")}</Checkbox>
              </Form.Item>
              <Form.Item>
                <a href="#">{t("forgotPassword")}</a>
              </Form.Item>
            </div>

            <Form.Item className="text-center">
              <Button type="primary" size="large" htmlType="submit">
                {t("submitButton")}
              </Button>
            </Form.Item>

            <Form.Item className="text-right">
              <a href="../auth/register"> {t("notRegistered")}</a>
            </Form.Item>
          </Form>
        </div>

        <div className="hidden md:block border-l mx-2"></div>

        <div className="hidden md:flex flex-1 justify-center items-center">
          <Image
            className="max-w-full h-auto"
            src="https://i.imgur.com/I9Qjk2t.png"
            alt="Login illustration"
            preview={false}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["login", "common"])),
    },
  };
};

export default Login;
