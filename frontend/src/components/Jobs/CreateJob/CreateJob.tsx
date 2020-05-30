import React, { MouseEvent, useState } from "react";
import { connect } from "react-redux";
import "./CreateJob.css";
import { addNewJobAction } from "../../../store/action/JobAction";


interface newJobMessage {
    setNewJobModal: Function
    newJobModal: boolean
    dispatch: Function
}

interface newJob {
    compay_name: string
    job_description: string
    city: string
    comments: string
}

const CreateJob: React.FC<newJobMessage> = ({setNewJobModal, newJobModal, dispatch}) => {
    const [newJob, setEditNewJob] = useState<newJob>({
        compay_name: "",
        job_description: "",
        city: "",
        comments: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        setEditNewJob({ ...newJob, [event.target.name]: event.target.value});
    }

    const handleNewJob = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(addNewJobAction(newJob))
        setNewJobModal(!newJobModal) 
    }

    const handleClose = (event: MouseEvent) => {
        event.preventDefault()
        setNewJobModal(!newJobModal) 
    }

    return (
        <div className='modal-wrapper'>
            <div className='modal-background'/>
            <div className='modal_edit_content'>

                <div className="newJob_title_container">                       
                    <h1 className='create_job_label'>Add new Job</h1>
                </div>

                <form onSubmit={handleNewJob} className='new_job_form' >
                    <div className="input_edit_profile">
                        <label className='update_label'>Company</label>
                        <input className='update_data' name="compay_name" type='text' value={newJob.compay_name} 
                        onChange={handleChange}/>

                        <label className='update_label'>Description</label>
                        <input className='update_data' name="job_description" type='text' value={newJob.job_description}
                        onChange={handleChange}/>
                    </div>

                    <div className="input_edit_profile">
                        <label className='update_label'>City</label>
                        <input className='update_data' name="city" type='text' value={newJob.city} onChange={handleChange}/>
                    </div>

                    <div className="input_edit_profile">
                        <label className='update_label'>Comments</label>
                        <textarea className='update_textarea' id="about_edit" name="comments" value={newJob.comments}
                        onChange={handleChange}/>
                    </div>  
                
                    <div className="edit_buttons">
                        <button type="submit" className="add_job_button">Add</button>
                        <button onClick={handleClose} className="add_job_button">Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default connect()(CreateJob)