import React from "react";
import { connect } from "react-redux";
import { Job } from "../../../store/action/JobAction";
import JobCard from "../JobCard/JobCard";
import { isJobRejected } from "../OpenJobs/OpenJobs";


export interface interviewJobs {
    jobs: Job[]
}

export function isJobOngoing(job: Job): boolean {
    return !isJobRejected(job) && !!job.statuses?.find(status => 
            status.application_status === "interview")  
}


const IntervJobs: React.FC<interviewJobs> = ({jobs}) => {

    const onGoingJobs = jobs?.filter(job => isJobOngoing(job))

    return (
        <div>
            {onGoingJobs.length === 0 ? <p className="job_filter_messages">No job applications in this cathegory</p> :
            onGoingJobs?.map((job, i: number) => {
                return <JobCard key={i} eachJobs={job}/>
            })}    
        </div>
        
    )
}


const mapStateToProps = (state: any) => {
    return{
        jobs: state.jobsReducer.jobs
    };
};

export default connect(mapStateToProps)(IntervJobs);