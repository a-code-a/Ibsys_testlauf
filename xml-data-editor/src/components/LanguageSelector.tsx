import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const LanguageSelector: React.FC = () => {
  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'flex-end', 
      padding: '10px',
      gap: '10px'
    }}>
      <button 
        onClick={() => changeLanguage('de')}
        style={{
          backgroundColor: i18n.language === 'de' ? '#007bff' : '#f8f9fa',
          color: i18n.language === 'de' ? 'white' : 'black',
          border: '1px solid #007bff',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Deutsch
      </button>
      <button 
        onClick={() => changeLanguage('en')}
        style={{
          backgroundColor: i18n.language === 'en' ? '#007bff' : '#f8f9fa',
          color: i18n.language === 'en' ? 'white' : 'black',
          border: '1px solid #007bff',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSelector;
