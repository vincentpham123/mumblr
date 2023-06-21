import { useSelector,useEffect } from "react-redux";

import { Route, Switch } from "react-router-dom";
import LoggedIn from "./loggedin";
import LoggedOut from "./loggedout";
import './dashboardnav.css';
import TodayDashboard from "./today";
const Dashboard = ({})=>{
    const sessionUser = useSelector(state=> state.session.user)


    return (
        <>
        <div className='dashboard-main'>
            {sessionUser && <LoggedIn />}
            {!sessionUser && <LoggedOut />}
        </div>
        
        </>
    )
    // if session null, show logged out dashboard
    // if logged in, show logged in dashboard

    //logged out will have posts made today, trending??, spotlight
    //today will be posts reblogged by todayonmumblr account


}

export default Dashboard;