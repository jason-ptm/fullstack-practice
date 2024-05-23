
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, IconButton, InputBase, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { stringAvatar } from '../../helpers/string.helper';
import { UpdateEmailDto, UpdatePasswordDto } from '../../modules/auth/dto/update.dto';
import { useAppSelector } from '../../redux/hooks';

interface IProfileProps {

}

interface IContainerProps {
    name: string
    label: string
    value: string
    count: number
    handleChange: (value: string, name: string) => void
    handleEdit?: () => void
    type?: 'text' | 'password' | 'email'
    isEdit?: boolean
}

const DataContainer: React.FC<IContainerProps> = ({ name, label, value, count, handleChange, handleEdit, type = 'text', isEdit = false }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (handleEdit) {
            handleEdit()
            if (inputRef.current) inputRef.current.focus()
        }
    }

    return <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        padding: '10px 30px',
        backgroundColor: count % 2 === 0 ? '#eee' : '#fff',
        position: 'relative',
    }}>
        <Typography
            color='gray'
            sx={{
                flex: 1
            }}>
            {label}
        </Typography>
        <Box sx={{ ml: '60px' }}>:</Box>
        <InputBase
            inputRef={inputRef}
            name={name}
            type={type}
            onChange={(e) => handleChange(e.target.value, e.target.name)}
            sx={{
                flex: 1,
                '& .MuiInputBase-input': {
                    pl: '60px',
                    pt: '10px',
                    pb: '10px',
                    backgroundColor: 'inherit'
                }
            }}
            value={value} />
        {
            isEdit &&
            <IconButton
                onClick={handleClick}
                sx={{
                    right: '8px',
                    position: 'absolute'
                }}
                size="small"
            >
                <EditIcon fontSize="inherit" />
            </IconButton>
        }
    </Box>
}

const initialFormPassword = {
    password: '',
    confirmPassword: '',
}

const initialFormEmail = {
    email: '',
    confirmEmail: '',
}

const Profile: React.FC<IProfileProps> = () => {
    const userSelector = useAppSelector(state => state.authenticator.authenticate.user)
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)
    const [formUser, setFormUser] = useState({
        fullName: userSelector.user.fullName,
        age: userSelector.user.age,
    })
    const [userErrors, setUserErrors] = useState({
        fullName: '',
        age: ''
    })
    const [formEmail, setFormEmail] = useState<UpdateEmailDto>(initialFormEmail)
    const [formPassword, setFormPassword] = useState<UpdatePasswordDto>(initialFormPassword)

    const handleChangeUser = (value: string, name: string) => {
        setFormUser(prev => ({
            ...prev,
            [name]: value
        }))
        if (!isEditingUser) setIsEditingUser(true)
    }

    const handleChangeEmail = (value: string, name: string) => {
        if (isEditingEmail) {
            setFormEmail(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleChangePassword = (value: string, name: string) => {
        if (isEditingPassword) {
            setFormPassword(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleCancelEditAccount = () => {
        setFormEmail(initialFormEmail)
        setFormPassword(initialFormPassword)
        setIsEditingEmail(false)
        setIsEditingPassword(false)
    }

    const handleCancelEditUser = () => {
        setFormUser({
            fullName: userSelector.user.fullName,
            age: userSelector.user.age,
        })
        setIsEditingUser(false)
    }

    return <>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            justifyContent: 'center'
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '400px', flex: 1, gap: 1 }}>
                <Avatar {...stringAvatar(userSelector.user.fullName, { width: '200px', height: '200px', fontSize: '4rem', marginBottom: 4 })} />
                <TextField id="filled-basic" label="Filled" variant="filled" />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 2, flexBasis: '400px' }}>
                <Typography variant='h6'>Datos generales</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '650px', flexDirection: 'colum', boxShadow: 2, borderRadius: 2 }} >
                    <Box sx={{ flex: 1 }}>
                        <DataContainer name='fullName' label='Nombre' value={formUser.fullName} count={1} handleChange={handleChangeUser} />
                        <DataContainer name='age' label='Edad' value={formUser.age.toString()} count={2} handleChange={handleChangeUser} />
                    </Box>
                </Box>
                {
                    isEditingUser &&
                    <Box sx={{ maxWidth: '650px', display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="error" onClick={handleCancelEditUser}>
                            Cancelar
                        </Button>
                        <Button variant="contained" >
                            Guardar
                        </Button>
                    </Box>
                }
                <Typography variant='h6'>Datos de la cuenta</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '650px', flexDirection: 'colum', boxShadow: 2, borderRadius: 2 }} >
                    <Box sx={{ flex: 1 }}>
                        <DataContainer
                            name='email'
                            label='Correo electrónico'
                            value={isEditingEmail ? formEmail.email : userSelector.email}
                            type='email'
                            count={3}
                            isEdit={!isEditingEmail && !isEditingPassword}
                            handleEdit={() => setIsEditingEmail(true)}
                            handleChange={handleChangeEmail} />
                        {
                            isEditingEmail &&
                            <DataContainer
                                name='email'
                                label='Confirme correo electrónico'
                                value={formEmail.confirmEmail}
                                type='email'
                                count={3}
                                handleChange={handleChangeEmail} />
                        }
                        <DataContainer
                            name='password'
                            label='Contraseña'
                            value={!isEditingPassword ? 'password' : formPassword.password}
                            count={4}
                            handleChange={handleChangePassword}
                            handleEdit={() => setIsEditingPassword(true)}
                            type='password'
                            isEdit={!isEditingEmail && !isEditingPassword} />
                        {
                            isEditingPassword && <DataContainer
                                name='confirmPassword'
                                label='Confirme contraseña'
                                value={formPassword.confirmPassword}
                                count={5}
                                handleChange={handleChangePassword}
                                type='password' />
                        }
                    </Box>
                </Box>
                {
                    (isEditingEmail || isEditingPassword) &&
                    <Box sx={{ maxWidth: '650px', display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="error" onClick={handleCancelEditAccount}>
                            Cancelar
                        </Button>
                        <Button variant="contained" >
                            Guardar
                        </Button>
                    </Box>
                }
            </Box>
        </Box>
    </>;
}

export default Profile;
