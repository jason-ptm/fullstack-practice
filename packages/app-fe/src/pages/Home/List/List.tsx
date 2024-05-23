import { LoadingButton } from '@mui/lab';
import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import PostCard from '../../../components/PostCard';
import { PostSchema } from '../../../modules/post/post.entity';
import { initialState } from '../../../modules/post/post.slice';
import { useAppSelector } from '../../../redux/hooks';
import { FindOptions } from '../Home';

interface IPostsListProps {
    handleGetPosts: (findOptions: FindOptions) => void
}

const List: React.FC<IPostsListProps> = ({ handleGetPosts }) => {
    const postSelector = useAppSelector(state => state.post)
    const location = useLocation()
    const user = useAppSelector(state => state.authenticator.authenticate.user)
    const [postList, setPostList] = useState<PostSchema[]>([])
    const [findOptions, setFindOptions] = useState({
        page: initialState.list.meta.page,
        take: initialState.list.meta.take,
        filter: initialState.list.filter,
    })

    useEffect(() => {
        setPostList([])
        setFindOptions({
            page: initialState.list.meta.page,
            take: initialState.list.meta.take,
            filter: postSelector.list.filter
        })
    }, [location.pathname, postSelector.list.filter])

    useEffect(() => {
        if (postSelector.list.done && !postSelector.list.loading)
            handleGetPosts({
                page: findOptions.page,
                take: findOptions.take,
                filter: postSelector.list.filter
            })
    }, [findOptions])

    useEffect(() => {
        if (postSelector.list.data.length > 0) {
            if (postSelector.list.meta.hasPreviousPage)
                setPostList(prev => [...prev, ...postSelector.list.data])
            else setPostList(postSelector.list.data)
        }
    }, [postSelector.list.data])

    useEffect(() => {
        const selector = postSelector.interact
        if (selector.done && !selector.loading) {
            if (selector.item.liked) {
                setPostList(prev => {
                    const newList = prev.map(
                        postItem => postItem.id === selector.item.postId ?
                            ({
                                ...postItem,
                                likes: [selector.item.data, ...postItem.likes]
                            }) :
                            postItem
                    )
                    return newList
                })
            }
            else {
                setPostList(prev => {
                    const newList = prev.map(
                        postItem => {
                            if (postItem.id === selector.item.postId) {
                                const likes = postItem.likes.filter(likeItem => likeItem.id !== selector.item.data.id)
                                return {
                                    ...postItem,
                                    likes
                                }
                            }
                            return postItem
                        }
                    )
                    return newList
                })
            }

        }
    }, [postSelector.interact])

    useEffect(() => {
        if (postSelector.delete.done && !postSelector.delete.loading) setPostList((prev) => {
            const newList = prev.filter(item => item.id !== postSelector.delete.id)
            return newList
        })
    }, [postSelector.delete])

    useEffect(() => {
        if (postSelector.create.done && !postSelector.create.loading)
            setPostList(prev => [postSelector.create.item, ...prev])
    }, [postSelector.create])

    const handleInView = (isInView: boolean) => {
        if (
            isInView &&
            postSelector.list.meta.hasNextPage &&
            postSelector.list.meta.page === findOptions.page
        ) {
            setFindOptions(prev => {
                return {
                    ...prev,
                    page: prev.page + 1
                }
            })
        }
    }

    return <>
        {
            postList.map(post => <PostCard key={post.id} post={post} userId={user.user.id} />)

        }
        {
            !postSelector.list.meta.hasNextPage ?
                <>
                    <Divider />
                    <LoadingButton loading loadingIndicator="Agrega un nuevo post..." sx={{ mb: '40px' }} />
                </> :
                <>
                    <InView onChange={(isInView) => handleInView(isInView)}>
                        <Divider />
                        <LoadingButton loading loadingIndicator="Cargando…" sx={{ mb: '40px' }} />
                    </InView >
                </>
        }
    </>;



}

export default List;
