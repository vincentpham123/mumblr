import { useSelector,useEffect } from "react-redux";

import { Route, Switch, Redirect } from "react-router-dom";
import LoggedIn from "./loggedin";
import LoggedOut from "./loggedout";
import './dashboardnav.css';
import TodayDashboard from "./today";
import ForYouDashboard from "./ForYou";
import TrendingDashboard from "./trending";
import SpotLightDashboard from "./Spotlight";
const Dashboard = ({})=>{
    const sessionUser = useSelector(state=> state.session.user)


    return (
        <>
        <div className='dashboard-main'>
            <LoggedOut />
            {/* {sessionUser && <LoggedIn />}
            {!sessionUser && <LoggedOut />} */}
        </div>
        <Switch>
            <Redirect exact from="/explore" to="/explore/today" />

            <Route path="/explore/today">
                <TodayDashboard />
            </Route>
            <Route path="/explore/trending">
                <TrendingDashboard />
            </Route>
            <Route exact path="/explore/spotlight">
                <SpotLightDashboard />
            </Route>
            {/* <Route exact path="/explore/foryou">
                <ForYouDashboard />
            </Route>
            <Route path="/explore/following">
                {/* render spotlight */}
            {/* </Route> */} 
            <Route path="/">
                <TodayDashboard />
            </Route>
        </Switch>







        
        
        </>
    )
    // if session null, show logged out dashboard
    // if logged in, show logged in dashboard

    //logged out will have posts made today, trending??, spotlight
    //today will be posts reblogged by todayonmumblr account


}

export default Dashboard;