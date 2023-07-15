import { request, getAuthToken, isLoggedIn } from '../../Helper/Axios';
import Login from '../Login';
import HttpMethod from '../../Constant/HttpMethod';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import NavBar from '../NavBar';

function Home() {
    let [data, setData] = useState("Loading....");
    let [isActive, setIsActive] = useState(isLoggedIn());
    if (!isActive) {
        console.log(getAuthToken());
        return <Login  
            setIsActive={setIsActive}
        />;
    } else {
        request(
        HttpMethod.GET, 
        "/"
        ).then(res => {
            setData(res?.data?.message);
        }).catch(err => {
            console.log(err);
            setData("Error While Loading Data");
        });
        return (
            <>
                <NavBar />
                <Card>{data}</Card>
            </>
        );
    }
}

export default Home;