import React from "react";
import { connect } from "react-redux";
import { Job } from "../../../store/action/JobAction";
import JobCard from "../JobCard/JobCard";


interface closeJobs {
    closedJobs: Job[]
}

const CloseJobs: React.FC<closeJobs> = ({closedJobs}) => {

    return (
        <div>
           {closedJobs?.length === 0 ? <p className="job_filter_messages">No job applications in this cathegory</p> : 
           closedJobs?.map((job) => {
                return <JobCard key={job.job_id} eachJobs={job}/>
            })}
        </div>
    )
}


export default connect()(CloseJobs);