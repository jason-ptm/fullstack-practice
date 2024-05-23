import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import { mapValidationErrors, validateForm } from '../../../helpers/validation.helper';
import { register } from '../../../modules/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { schema } from './schema';

interface IRegisterProps {

}

const formInitialState = {
    fullName: '',
    age: '',
    email: '',
    password: ''
}

const Register: React.FC<IRegisterProps> = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authenticatorSelector = useAppSelector(state => state.authenticator)
    const [form, setForm] = useState(formInitialState)
    const [formErrors, setFormErrors] = useState(formInitialState)

    useEffect(() => {
        if (
            authenticatorSelector.register.done
            && !authenticatorSelector.register.error
            && !authenticatorSelector.register.loading
            && authenticatorSelector.register.authenticated) {
            navigate(routes.home.absoluteRoute)
        }
    }, [authenticatorSelector.register])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setForm({
            ...form,
            [event.target.name]: event.target.value

        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = {
            fullName: form.fullName,
            age: form.age,
            email: form.email,
            password: form.password
        }

        const formValidation = validateForm(schema, formData)

        if (formValidation.error) {
            setFormErrors({
                ...formErrors,
                ...mapValidationErrors(formValidation.error)
            })
        }
        else {
            dispatch(register({
                email: form.email,
                password: form.password,
                user: {
                    fullName: form.fullName,
                    age: Number(form.age),
                }
            }))
        }
    };

    return <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Crear cuenta
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    value={form.fullName}
                    error={Boolean(formErrors.fullName)}
                    helperText={formErrors.fullName}
                    margin="normal"
                    required
                    fullWidth
                    id="fullName"
                    label="Nombre completo"
                    name="fullName"
                    onChange={handleInputChange}
                    disabled={authenticatorSelector.register.loading}
                />
                <TextField
                    value={form.age}
                    error={Boolean(formErrors.age)}
                    helperText={formErrors.age}
                    type='number'
                    margin="normal"
                    required
                    fullWidth
                    id="age"
                    label="Edad"
                    name="age"
                    onChange={handleInputChange}
                    disabled={authenticatorSelector.register.loading}
                />
                <TextField
                    value={form.email}
                    error={Boolean(formErrors.email)}
                    helperText={formErrors.email}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    onChange={handleInputChange}
                    disabled={authenticatorSelector.register.loading}
                />
                <TextField
                    value={form.password}
                    error={Boolean(formErrors.password)}
                    helperText={formErrors.password}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    onChange={handleInputChange}
                    autoComplete="current-password"
                    disabled={authenticatorSelector.register.loading}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={authenticatorSelector.register.loading}
                >
                    Crear cuenta
                </Button>
            </Box>
        </Box>
    </Container>;
}

export default Register;
