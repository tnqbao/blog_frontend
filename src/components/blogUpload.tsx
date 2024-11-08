import React, {useState} from "react";
import {Form, Input, Button, message, Divider, Avatar} from "antd";
import {userApiInstance} from "@/utils/axiosConfig";
import SubmitButton from "./disableSubmitButton";
import {useRouter} from "next/router";
import {useAuth} from "@/contexts/AuthContext";

const {TextArea} = Input;
type FieldType = {
    title?: string;
    body?: string;
};
const Upload: React.FC = () => {
    const [value, setValue] = useState("");
    const [form] = Form.useForm();
    const router = useRouter();
    const {fullname, changeIsOpen} = useAuth();
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };
    const onFinish = async (values: FieldType) => {
        try {
            const response = await userApiInstance.post("/post", values, {withCredentials: true});
            if (response.status === 200) {
                message.success("Post submitted successfully!");
                changeIsOpen();
                await router.push("../");
            }
        } catch {
            console.log("error");
        }
    };
    return (
        <div className="flex-grow flex flex-wrap justify-center items-start sm:mx-20">

            <div className={"w-full sm:w-2/3 bg-white sm:p-5 sm: rounded-2xl  sm:shadow-lg sm:shadow-blue-700 sm:m-5"}>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    className=" rounded-lg p-5 md:p-7 m-2"
                >


                    <Form.Item>
                        <div className={"flex items-center flex-wrap gap-2"}>
                            <Avatar
                                size={50}
                                style={{backgroundColor: "#f56a00", verticalAlign: "middle"}}
                            >
                                {fullname?.toString().charAt(0).toUpperCase()}
                            </Avatar>
                            <span className="text-xl font-bold ml-3">{fullname?.toString().toUpperCase()}</span>
                        </div>
                    </Form.Item>
                    <Divider/>
                    <Form.Item
                        name="title"
                        rules={[{required: true, message: "Please enter a title"}]}
                    >
                        <Input
                            placeholder="New title"
                            size="large"
                            maxLength={100}
                            className="hover:backdrop-brightness-200 transition-transform duration-300 transform hover:scale-105 border border-black/50 rounded-2xl"
                        />
                    </Form.Item>
                    <Divider/>
                    <Form.Item
                        name="body"
                        rules={[{required: true, message: "Please enter content"}]}
                    >
                        <TextArea
                            size="large"
                            placeholder="Write content here"
                            value={value}
                            onChange={handleChange}
                            autoSize={{minRows: 3, maxRows: 50}}
                            className="hover:backdrop-brightness-200 transition-transform duration-300 transform hover:scale-105 border border-black/50 rounded-2xl"
                        />
                    </Form.Item>
                    <div className="flex justify-between">
                        <Form.Item className="flex-grow w-1/3 justify-self-start">
                            <SubmitButton form={form}> Submit </SubmitButton>
                        </Form.Item>
                        <Form.Item className="flex-grow w-1/3 flex justify-end">
                            <Button type="primary" danger className={'flex-grow w-full text-xl h-auto'} onClick={() => {
                                changeIsOpen()
                            }}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Upload;