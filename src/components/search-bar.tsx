import React from 'react';
import { Input } from 'antd';
import type { GetProps } from 'antd';
import { useTranslation } from 'next-i18next';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
};

const SearchBar: React.FC = () => {
    const { t } = useTranslation('search');
    return (
        <Search placeholder={t('search')} onSearch={onSearch} enterButton size={"large"} className={"rounded-lg"}/>
    );
};

export default SearchBar;
