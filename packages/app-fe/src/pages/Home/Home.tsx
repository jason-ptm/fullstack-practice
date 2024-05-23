import { Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { findAllAction } from '../../modules/post/post.slice';
import { AppDispatch } from '../../redux/types';
import Create from './Create/Create';
import List from './List/List';

interface IHomeProps { }

export interface FindOptions {
    page: number,
    take: number,
    filter?: string
}

const Home: React.FC<IHomeProps> = () => {
    const dispatch = useDispatch<AppDispatch>()

    const handleGetPosts = (findOptions: FindOptions) => {
        const params = { ...findOptions }
        delete params.filter
        if (findOptions.filter) {
            params.filter = findOptions.filter
        }
        dispatch(findAllAction({
            pagination: {
                ...params,
                order: 'DESC',
            },
            mine: false
        }))
    }

    return <Box sx={containerBoxStyles}>
        <Box sx={{ maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Create />
            <List handleGetPosts={handleGetPosts} />
        </Box>
    </Box>;
}

export default Home;


const containerBoxStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100%'
}