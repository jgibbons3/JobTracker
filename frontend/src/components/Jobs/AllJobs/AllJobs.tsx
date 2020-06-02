import React from "react";
import JobCard from "../JobCard/JobCard";
import { Job } from "../../../store/action/JobAction";
import { connect } from "react-redux";


interface Props {
    searchJobs: Job[]
}


const AllJobs: React.FC<Props> = ({searchJobs}) => {


    return (
        <div> 
            {searchJobs && searchJobs.map((job, i: number) => {
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