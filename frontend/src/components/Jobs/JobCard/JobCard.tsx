import React, { MouseEvent, useState, useEffect } from "react";
import "./JobCard.css";
import { Job } from "../../../store/action/JobAction";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { connect } from "react-redux";
import DeleteJob from "./DeleteJob/DeleteJob";
import EditJob from "./EditJob/EditJob";
import rootReducer from "../../../store/reducers";


interface jobProps {
    eachJobs: Job
    key: number
    jobs: Job[]
}

const JobCard: React.FC<jobProps> = ({eachJobs, key, jobs}) => {
    const [deleteJob, setDeleteJob] = useState(false)
    const [editJob, setEditJob] = useState(false)

    const handleDelete = (event: MouseEvent) => {
        event.preventDefault()
        setDeleteJob(!deleteJob) 
    }

    const handleEdit = (event: MouseEvent) => {
        event.preventDefault()
        setEditJob(!editJob)
    }

    useEffect(() => {

    }, [jobs])

    
    return (
        <div key={key}>
            {deleteJob ? <DeleteJob setDeleteJob={setDeleteJob} deleteJob={deleteJob} jobId={eachJobs.job_id}/> : <></>}
            {editJob ? <EditJob setEditJob={setEditJob} editJob={editJob} job={eachJobs}/> : <></>}
            <div className="job_card_container">    

                <div className="company_name">
                    {eachJobs.compay_name}
                </div>

                <div className="description">    
                    {eachJobs.job_description}
                </div>

                <div className="country">
                    {eachJobs.country} 
                </div>

                <div className="city">
                    {eachJobs.city} 
                </div>

                <div >
                    {eachJobs.statuses?.map((item) => {
                        return <div className="status_and_date_card" key={item.id}> 
                                <p className="status">{item.application_status}</p>
                                <p className="date">{item.date}</p>
                        </div>
                    })}
                   
                </div>

                <div className="comments">
                    {eachJobs.comments}
                </div>
                <div>
                    <MdDelete style={{cursor: 'pointer'}} onClick={handleDelete} size={25}/>
                    <MdModeEdit style={{cursor: 'pointer'}}  onClick={handleEdit} size={25}/> 
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state: ReturnType<typeof rootReducer>) => {
    return{
        jobs: state.jobsReducer.jobs
    };
};


export default connect(mapStateToProps)(JobCard);