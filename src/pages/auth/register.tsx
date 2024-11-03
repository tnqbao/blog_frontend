import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Image, DatePicker } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userApiInstance } from "@/app/utils/axiosConfig";
import dayjs from "dayjs";

type FieldType = {
  username?: string;
  mail?: string;
  fullname?: string;
  password?: string;
  dateOfBirth?: string;
};

const Register: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation("register");

  const onFinish = async (values: FieldType) => {
    const formattedValues = {
      ...values,
      dateOfBirth: values.dateOfBirth
        ? dayjs(values.dateOfBirth).format("DD/MM/YYYY")
        : "",
    };
    try {
      const response = await userApiInstance.post("/auth/register", formattedValues);
      if (response.status==200) {
        await router.push("../auth/login");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Register failed, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white p-2 border rounded-lg shadow-lg max-w-4xl w-full md:my-10">
        <div className="hidden md:flex flex-1 justify-center items-center">
          <Image
            className="max-w-full h-auto"
            src="https://i.imgur.com/I9Qjk2t.png"
            alt="Register illustration"
            preview={false}
          />
        </div>
        <div className="hidden md:block border-l mx-2"></div>
        <div className="flex flex-wrap flex-1 p-4 items-center justify-center">
          <h1 className="text-center text-2xl font-bold mb-4 w-full">
            {t("title")}
          </h1>
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            onFinish={onFinish}
            autoComplete="off"
            className="flex flex-col w-full h-full"
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

            <Form.Item
              label={t("fullname")}
              name="fullname"
              rules={[{ required: true, message: t("pleaseInputFullname") }]}
            >
              <Input placeholder= {t("fullname")}/>
            </Form.Item>

            <Form.Item
              label={t("mail")}
              name="mail"
              rules={[
                { type: "email", message: t('notValidEmail')},
                { required: true, message: t("pleaseInputPassword") },
              ]}
            >
              <Input placeholder={t("mail")}/>
            </Form.Item>

            <Form.Item label={t("dateOfBirth")} name="dateOfBirth">
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" size="large" htmlType="submit">
                {t("register")}
              </Button>
            </Form.Item>

            <Form.Item className="text-right">
              <a href="../auth/login">{t("have_account")}</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["register", "common"])),
    },
  };
};

export default Register;
