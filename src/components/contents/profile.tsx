import {useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";
import {format} from "date-fns";

function formatDateWithDateFns(isoDate: string): string {
    return format(new Date(isoDate), 'dd/MM/yyyy HH:mm');
}

const Profile : React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    return (
        <div className={"flex"}>
            <div className={"w-1/2"}>
                <h1>Profile</h1>
                <p>Username: {user?.username}</p>
                <p>Email: {user?.mail}</p>
                <p>Fullname: {user?.fullname}</p>
                <p>Date of Birth: {formatDateWithDateFns(user?.dateOfBirth)}</p>
            </div>
        </div>
    );
}

export default Profile;