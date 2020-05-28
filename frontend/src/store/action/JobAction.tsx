import { Status, statusAction } from "./StatusAction";

export interface Job {
    job_id: number
    compay_name: string
    job_description: string
    country?: string
    city: string
    comments: string
    statuses?: Status[] 
}

export interface JobAction {
    type: string
    payload: Job[]
}

export interface DeleteAction {
    type: string
    payload: number
}

export interface EditJobAction {
    type: string
    payload: {}
    job_id: number
}

export const allJobsAction = () => async (dispatch: Function, getState: Function) => {

    const myHeaders = new Headers({
        "content-type": "application/json",
    });

    const config = {
        method: 'GET',
        headers: myHeaders
    };

    const response = await fetch("http://localhost:8000/jobs/", config);
    const jobs = await response.json();
   

    const action: JobAction = {
        type: "GET_ALL_JOBS",
        payload: jobs
    };
   
    dispatch(action);

    jobs.map((item: Job) => {
        return dispatch(statusAction(item.job_id))
    })
};

export const deleteJobAction = (jobId: number) => async (dispatch: Function, getState: Function) => {

    const myHeaders = new Headers({
        "content-type": "application/json",
    });

    const config = {
        method: 'DELETE',
        headers: myHeaders
    };

    await fetch(`http://localhost:8000/jobs/${jobId}/`, config);
 
    const action: DeleteAction = {
        type: "DELETE_JOB",
        payload: jobId
    };   
    
    dispatch(action);
}


export const updateSingleJobAction = (updateData: {}, jobId: number) => async (dispatch: Function, getState: Function) => {

    const myHeaders = new Headers({
        "content-type": "application/json",
    });

    const config = {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify(updateData)
    };

    const response = await fetch(`http://localhost:8000/jobs/${jobId}/`, config);
    await response.json();

    const action: EditJobAction = {
        type: "EDIT_JOB",
        payload: updateData,
        job_id: jobId
    };   
    
    dispatch(action);
}