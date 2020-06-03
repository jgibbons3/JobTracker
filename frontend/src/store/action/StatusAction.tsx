
export interface Status {
    id: number
    job_selector: {
        job_id: number
    }
    application_status: string
    date: string
}

export interface StatusAction {
    type: string
    payload: Status[]
}

export interface DeleteSingleStatusAction {
    type: string
    payload: Status
}

export interface EditSingleStatusAction {
    type: string
    payload: Status
    newStatus : {}
}
 export interface AddNewStatusAction {
    type: string
    payload: Status
 }


export const statusAction = (job_id: number) => async (dispatch: Function, getState: Function) => {

    const myHeaders = new Headers({
        "content-type": "application/json",
    });

    const config = {
        method: 'GET',
        headers: myHeaders
    };

    const response = await fetch(`http://localhost:8000/history_status/${job_id}/`, config);
    const data: Status[] = await response.json();
   
    const action: StatusAction = {
        type: "GET_JOB_STATUS",
        payload: data
    };
   
    dispatch(action);
};

export const deleteSindleStatusAction = (status: Status) => async (dispatch: Function, getState: Function) => {

    const myHeaders = new Headers({
        "content-type": "application/json",
    });

    const config = {
        method: 'DELETE',
        headers: myHeaders
    };

    await fetch(`http://localhost:8000/status/${status.id}/`, config);
 
    const action: DeleteSingleStatusAction = {
        type: "DELETE_SINGLE_STATUS",
        payload: status
    };   
    
    dispatch(action);
}

export const updateSingleStatusAction = (updateData: {}, status: Status) => async (dispatch: Function, getState: Function) => {

    const myHeaders = new Headers({
        "content-type": "application/json",
    });

    const config = {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify(updateData)
    };

    const response = await fetch(`http://localhost:8000/status/${status.id}/`, config);
    await response.json();

    const action: EditSingleStatusAction = {
        type: "EDIT_SINGLE_STATUS",
        payload: status,
        newStatus: updateData
    };   
    
    dispatch(action);
}

export const addNewStatusAction = (newStatus: {}, job_id: number) => async (dispatch: Function, getState: Function) => {

    const myHeaders = new Headers({
        "content-type": "application/json",
    });

    const config = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(newStatus)
    };

    const response = await fetch(`http://localhost:8000/new_status/${job_id}/`, config);
    const data = await response.json();

    const action: AddNewStatusAction = {
        type: "ADD_NEW_STATUS_JOB",
        payload: data
    };   
    
    dispatch(action);
}