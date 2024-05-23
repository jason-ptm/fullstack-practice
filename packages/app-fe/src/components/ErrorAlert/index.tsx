import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';

type ErrorAlertProps = {
    shown: boolean
    message: string
}

export default function ErrorAlert(props: ErrorAlertProps) {
    const [open, setOpen] = useState(props.shown)
    const [message, setMessage] = useState(props.message)

    useEffect(() => {
        setOpen(props.shown)
    }, [props.shown])

    useEffect(() => {
        if (props.message) setMessage(props.message)
    }, [props.message])

    return (
        <Collapse in={open} timeout={600}>
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false)
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {message}
            </Alert>
        </Collapse>
    );
}
