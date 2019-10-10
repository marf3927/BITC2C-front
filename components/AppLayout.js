import React from 'react';
import Header from './header'


const AppLayout = ({children}) =>{
    return (
        <div>
            <Header/>
            {children}
        </div>
    );
};
export default AppLayout;