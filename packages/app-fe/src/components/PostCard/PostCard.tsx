import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, AvatarGroup, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/es';
import React, { useState } from 'react';
import { stringAvatar } from '../../helpers/string.helper';
import { PostSchema } from '../../modules/post/post.entity';
import { deleteAction, reactToPostAction } from '../../modules/post/post.slice';
import { useAppDispatch } from '../../redux/hooks';

interface IPostCardProps {
    post: PostSchema
    userId: string
}

const ITEM_HEIGHT = 48;

const PostCard: React.FC<IPostCardProps> = ({ post, userId }) => {
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLiked, setIsLiked] = useState(!!post.likes.find(like => like.userId === userId))
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const openOptionsMenu = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLike = () => {
        dispatch(reactToPostAction(post.id))
        setIsLiked(prev => !prev)
    }

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true)
        handleClose()
    }

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false)
    }

    const handleDelete = () => {
        dispatch(deleteAction({ id: post.id }))
        handleDeleteDialogClose()
    }

    return <>
        <Box sx={{
            width: '100%',
            padding: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '6px'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                pb: 2,
                borderBottom: '1px solid',
                borderColor: 'divider'
            }}>
                {<Avatar {...stringAvatar(post.owner.fullName, { width: '24px', height: '24px' })} />}
                <Typography fontWeight={600} fontSize='1rem'>
                    {post.owner.fullName}
                </Typography>
                <Typography variant='body2'>
                    {
                        moment().diff(post.createdAt, 'days') > 0 ?
                            moment(post.createdAt).format('LLL') :
                            moment(post.createdAt).fromNow()
                    }
                </Typography>
                {
                    post.owner.id === userId && <>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={openOptionsMenu ? 'long-menu' : undefined}
                                aria-expanded={openOptionsMenu ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                elevation={0}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                anchorEl={anchorEl}
                                open={openOptionsMenu}
                                onClose={handleClose}
                                slotProps={{
                                    paper: {
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: '20ch',
                                        },
                                    }
                                }}
                                sx={{
                                    '& .MuiPaper-root': {
                                        borderRadius: 2,
                                        boxShadow:
                                            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                                        '& .MuiMenu-list': {
                                            padding: '4px 0',
                                        },
                                    },
                                    '& .MuiMenuItem-root': {
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 18,
                                            marginRight: 2,
                                        },
                                    },
                                }}
                            >
                                <MenuItem onClick={handleOpenDeleteDialog} disableRipple>
                                    <DeleteIcon />
                                    Eliminar
                                </MenuItem>

                            </Menu>
                        </Box>
                    </>
                }
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2, pb: 2 }}>
                <Typography variant='h5' fontWeight={500}>
                    {post.title}
                </Typography>

                <Typography variant='body1' sx={{ wordBreak: 'break-all' }}>
                    {post.content}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <IconButton size='small' onClick={handleLike}>
                    {
                        isLiked ? <FavoriteIcon fontSize="small" color='error' /> : <FavoriteBorderOutlinedIcon fontSize="small" />
                    }
                </IconButton>
                <AvatarGroup
                    max={4}
                    sx={{ display: 'flex', alignItems: 'center' }}>
                    {
                        post.likes.map(user => (
                            <Avatar key={user.id} {...stringAvatar(user.fullName, { width: '24px', height: '24px' })} title={user.fullName} />
                        ))
                    }
                </AvatarGroup>
            </Box>
        </Box>

        <Dialog
            open={openDeleteDialog}
            keepMounted
            onClose={handleDeleteDialogClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Eliminar post?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Una vez eliminado ni tu ni nadie podrá ver el post.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleDeleteDialogClose}>Cancelar</Button>
                <Button color='error' variant='contained' startIcon={<DeleteIcon />} onClick={handleDelete}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </>;
}

export default PostCard;
