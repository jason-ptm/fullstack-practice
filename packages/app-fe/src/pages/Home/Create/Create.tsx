import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { FormHelperText, InputBase, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { mapValidationErrors, validateForm } from '../../../helpers/validation.helper';
import { createAction } from '../../../modules/post/post.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { schema } from './schema';

const initialFormState = {
	title: '',
	content: ''
}

export default function Create() {
	const theme = useTheme()
	const dispatch = useAppDispatch()
	const postSelector = useAppSelector(state => state.post.create)
	const [form, setForm] = useState(initialFormState)
	const [formErrors, setFormErrors] = useState('')

	useEffect(() => {
		if (postSelector.done) {
			setForm(initialFormState)
		}
	}, [postSelector])

	const handleClick = () => {
		const formValidation = validateForm(schema, form)

		if (formValidation.error) {
			const firstError = Object.values(mapValidationErrors(formValidation.error))[0]
			setFormErrors(firstError)
		} else {
			setFormErrors('')
			dispatch(createAction({
				...form
			}))
		}
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({
			...form,
			[event.target.name]: event.target.value

		})
	}

	return (
		<>
			<FormControl sx={{ width: '100%' }}>
				<Typography variant='h5' sx={{mb: 2}}>Nuevo post</Typography>
				<Textarea
					value={form.content}
					placeholder="Escribe algo…"
					minRows={3}
					maxRows={10}
					name='content'
					error={Boolean(formErrors)}
					onChange={handleInputChange}
					startDecorator={
						<InputBase
							error={Boolean(formErrors)}
							value={form.title}
							name='title'
							sx={{
								ml: 1,
								mr: 1,
								fontSize: '1.1rem',
								"&.Mui-error .MuiInputBase-input": {
									color: theme.palette.error.main
								}
							}}
							fullWidth
							placeholder='Titulo...'
							onChange={handleInputChange} />
					}
					endDecorator={
						<Box
							sx={{
								display: 'flex',
								pt: 'var(--Textarea-paddingBlock)',
								borderTop: '1px solid',
								borderColor: 'divider',
								flex: 'auto',
							}}
						>
							<Button sx={{ ml: 'auto' }} size='lg' onClick={handleClick}>Publicar</Button>
						</Box>
					}
					sx={{
						minWidth: 300,
					}}
				/>
				<FormHelperText>{formErrors}</FormHelperText>
			</FormControl>
		</>
	);
}
