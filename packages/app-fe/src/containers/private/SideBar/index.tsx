import Divider from "@mui/material/Divider"
import MenuHeader from "./MenuHeader"
import MenuList, { MenuListItem } from "./MenuList"

interface Props {
    menuListItems: MenuListItem[]
}

export default function SideBar(props: Props) {
    return (
        <>
            <MenuHeader />
            <Divider />
            <MenuList items={props.menuListItems} />
        </>
    )
}