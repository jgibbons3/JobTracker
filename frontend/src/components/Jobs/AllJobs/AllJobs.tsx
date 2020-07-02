import React from "react";
import JobCard from "../JobCard/JobCard";
import { Job } from "../../../store/action/JobAction";
import { connect } from "react-redux";
import "./AllJobs.css";
import rootReducer from "../../../store/reducers";


interface Props {
    jobs: Job[]
}


const AllJobs: React.FC<Props> = ({jobs}) => {


    return (
        <div> 
            {jobs.length === 0 ? <p className="job_filter_messages">No job applications in this cathegory</p> : 
            jobs.map((job, i: number) => {
                return <JobCard key={i} eachJobs={job}/>
            })}  
        </div>
        
    )
}

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => {
    return{
        jobs: state.jobsReducer.jobs
    };
};

export default connect(mapStateToProps)(AllJobs);