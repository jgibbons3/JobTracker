import React from "react";
import { connect } from "react-redux";
import { Job } from "../../../store/action/JobAction";
import JobCard from "../JobCard/JobCard";
import { isJobRejected } from "../OpenJobs/OpenJobs";


interface closeJobs {
    searchJobs: Job[]
}

const CloseJobs: React.FC<closeJobs> = ({searchJobs}) => {

    const newArray = searchJobs?.filter(job => isJobRejected(job))
    
    return (
        <div>
           {newArray.length === 0 ? <p className="job_filter_messages">No jobs with status close yet</p> : 
           newArray.map((job) => {
                return <JobCard key={job.job_id} eachJobs={job}/>
            })}
        </div>

    )
}


const mapStateToProps = (state: any) => {
    return{
        searchJobs: state.jobsReducer.searchJobs
    };
};

export default connect(mapStateToProps)(CloseJobs);