import React from "react";
import { connect } from "react-redux";
import { Job } from "../../../store/action/JobAction";
import JobCard from "../JobCard/JobCard";
import { isJobRejected } from "../OpenJobs/OpenJobs";


export interface interviewJobs {
    searchJobs: Job[]
}

export function isJobOngoing(job: Job): boolean {
    return !isJobRejected(job) && !!job.statuses?.find(status => 
            status.application_status === "interview")  
}


const IntervJobs: React.FC<interviewJobs> = ({searchJobs}) => {

    const onGoingJobs = searchJobs?.filter(job => isJobOngoing(job))

    return (
        <div>
            {onGoingJobs.length === 0 ? <p className="job_filter_messages">No jobs in this cathegory</p> :
            onGoingJobs?.map((job, i: number) => {
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

export default connect(mapStateToProps)(IntervJobs);