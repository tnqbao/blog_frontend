import React, {useEffect, useRef, useState} from 'react';
import {Input, List, Spin} from 'antd';
import {useTranslation} from 'next-i18next';

const {Search} = Input;

const SearchBar: React.FC = () => {
    const {t} = useTranslation('search');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const [inputValue, setInputValue] = useState("");
    const ai_api = localStorage.getItem("ai_domain");
    useEffect(() => {

        wsRef.current = new WebSocket(`${ai_api}/ws/suggest`);
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        setLoading(true);
        wsRef.current.send(JSON.stringify({
            query: value,
            top_k: 5
        }));
    };

    useEffect(() => {
        if (!wsRef.current) return;
        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data)
            setSuggestions(data.slice(0, 5));
            setLoading(false);
        };

        wsRef.current.onerror = () => {
            setLoading(false);
        };
    }, []);
    return (
        <div style={{position: 'relative', width: '100%'}}>
            <Search
                placeholder={t('search')}
                value={inputValue}
                onChange={handleInputChange}
                enterButton
                size="large"
                className="rounded-lg"
            />
            {loading && <Spin style={{position: 'absolute', top: '45px', right: '15px'}}/>}
            {suggestions.length > 0 && (
                <List
                    style={{
                        position: 'absolute',
                        zIndex: 1000,
                        width: '100%',
                        background: 'white',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        marginTop: '8px'
                    }}
                    size="small"
                    dataSource={suggestions}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />
            )}
        </div>
    );
};

export default SearchBar;