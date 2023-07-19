import { useSelector,useEffect } from "react-redux";

import { Route, Switch, Redirect } from "react-router-dom";
import LoggedIn from "./loggedin";
import LoggedOut from "./loggedout";
import './dashboardnav.css';
import TrendingDashboard from "./trending";
import SpotLightDashboard from "./Spotlight";
import ForYouDashboard from "./ForYou";
const Dashboard = ({})=>{
    const sessionUser = useSelector(state=> state.session.user)


    return (
        <>
        <div className='dashboard-main'>
            {sessionUser && <LoggedIn />}
            {!sessionUser && <LoggedOut />}
        </div>
        <Switch>
            <Redirect exact from="/explore" to="/explore/today" />

            <Route path="/explore/foryou">
                <ForYouDashboard />
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
                <ForYouDashboard />
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