import React from "react";
import { connect } from "react-redux";
import { Job } from "../../../store/action/JobAction";
import JobCard from "../JobCard/JobCard";


interface openJobs {
    jobs: Job[]
}

export function isJobRejected(job: Job): boolean {
    return !!job.statuses?.find(status => 
        status.application_status === "rejected")
}


const OpenJobs: React.FC<openJobs> = ({jobs}) => {
    
    const newArray = jobs?.filter(job => !isJobRejected(job))

    return (
        <div>
            {newArray.length === 0 ? <p className="job_filter_messages">No job applications in this cathegory</p> : 
            newArray.map((job, i: number) => {
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

export default connect(mapStateToProps)(OpenJobs);
