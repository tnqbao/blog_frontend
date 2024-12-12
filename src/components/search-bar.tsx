import React, { useEffect, useRef, useState } from 'react';
import { Input, Spin, Button, Dropdown, Menu } from 'antd';
import { useTranslation } from 'next-i18next';
import {useRouter} from "next/router";

const SearchBar: React.FC = () => {
    const { t } = useTranslation('search');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [history, setHistory] = useState<{ query: string; limit: number }[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const wsRef = useRef<WebSocket | null>(null);
    const apiDomain = localStorage.getItem("ai_domain");
    const router = useRouter();
    const limit = 5;

    useEffect(() => {
        wsRef.current = new WebSocket(`${apiDomain}/ws/suggest`);
        wsRef.current.onopen = () => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify({ type: 'get_history' }));
            }
        };

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'history') {
                setHistory(data.history);
            } else {
                setSuggestions(data.slice(0, limit));
            }
            setLoading(false);
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [apiDomain, limit]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ query: event.target.value, limit }));
        }
    };

    const handleSearch = async () => {
        if (!inputValue) return;

        const newHistory = [{ query: inputValue, limit }, ...history.filter(item => item.query !== inputValue)];
        setHistory(newHistory);

        await router.push(`/search?keyword=${inputValue}`);
        // if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        //     wsRef.current.send(JSON.stringify({ query: inputValue, limit }));
        // }
    };

    // const handleHistoryClick = async (item: { query: string; limit: number }) => {
    //     setInputValue(item.query);
    //     setLoading(true);
    //     try {
    //         const response = await fetch(`${apiDomain}/search`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ query: item.query, limit: item.limit }),
    //         });
    //
    //         const result = await response.json();
    //         setSuggestions(result.data || []);
    //     } catch (error) {
    //         console.error('Error fetching search results:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const menu = (
    //     <Menu className={"relative"}>
    //         {suggestions.length > 0 &&
    //             suggestions.map((suggestion, index) => (
    //                 <Menu.Item key={index} onClick={() => setInputValue(suggestion)}>
    //                     {suggestion}
    //                 </Menu.Item>
    //             ))}
    //     </Menu>
    // );

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <Input
                    placeholder={t('search')}
                    value={inputValue}
                    onChange={handleInputChange}
                    size="large"
                    style={{ flex: 2 }}
                />
                <Button type="primary" size="large" onClick={handleSearch}>
                    {t('search')}
                </Button>
            </div>

            {/*{loading && <Spin style={{ position: 'absolute', top: '45px', right: '15px' }} />}*/}

            {/*<Dropdown*/}
            {/*    overlay={menu}*/}
            {/*    visible={suggestions.length > 0}*/}
            {/*    trigger={['click']}*/}
            {/*    className={"w-full"}*/}
            {/*>*/}
            {/*    <div></div>*/}
            {/*</Dropdown>*/}
        </div>
    );
};

export default SearchBar;
