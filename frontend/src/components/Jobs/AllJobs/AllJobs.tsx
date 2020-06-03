import React from "react";
import JobCard from "../JobCard/JobCard";
import { Job } from "../../../store/action/JobAction";
import { connect } from "react-redux";
import "./AllJobs.css";


interface Props {
    searchJobs: Job[]
}


const AllJobs: React.FC<Props> = ({searchJobs}) => {


    return (
        <div> 
            {searchJobs.length === 0 ? <p className="job_filter_messages">No jobs in this cathegory</p> : 
            searchJobs.map((job, i: number) => {
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

export default connect(mapStateToProps)(AllJobs);