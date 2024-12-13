import React, { useEffect, useRef, useState } from 'react';
import { Input, Spin, Button, Dropdown, Menu } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import {SearchOutlined} from "@ant-design/icons";

interface Suggestion {
    text: string;
    similarity: number;
}

const SearchBar: React.FC = () => {
    const { t } = useTranslation('search');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const wsRef = useRef<WebSocket | null>(null);
    const apiDomain = typeof window !== 'undefined' ? localStorage.getItem("ai_domain") : null; // Kiểm tra để tránh lỗi SSR
    const router = useRouter();
    const limit = 5;

    useEffect(() => {
        if (!apiDomain) return;

        wsRef.current = new WebSocket(`${apiDomain}/ws/suggest`);
        wsRef.current.onopen = () => {
            console.log("WebSocket connection opened");
        };

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("WebSocket message received:", data);
            setSuggestions(data.suggestions.slice(0, limit));
            setLoading(false);
        };

        wsRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [apiDomain, limit]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ query: value, limit: limit }));
        }
    };

    const handleSearch = async () => {
        if (!inputValue) return;

        await router.push(`/search?keyword=${inputValue}`);
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setInputValue(suggestion.text);
        handleSearch();
    };

    const menu = (
        <Menu>
            {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                    console.log(suggestion.text),
                        <Menu.Item key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            <div className={"flex w-full justify-between"}>
                                <p className={"flex"}> {suggestion.text} </p>
                                <p className={"flex"}> {(suggestion.similarity*100).toFixed(2) + "%"}</p>
                            </div>
                        </Menu.Item>
                ))
            ) : (
                <Menu.Item disabled>{t('no_suggestions')}</Menu.Item>
            )}
        </Menu>
    );

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
                    <SearchOutlined />
                </Button>
            </div>

            {loading && <Spin style={{ position: 'absolute', top: '45px', right: '15px' }} />}

            {inputValue && suggestions.length > 0 && (
                <Dropdown overlay={menu} visible trigger={['click']} className="w-full">
                    <div></div>
                </Dropdown>
            )}
        </div>
    );
};

export default SearchBar;