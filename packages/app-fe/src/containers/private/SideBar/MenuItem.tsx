import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";


type Props = {
    index: number
    label: string
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
    link: string
}

export default function MenuItem(props: Props) {
    const navigate = useNavigate()
    const location = useLocation()

    const isSelected = useMemo(() => location.pathname === props.link, [location])

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        if (props.link) navigate(props.link)
    };

    return (
        <>
            <ListItemButton
                key={`menuItem${props.index}`}
                selected={isSelected}
                href={props.link || '#'}
                sx={{ paddingLeft: 2, backgroundColor: '#fff3' }}
                onClick={handleClick}
            >
                <ListItemIcon>
                    {<props.icon />}
                </ListItemIcon>
                <ListItemText primary={props.label} />
            </ListItemButton>
        </>
    )
}
