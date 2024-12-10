import {format} from "date-fns";
import {UserTypeProps} from "@/utils/types";
import {Card, Divider, Space, Typography } from "antd";
import {CalendarOutlined, MailOutlined} from "@ant-design/icons";

const {Meta} = Card;
const {Text, Paragraph} = Typography;

function formatDateWithDateFns(isoDate: string): string {
    return format(new Date(isoDate), "dd/MM/yyyy");
}

const Profile: React.FC<UserTypeProps> = ({user}) => {
    const formattedDateOfBirth = user?.dateOfBirth
        ? formatDateWithDateFns(user.dateOfBirth)
        : "N/A";

    return (
        <Card className={"min-w-full min-h-screen flex flex-col items-center "}>
            {/*<Meta avatar={<Image alt={"avatar"} className={"items-center"} preview={false}/>}*/}
            {/*      title={""}*/}
            {/*      className={"items-center"}>*/}
            {/*</Meta>*/}
            <Space className={"items-baseline w-full"}>
                <Text className={"text-3xl font-bold flex"}>
                    {user.fullname}
                </Text>
                <Text>
                    ({user.username})
                </Text>
            </Space>
            <Divider/>
            <Space className={"justify-between"}>
                <Text strong><MailOutlined /> Email :</Text>
                <Text>
                    {user.mail}
                </Text>
            </Space>
            <Paragraph></Paragraph>
            <Space>
                <Text strong><CalendarOutlined /> Birthday:</Text>
                <Text>
                    {formattedDateOfBirth}
                </Text>
            </Space>
        </Card>
    );
};

export default Profile;
