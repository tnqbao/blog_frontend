import { useRouter } from "next/router";
import {Button, message} from "antd";

interface ShareButtonProps {
    blogId: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ blogId }) => {
    const router = useRouter();

    const handleCopyToClipboard = () => {
        const url = `${window.location.origin}${router.pathname}blog/${blogId}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                message.success("Copied to clipboard");
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    return (
        <Button
            onClick={handleCopyToClipboard}
            className=" py-2 px-4 rounded-lg"
        >
            Share
        </Button>
    );
};

export default ShareButton;