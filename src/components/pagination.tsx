import React, {useState} from 'react';
import type {PaginationProps} from 'antd';
import {Pagination} from 'antd';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";
import {setPage} from "@/utils/redux/slices/pagination";


const PaginationComponent: React.FC<{ totalPage: number | null }> = ({totalPage}) => {
    const {page} = useSelector((state: RootState) => state.pagination);
    const [current, setCurrent] = useState(page);
    const router = useRouter();
    const dispatch = useDispatch();

    const onChange: PaginationProps['onChange'] = (p: number) => {
        const currentPath = router.pathname;
        const currentQuery = {...router.query, page: p};
        dispatch(setPage(p));
        setCurrent(p);
        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    };


    return (
        <Pagination
            defaultCurrent={1}
            total={totalPage ? totalPage * 30 : 0}
            pageSize={30}
            onChange={onChange}
            current={current}
            align="center"
            showQuickJumper={true}
            className={"text-md p-4 bg-white"}
            hideOnSinglePage={true}
            showSizeChanger={false}
        />
    );
}

export default PaginationComponent;