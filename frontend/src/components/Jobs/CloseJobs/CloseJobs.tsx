import React from "react";
import { connect } from "react-redux";
import { Job } from "../../../store/action/JobAction";
import JobCard from "../JobCard/JobCard";
import { isJobRejected } from "../OpenJobs/OpenJobs";


interface closeJobs {
    jobs: Job[]
}

const CloseJobs: React.FC<closeJobs> = ({jobs}) => {

    const newArray = jobs?.filter(job => isJobRejected(job))
    
    return (
        <div>
           {newArray.length === 0 ? <p className="job_filter_messages">No job applications in this cathegory</p> : 
           newArray.map((job) => {
                return <JobCard key={job.job_id} eachJobs={job}/>
            })}
        </div>

    )
}


const mapStateToProps = (state: any) => {
    return{
        jobs: state.jobsReducer.jobs
    };
};

export default connect(mapStateToProps)(CloseJobs);