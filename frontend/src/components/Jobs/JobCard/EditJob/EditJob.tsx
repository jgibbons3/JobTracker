import React, { MouseEvent, useState } from "react";
import { connect } from "react-redux";
import "./EditJob.css";
import { Job, updateSingleJobAction } from "../../../../store/action/JobAction";
import { Status, updateSingleStatusAction } from "../../../../store/action/StatusAction";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import DeleteSingleStatus from "./DeleteSingleStatus/DeleteSingleStatus";


interface DeleteJob {
    setEditJob: Function
    editJob: boolean
    job: Job
    dispatch: Function
    jobs: Job[]
}

interface JobState {
    compay_name: string
    job_description: string
    city: string
    comments: string
}

interface JobStatusState {
    application_status: string
    date: string
}

const EditJob: React.FC<DeleteJob> = ({setEditJob, editJob, job, dispatch, jobs}) => {
    const [deleteSingleStatus, setDeleteSingleStatus] = useState<Status>()

    const [editSingleStatus, setEditSingleStatus] = useState<JobStatusState>({
        application_status: "",
        date: ""
    })

    // edit single job
    const [editSingleJob, setEditSingleJob] = useState<JobState>({
        compay_name: "",
        job_description: "",
        city: "",
        comments: ""
    })

    const handleEditSingleJob = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditSingleJob({...editSingleJob, [e.target.name]: e.target.value})
    }
    
    const handleEditJob = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let formData = ({});
        Object.keys(editSingleJob).forEach((key) => {
            const k: keyof JobState = key as any
            if (editSingleJob[k]) {
                formData =  ({...formData, [k]: editSingleJob[k]})
            }
        });
        dispatch(updateSingleJobAction(formData, job.job_id))
        setEditJob(!editJob)
    }


    // edit single status
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setEditSingleStatus({...editSingleStatus, [e.target.name]: e.target.value})
    }

    const handleChangeSingleStatus = (event: React.FormEvent<HTMLFormElement>, status: Status) => {
        event.preventDefault()

        let newStatus = ({});
        Object.keys(editSingleStatus).forEach((key) => {
            const k: keyof JobStatusState = key as any
            if (editSingleStatus[k]) {
                newStatus =  ({...newStatus, [k]: editSingleStatus[k]})
            }
        });
        
        dispatch(updateSingleStatusAction(newStatus, status))
        setEditJob(!editJob)
    }


    // close modal window
    const handleCancelEdit = (event: MouseEvent) => {
        event.preventDefault()
        setEditJob(!editJob) 
    }


    // delete single status
    const handleDeleteSingleStatus = (event: MouseEvent, status: Status) => {
        event.preventDefault()
        setDeleteSingleStatus(status)
    }

    return(
        <div className='modal-wrapper'>
            <div className='modal-background'/>
                <div className='modal_edit_content'>
                    <form className='update_form' onSubmit={handleEditJob}>

                    {deleteSingleStatus ? <DeleteSingleStatus status={deleteSingleStatus} setDeleteSingleStatus={setDeleteSingleStatus}/> : <></>}
                        <div className="update_title_container">                       
                            <h1 className='update_job_label'>Edit Job</h1>
                            <button type="submit" className="edit_single_job_button">
                                <MdModeEdit style={{cursor: 'pointer'}}  size={25}/>
                            </button> 
                        </div>

                        <div className="input_edit_profile">
                            <label className='update_label'>Company</label>
                            <input className='update_data' name="compay_name" type='text' onChange={handleEditSingleJob}
                            defaultValue={job.compay_name}/>

                            <label className='update_label'>Description</label>
                            <input className='update_data' name="job_description" type='text' onChange={handleEditSingleJob}
                            defaultValue={job.job_description}/>
                        </div>

                        <div className="input_edit_profile">
                            <label className='update_label'>City</label>
                            <input className='update_data' name="city" type='text' onChange={handleEditSingleJob} 
                            defaultValue={job.city}/>
                        </div>

                        <div className="input_edit_profile">
                            <label className='update_label'>Comments</label>
                            <textarea className='update_textarea' id="about_edit" name="comments" onChange={handleEditSingleJob}
                            defaultValue={job.comments}/>
                        </div>  
                    
                    </form>

                    <div className="edit_line"/>

                        <div className="input_edit_status">
                            <h1 className='update_statuses_label'>Edit Statuses</h1>
                            {job.statuses?.map((status: Status) => {
                                return <div key={status.id}>
                                    <form className="status_edit_form" onSubmit={(event) => handleChangeSingleStatus(event, status)}>
                                        <select className='update_data' name="application_status" onChange={handleStatusChange}  
                                        defaultValue={status.application_status}>
                                            <option value="open">open</option>
                                            <option value="interview">interview</option>
                                            <option value="rejected">rejected</option>
                                        </select>
                                        

                                        <FcCalendar style={{cursor: 'pointer'}}/>
                                        <input className='update_data' name="date" type='text' onChange={handleStatusChange} 
                                        defaultValue={status.date}/>
                                    
                                        <MdDelete style={{cursor: 'pointer'}} onClick={(event) => handleDeleteSingleStatus(event, status)} size={25}/>
                                        <button type="submit" className="dit_single_status_button">
                                            <MdModeEdit style={{cursor: 'pointer'}} size={25}/> 
                                       </button>
                                    </form>
                                </div>
                                
                            })}       
                        </div>

                    <div className="edit_buttons">
                        <button onClick={handleCancelEdit} className="edit_post_button">Close</button>
                    </div>
                    
                </div>
        </div>

    );
};


const mapStateToProps = (state: any) => {
    return{
        jobs: state.jobsReducer.jobs
    };
};

export default connect(mapStateToProps)(EditJob);