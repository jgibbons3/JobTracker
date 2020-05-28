import React, { MouseEvent } from "react";
import { connect } from "react-redux";
import "./DeleteJob.css";
import { deleteJobAction } from "../../../../store/action/JobAction";


interface DeleteJob {
    setDeleteJob: Function
    deleteJob: boolean
    jobId: number
    dispatch: Function
}

const DeleteJob: React.FC<DeleteJob> = ({setDeleteJob, deleteJob, jobId, dispatch}) => {
  
   const handleDeleteJob = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        dispatch(deleteJobAction(jobId))
        setDeleteJob(!deleteJob) 
   }

    const handleKeepJob = (event: MouseEvent) => {
        event.preventDefault()
        setDeleteJob(!deleteJob) 
    }

    return(
        <div className='modal-wrapper'>
            <div className='modal-background'/>
                <div className='modal-content'>
                    <div className="delete_post_message">
                        <p>Are you sure you want to delete this job?</p>
                    </div>

                    <div>
                        <button onClick={handleDeleteJob} className="delete_post_button">Yes</button>
                        <button onClick={handleKeepJob} className="delete_post_button">No</button>
                    </div>
            </div>
        </div>

    );
};


export default connect()(DeleteJob);