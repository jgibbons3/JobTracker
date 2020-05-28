import React from "react";
import JobCard from "../JobCard/JobCard";
import { Job } from "../../../store/action/JobAction";
import { connect } from "react-redux";


interface Props {
    jobs: Job[]
}


const AllJobs: React.FC<Props> = ({jobs}) => {


    return (
        <div> 
            {jobs && jobs.map((job, i: number) => {
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

export default connect(mapStateToProps)(AllJobs);