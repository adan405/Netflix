import React, { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';

interface Props {
    children: ReactNode;
}
const Layout: React.FC<Props> = (props) => {
    return (
        <div>
            <Navbar />
            {props.children}
            <Footer />
        </div>
    );
}

export default Layout;
