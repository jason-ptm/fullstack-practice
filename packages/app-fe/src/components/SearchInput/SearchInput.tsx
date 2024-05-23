import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

interface ISearchInputProps {
    handleChange: (value?: string) => void
    handleVoidInput: () => void
}

const SearchInput: React.FC<ISearchInputProps> = ({ handleChange, handleVoidInput }) => {
    const [searchText, setSearchText] = useState('')
    const [showClearIcon, setShowClearIcon] = useState(false)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (value) {
            handleChange(value)
            setShowClearIcon(true)
        }
        else {
            handleChange(undefined)
            setShowClearIcon(false)
            handleVoidInput()
        }
        setSearchText(value)
    }

    const handleClick = () => {
        setSearchText('')
        setShowClearIcon(false)
        handleVoidInput()
    }

    return <>
        <FormControl>
            <TextField
                value={searchText}
                size="small"
                variant="outlined"
                onChange={handleInputChange}
                sx={{
                    borderRadius: '8px'
                }}
                InputProps={{
                    sx: { borderRadius: '18px', backgroundColor: '#fff' },
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            sx={{ visibility: showClearIcon ? 'visible' : 'hidden', cursor: 'pointer', animation: 'all 1s' }}
                            onClick={handleClick}
                        >
                            <ClearIcon />
                        </InputAdornment>
                    )
                }}
            />
        </FormControl>
    </>;
}

export default SearchInput;
