import {Button, Checkbox, Form, Image, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

import React, {useState} from "react";

import {RootState} from "@/utils/redux/store";
import {setAuth, setUser} from "@/utils/redux/slices/auth";

import {useTranslation} from "next-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";


type FieldType = {
    username: string;
    password: string;
    keepLogin?: boolean;
};


const Login : React.FC = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation("login");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token") || null;
    if (token) {
        router.push("../");
    }
    const handleOnClicked = () => {
        alert("Try to remember it!!");
    };

    const onFinish = async (values: FieldType) => {
        setLoading(true);
        const requestData = {
            ...values,
            keepLogin: values.keepLogin?.toString() ?? "false",
        };

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (response.status === 200) {
                const data = await response.json();
                dispatch(setAuth(true));
                dispatch(setUser({ id: data.user.id, username: data.user.username, mail: data.user.mail, fullname: data.user.fullname, dateOfBirth: data.user.dateOfBirth }));
                if (values.keepLogin) {
                    localStorage.setItem("token", data.token);
                } else {
                    sessionStorage.setItem("token", data.token);
                }
                await router.push("../");
            } else {
                console.error("Login failed with status:", response.status);
            }
        } catch (error) {
            form.setFields([
                { name: "username", errors: [t("invalidInput")] },
                { name: "password", errors: [t("invalidInput")] },
            ]);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div
                className="flex flex-col md:flex-row bg-white p-2 border rounded-lg shadow-lg max-w-4xl w-full md:my-10">
                <div className="flex flex-wrap flex-1 p-4 items-center justify-center">
                    <h1 className="text-center text-2xl font-bold mb-6 w-full">
                        {t("title")}
                    </h1>
                    <Form
                        form={form}
                        name="basic"
                        initialValues={{remember: false}}
                        onFinish={onFinish}
                        autoComplete="off"
                        labelCol={{span: 24}}
                        className="flex flex-col justify-evenly w-full h-full"
                    >
                        <Form.Item
                            name="username"
                            label={t("username")}
                            rules={[{required: true, message: t("pleaseInputUsername")}]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder={t("username")}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={t("password")}
                            rules={[{required: true, message: t("pleaseInputPassword")}]}
                        >
                            <Input.Password prefix={<LockOutlined/>} type="password" placeholder={t("password")}/>
                        </Form.Item>

                        <div className="flex justify-between items-center">
                            <Form.Item name="keepLogin" valuePropName="checked">
                                <Checkbox>{t("keepMeLoggedIn")}</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <button onClick={handleOnClicked} className="text-primary">
                                    {t("forgotPassword")}
                                </button>
                            </Form.Item>
                        </div>

                        <Form.Item className="text-center">
                            <Button type="primary" size="large" htmlType="submit" loading={loading}>
                                {t("submitButton")}
                            </Button>
                        </Form.Item>

                        <Form.Item className="text-right">
                            <a href="../auth/register">{t("notRegistered")}</a>
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
}

export default Login;