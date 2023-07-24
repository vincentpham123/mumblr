import { useState,useEffect } from "react";

import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoggedIn from "./loggedin";
import LoggedOut from "./loggedout";
import './dashboardnav.css';
import SpotLightDashboard from "./Spotlight";
import DashboardPartial from "./DashBoardPartial";
const Dashboard = ({})=>{
    const sessionUser = useSelector(state=> state.session.user)
    const [currentTab,setCurrentTab] = useState('');
   
    return (
        <>
        <div className='dashboard-main'>
            {sessionUser && <LoggedIn setCurrentTab={setCurrentTab}/>}
            {!sessionUser && <LoggedOut setCurrentTab={setCurrentTab}/>}
        </div>
        <Switch>
            <Route exact path='/'>
                {sessionUser ? 
                    <DashboardPartial type={'foryou'}/> :
                    <DashboardPartial type={'preview'}/>
                }
            </Route>      
            <Route path='/explore/preview'>
                <DashboardPartial type={'preview'}/>
            </Route>
            <Route exact path="/explore/foryou">
                <DashboardPartial type={'foryou'}/>

            </Route>
            <Route exact path="/explore/trending">
                <DashboardPartial type={'trending'}/>
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
            {/* <Route path="/">
                <ForYouDashboard />
            </Route> */}
        </Switch>







        
        
        </>
    )
    // if session null, show logged out dashboard
    // if logged in, show logged in dashboard

    //logged out will have posts made today, trending??, spotlight
    //today will be posts reblogged by todayonmumblr account


}

export default Dashboard;