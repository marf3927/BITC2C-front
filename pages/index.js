import React, {useContext} from 'react'
import AppLayout from '../components/AppLayout';
import Chart from '../components/tradeMain/chart'




const Home = () => {
    return (
        <>
            <AppLayout>
                <Chart/>
                <div>Hello World!</div>
            </AppLayout>
        </>
    );
};

export default Home;