import React from "react";
import {Form, Input, Button, message, Divider, Avatar} from "antd";
import {userApiInstance} from "@/utils/axios.config";
import SubmitButton from "./disableSubmitButton";
import {useRouter} from "next/router";
import {useAuth} from "@/providers/AuthContext";
import {useTranslation} from "next-i18next";

const {TextArea} = Input;
type FieldType = {
    title?: string;
    body?: string;
};

const Upload: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const {fullname} = useAuth();
    const { t } = useTranslation('blog');
    const onFinish = async (values: FieldType) => {
        try {
            const response = await userApiInstance.post("/post", values, {withCredentials: true});
            if (response.status === 200) {
                message.success("Post submitted successfully!");
                await router.push("../");
            }
        } catch (error) {
            message.error("Error submitting post. Please try again.");
            console.error("Error submit post:", error);
        }
    };

    return (
        <div className="flex-grow flex flex-wrap justify-center items-start sm:mx-20">
            <div className="w-full sm:w-2/3 bg-white sm:p-5 rounded-2xl shadow-lg shadow-blue-700 sm:m-5">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="rounded-lg p-5 md:p-7 m-2"
                >
                    <Form.Item>
                        <div className="flex items-center flex-wrap gap-2">
                            <Avatar
                                size={50}
                                style={{backgroundColor: "#f56a00", verticalAlign: "middle"}}
                            >
                                {fullname ? fullname.charAt(0).toUpperCase() : "U"}
                            </Avatar>
                            <span className="text-xl font-bold ml-3">
                                {fullname?.toUpperCase() || "Unknown User"}
                            </span>
                        </div>
                    </Form.Item>
                    <Divider />
                    <Form.Item
                        name="title"
                        rules={[{required: true, message: "Please enter a title"}]}
                    >
                        <Input
                            placeholder={t('title')}
                            size="large"
                            maxLength={100}
                            className="hover:backdrop-brightness-200 transition-transform duration-300 transform hover:scale-105 border border-black/50 rounded-2xl"
                        />
                    </Form.Item>
                    <Divider />
                    <Form.Item
                        name="body"
                        rules={[{required: true, message: "Please enter content"}]}
                    >
                        <TextArea
                            size="large"
                            placeholder={t('body')}
                            autoSize={{minRows: 3, maxRows: 50}}
                            className="hover:backdrop-brightness-200 transition-transform duration-300 transform hover:scale-105 border border-black/50 rounded-2xl"
                        />
                    </Form.Item>
                    <div className="flex justify-between">
                        <Form.Item className="flex-grow w-1/3">
                            <SubmitButton form={form}>{t('submit')}</SubmitButton>
                        </Form.Item>
                        <Form.Item className="flex-grow w-1/3 flex justify-end">
                            <Button
                                type="primary"
                                danger
                                className="flex-grow w-full text-xl h-auto"
                                onClick={() => { router.push("../")}}
                            >
                                {t('cancel')}
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Upload;
