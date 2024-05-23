import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { schema } from '.';
import { routes } from '../../../constants/routes';
import { validateSchemaField } from '../../../helpers/validation.helper';
import { authenticate } from '../../../modules/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

interface ILoginProps {

}

const Login: React.FC<ILoginProps> = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const authenticatorSelector = useAppSelector(state => state.authenticator)

    const [form, setForm] = useState({
        email: {
            value: '',
            error: ''
        },
        password: {
            value: '',
            error: ''
        }
    })

    useEffect(() => {
        if (
            authenticatorSelector.authenticate.done
            && !authenticatorSelector.authenticate.error
            && !authenticatorSelector.authenticate.loading
            && authenticatorSelector.authenticate.authenticated) {
            navigate(routes.home.absoluteRoute)
        }
    }, [authenticatorSelector.authenticate])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const validationError = validateSchemaField(schema, event.target.name, event.target.value)

        setForm({
            ...form,
            [event.target.name]: {
                error: validationError ? validationError : '',
                value: event.target.value
            }
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!(Boolean(form.email.error) || Boolean(form.password.error))) {
            dispatch(authenticate({
                email: form.email.value,
                password: form.password.value,
            }))
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        value={form.email.value}
                        error={Boolean(form.email.error)}
                        helperText={form.email.error}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        onChange={handleInputChange}
                        autoFocus
                        disabled={authenticatorSelector.authenticate.loading}
                    />
                    <TextField
                        value={form.password.value}
                        error={Boolean(form.password.error)}
                        helperText={form.password.error}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        onChange={handleInputChange}
                        autoComplete="current-password"
                        disabled={authenticatorSelector.authenticate.loading}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={authenticatorSelector.authenticate.loading}
                    >
                        Iniciar sesión
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to={routes.register.absoluteRoute} replace >
                                {"No tienes cuenta? crea una"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
