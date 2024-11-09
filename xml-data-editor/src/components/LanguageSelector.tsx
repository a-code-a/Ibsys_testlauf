import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('selectedLanguage', event.target.value);
  };

  return (
    <FormControl 
      size="small" 
      sx={{ 
        m: 1, 
        minWidth: 120,
        position: 'absolute',
        top: '10px',
        right: '10px'
      }}
    >
      <Select
        value={i18n.language}
        onChange={handleChange}
        sx={{
          backgroundColor: 'white',
          '& .MuiSelect-select': {
            paddingY: '8px',
          }
        }}
      >
        <MenuItem value="de">Deutsch</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
