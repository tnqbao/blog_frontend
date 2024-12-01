import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;
const FooterComp: React.FC = () => {

  return (
    <Footer className="flex flex-col md:flex-row justify-evenly items-center bg-blue-800 text-white p-4 gap-3 h-auto ">
        <div> Create by BlogMindScape Team</div>
    </Footer>
  );
};

export default FooterComp;