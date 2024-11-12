import React from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation('common');

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};
