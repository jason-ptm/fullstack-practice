
import { Box, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import ErrorAlert from '../ErrorAlert';

interface IViewApiResponseToolsProps {

}

const ViewApiResponseTools: React.FC<IViewApiResponseToolsProps> = () => {
    const [errorOpen, setErrorOpen] = useState(false)
    const appSelector = useAppSelector(state => state.app)

    useEffect(() => {
        if (appSelector.error && !appSelector.loading) {
            setErrorOpen(true)
            setTimeout(() => setErrorOpen(false), 3000);
        }
    }, [appSelector])

    return <>
        {
            appSelector.loading ?
                <Box sx={{ position: 'absolute', width: '100vw', top: 0, left: 0, zIndex: 4000 }}>
                    <LinearProgress />
                </Box >
                : <></>
        }

        {
            <Box sx={{ position: 'absolute', bottom: 20, right: 20 }}>
                <ErrorAlert message={appSelector.error} shown={errorOpen} />
            </Box>
        }

    </>;
}

export default ViewApiResponseTools;
