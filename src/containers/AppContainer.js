import React from "react";
import {Link, Outlet} from 'react-router-dom';

const AppContainer = () => {


    return(
        <>
            <header>
                <Link to="/" activeStyle={{color: "red",textDecoration:"none"}}><h1>TractorFactor</h1></Link>
                <nav>
                    <Link to="/"  activeStyle={{color: "red",textDecoration:"none"}}> Search Inspectors</Link>
                    <Link to="admin" > Admin</Link>
                </nav>
            </header>

            <Outlet />
        </>
    )
}
export default AppContainer;