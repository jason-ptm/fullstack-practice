import { Avatar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { stringAvatar } from "../../../helpers/string.helper";
import { useAppSelector } from "../../../redux/hooks";

export default function MenuHeader() {
    const authenticatedUser = useAppSelector(state => state.authenticator.authenticate.user)
    return (
        <Toolbar>
            {
                authenticatedUser.user.fullName && <Avatar {...stringAvatar(authenticatedUser?.user.fullName)} />
            }
            <Typography align='center' width={'100%'}>
                {authenticatedUser.user.fullName}
            </Typography>
        </Toolbar>
    )
}