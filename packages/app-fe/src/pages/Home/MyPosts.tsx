import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { findAllAction, resetListAction } from '../../modules/post/post.slice';
import { AppDispatch } from '../../redux/types';
import { FindOptions } from './Home';
import List from './List/List';

interface IMyPostsProps { }

const MyPosts: React.FC<IMyPostsProps> = () => {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(resetListAction())
	}, [])

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
			mine: true
		}))
	}

	return <Box sx={containerBoxStyles}>
		<Box sx={{ maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<List handleGetPosts={handleGetPosts} />
		</Box>
	</Box>;
}

export default MyPosts;


const containerBoxStyles = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minHeight: '100%'
}