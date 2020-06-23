import React from "react";
import { connect } from "react-redux";
import { Job } from "../../../store/action/JobAction";
import JobCard from "../JobCard/JobCard";


interface openJobs {
    openJobsArray: Job[]
}

const OpenJobs: React.FC<openJobs> = ({openJobsArray}) => {

    return (
        <div>
            {openJobsArray?.length === 0 ? <p className="job_filter_messages">No job applications in this cathegory</p> : 
            openJobsArray?.map((job, i: number) => {
                return <JobCard key={i} eachJobs={job}/>
            })}
        </div>
    )
}


export default connect()(OpenJobs);
