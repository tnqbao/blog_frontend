import React from 'react';
import { Input } from 'antd';
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => alert(`Search is updated soon!`);

const Searchbar: React.FC = () => (
        <Search placeholder="input search text" onSearch={onSearch} enterButton />
);

export default Searchbar;