import React, { useEffect } from "react";
import "./Home.css";
import { connect } from "react-redux"
import { Link, Redirect, Route } from 'react-router-dom';
import Jobs from "../Jobs/Jobs";
import Graphics from "../Graphics/Graphics";
import { allJobsAction } from "../../store/action/JobAction";
import Cards from "../Cards/Cards";


export interface routerProps {
    location: {
        pathname: string
    }
    dispatch: Function
}

const Home: React.FC<routerProps>  = ({location, dispatch}) => {
    const PathName = location.pathname;

    useEffect(() => {
        async function jobsWihoutStatus() {
            await dispatch(allJobsAction())
        }
        jobsWihoutStatus()   
    }, [dispatch]);

    return (
        <div className="home_container">
            <div className="left_home">
                <div className="links_header">
                    <Link to="/jobs/" style={{textDecoration: 'none'}}>
                        <p className={PathName.includes('/jobs') ? 'user_menu_clicked' : 'menuOptions'}>
                        Jobs</p>
                    </Link>
                    <Link to="/graphics/" style={{textDecoration: 'none'}}>
                        <p className={PathName.includes('/graphics') ? 'user_menu_clicked' : 'menuOptions'}>
                        Graphics</p>
                    </Link> 
                </div>   

                    <Route path='/jobs/' component={Jobs}/>
                    <Route path='/graphics/' component={Graphics}/>
                    <Redirect from="/" to="/jobs"/> 
                
            </div>
            <div className="right_home">
                <Cards/>
            </div>
        </div>
    )
}


export default connect()(Home);