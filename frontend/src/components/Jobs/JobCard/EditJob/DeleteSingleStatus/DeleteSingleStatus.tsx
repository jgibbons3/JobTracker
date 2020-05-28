import React, { MouseEvent } from "react";
import { connect } from "react-redux";
import "./DeleteSingleStatus.css";
import { deleteSindleStatusAction, Status } from "../../../../../store/action/StatusAction";


interface DeleteJob {
    setDeleteSingleStatus: Function
    status: Status
    dispatch: Function
}

                                   
const DeleteSingleStatus: React.FC<DeleteJob> = ({setDeleteSingleStatus, status, dispatch}) => {

    console.log(status)
  
   const handleDeleteJob = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        dispatch(deleteSindleStatusAction(status))
        setDeleteSingleStatus(undefined) 
   }

    const handleKeepJob = (event: MouseEvent) => {
        event.preventDefault()
        setDeleteSingleStatus(undefined) 
    }

    return(
        <div className='modal-wrapper'>
            <div className='modal-background'/>
                <div className='modal-content'>
                    <div className="delete_post_message">
                        <p>Are you sure you want to delete this status?</p>
                    </div>

                    <div>
                        <button onClick={handleDeleteJob} className="delete_post_button">Yes</button>
                        <button onClick={handleKeepJob} className="delete_post_button">No</button>
                    </div>
            </div>
        </div>

    );
};


export default connect()(DeleteSingleStatus);