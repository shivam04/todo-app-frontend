import { request } from '../../Helper/Axios';
import Login from '../Login';
import HttpMethod from '../../Constant/HttpMethod';
import { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import NavBar from '../NavBar';
import AuthContext from '../../Context/AuthContext';

function Home() {
    let { isActive, setIsActive } = useContext(AuthContext);
    let [data, setData] = useState("Loading....");
    if (!isActive) {
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