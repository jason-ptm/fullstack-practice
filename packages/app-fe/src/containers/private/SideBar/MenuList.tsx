import { Box, Divider } from "@mui/material";
import List from "@mui/material/List";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import MenuItem from "./MenuItem";
import MenuLogoutItem from './MenuLogoutItem';

export type MenuListItem = {
    label: string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    link: string,
}

type Props = {
    items: MenuListItem[]
}

export default function MenuList(props: Props) {

    return (
        <Box sx={{ height: 'calc(100% - 64px)', overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <List >
                {props.items.map((item, index) => (
                    <MenuItem
                        key={`${item.label}-${index}`}
                        index={index}
                        label={item.label}
                        link={item.link}
                        icon={item.icon}
                    />
                ))}
            </List>
            <List>
                <Divider />
                <MenuLogoutItem />
            </List>
        </Box>
    )
}
