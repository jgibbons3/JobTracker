import React from "react";
import { connect } from "react-redux";
import { Job } from "../../../store/action/JobAction";
import JobCard from "../JobCard/JobCard";


interface openJobs {
    searchJobs: Job[]
}

export function isJobRejected(job: Job): boolean {
    return !!job.statuses?.find(status => 
        status.application_status === "rejected")
}


const OpenJobs: React.FC<openJobs> = ({searchJobs}) => {
    
    const newArray = searchJobs?.filter(job => !isJobRejected(job))

    return (
        <div>
            {newArray.length === 0 ? <p className="job_filter_messages">No jobs in this cathegory</p> : 
            newArray?.map((job, i: number) => {
                return <JobCard key={i} eachJobs={job}/>
            })}
        </div>
    )
}


const mapStateToProps = (state: any) => {
    return{
        searchJobs: state.jobsReducer.searchJobs
    };
};

export default connect(mapStateToProps)(OpenJobs);
