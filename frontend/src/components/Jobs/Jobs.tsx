import React, { useState, MouseEvent, useEffect } from "react";
import "./Jobs.css";
import { Link, Route, Redirect } from "react-router-dom";
import AllJobs from "./AllJobs/AllJobs";
import OpenJobs from "./OpenJobs/OpenJobs";
import IntervJobs from "./IntervJobs/IntervJobs";
import CloseJobs from "./CloseJobs/CloseJobs";
import { connect } from "react-redux";
import CreateJob from "./CreateJob/CreateJob";
import { BehaviorSubject } from "rxjs"
import { filter, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { searchAction } from "../../store/action/JobAction";


interface Props {
    text?: string;
    dispatch: Function,
    location: {
        pathname: string
    }
}


const Jobs: React.FC<Props> = ({location, dispatch}) => {
    const PathName = location.pathname;
    const [newJobModal, setNewJobModal] = useState(false)

    // search post
    const [searchSubject] = useState<BehaviorSubject<string>>(new BehaviorSubject(""))
    
    useEffect(() => {
        searchSubject.pipe(
            filter(val => val.length >= 0),
            debounceTime(750),
            distinctUntilChanged(),
        ).subscribe((val) => {
            dispatch(searchAction(val))
        })
    }, [dispatch, searchSubject])
    
    
    const [state, setState] = useState<{search: string}>({
        search: "",
    });

    const handleSearchJob = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setState({...state, [e.target.name]: newValue})
        searchSubject.next(newValue)
    };
   
    const handleCreateJob = (event: MouseEvent) => {
        event.preventDefault()
        setNewJobModal(!newJobModal)
    }
    
    return (
        <div>
            {newJobModal ? <CreateJob setNewJobModal={setNewJobModal} newJobModal={newJobModal}/> : <></>}

            <div className='search_job'>
                <input type='text' name='search' value={state.search} className='searchJobInput' onChange={handleSearchJob} 
                placeholder='Search job...'/>
            </div>

            <div className="left_home">
                <div className="links_sub_menu">
                    <div className="links_header">
                        <Link to="/jobs/all/" style={{textDecoration: 'none'}}>
                            <p className={PathName.includes('/all') ? 'user_filter_clicked' : 'filterOptions'}>
                            All</p>
                        </Link>
                        <Link to="/jobs/open/" style={{textDecoration: 'none'}}>
                            <p className={PathName.includes('/open') ? 'user_filter_clicked' : 'filterOptions'}>
                            Open</p>
                        </Link> 
                        <Link to="/jobs/interview/" style={{textDecoration: 'none'}}>
                            <p className={PathName.includes('/interview') ? 'user_filter_clicked' : 'filterOptions'}>
                            Interview</p>
                        </Link>
                        <Link to="/jobs/close/" style={{textDecoration: 'none'}}>
                            <p className={PathName.includes('/close') ? 'user_filter_clicked' : 'filterOptions'}>
                            Close</p>
                        </Link>
                    </div>
                    <div className="new_job_container">
                        <button onClick={handleCreateJob} style={{cursor: 'pointer'}} className="new_job_button">Add a Job</button>
                    </div>
                </div>  

                
                <div className="job_card_headers">
                    <div className="company_name_header"> 
                        <p>Company</p>
                    </div>
                    
                    <div className="description_header">                    
                        <p>Description</p>
                    </div>

                    <div className="city_header">
                        <p>City</p>
                    </div>

                    <div className="status_header">
                        <p>Status</p>
                    </div>

                    <div className="date_header">
                        <p>Date</p>
                    </div>
                    
                    <p id="comments">Comments</p>
                </div>

                    <Route path='/jobs/all/' component={AllJobs}/>
                    <Route path='/jobs/open/' component={OpenJobs}/>
                    <Route path='/jobs/interview/' component={IntervJobs}/>
                    <Route path='/jobs/close/' component={CloseJobs}/>
                    <Redirect from="jobs/" to="/jobs/all"/> 
                
            </div>
            
        </div>
    )
}



export default connect()(Jobs);