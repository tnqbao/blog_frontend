import { Button, Modal, Spin } from "antd";
import { LoadingOutlined, SmileOutlined } from "@ant-design/icons";
import { useState } from "react";
import { userApiInstance } from "@/utils/axios.config";

type PredictEmotion = {
    sentence: string;
    predicted_emotion: string;
}

const PredictEmotionButton: React.FC<{ content: string }> = ({ content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emotion, setEmotion] = useState("");

    const handlerOnClick = async () => {
        const aiDomain = localStorage.getItem("ai_domain");
        if (!aiDomain) {
            setIsModalOpen(false);
            return;
        }
        try {
            const response = await userApiInstance.post(`${aiDomain}/predict_emotion`, {
                // method: "POST",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                // body: JSON.stringify({ sentence: content }),
                sentence: content,
            });

            if (response.status === 200) {
                const data = response.data;
                // const data = await response.json();
                setEmotion(data.predicted_emotion);
            }
        } catch (error) {
            console.error("Error predicting emotion:", error);
        } finally {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <Button onClick={() => handlerOnClick()}>
                <SmileOutlined /> Predict Emotion
            </Button>
            <Modal title={<h3 className={"flex justify-center text-center"}> Predict Emotion </h3>} centered open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                <div className={"flex justify-center my-5 items-center"}>
                    {emotion ?  "I feel " + emotion : <Spin indicator={<LoadingOutlined spin />} size="large" />}
                </div>
            </Modal>
        </>
    );
};

export default PredictEmotionButton;