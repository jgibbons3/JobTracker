import React from "react";
import { connect } from "react-redux";
import { Job } from "../../../store/action/JobAction";
import JobCard from "../JobCard/JobCard";


export interface interviewJobs {
    intervJobs: Job[]
}


const IntervJobs: React.FC<interviewJobs> = ({intervJobs}) => {

    return (
        <div>
            {intervJobs?.length === 0 ? <p className="job_filter_messages">No job applications in this cathegory</p> :
            intervJobs?.map((job, i: number) => {
                return <JobCard key={i} eachJobs={job}/>
            })}    
        </div>    
    )
}


export default connect()(IntervJobs);