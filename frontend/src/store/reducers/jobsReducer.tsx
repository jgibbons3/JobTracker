import { JobAction, Job, DeleteAction, EditJobAction, AddNewJobAction, SearchJobAction } from "../action/JobAction";
import { StatusAction, DeleteSingleStatusAction, EditSingleStatusAction, Status, AddNewStatusAction } from "../action/StatusAction";


export interface InitialState {
    jobs: Job[]
}

const initialState: InitialState = {
    jobs: []
}

const jobsReducer = function (state = initialState, action: JobAction | StatusAction | DeleteAction | DeleteSingleStatusAction | 
    EditJobAction | EditSingleStatusAction | AddNewJobAction | SearchJobAction | AddNewStatusAction): InitialState {
    switch (action.type) {
           
        case "GET_ALL_JOBS":
            return {
                ...state,
                jobs: (action as JobAction).payload
            };

        case "GET_JOB_STATUS":
            const statuses = action as StatusAction
            const firstStatus = statuses.payload[0]
            if(firstStatus) {
           
                const jobId = firstStatus.job_selector.job_id
                const currentJob = state.jobs.find(job => job.job_id === jobId) as Job
                currentJob.statuses = statuses.payload
                
                return {
                    ...state,
                    jobs: [...state.jobs]
                };
            } else {
                return {
                    ...state
                }
            }; 


        case "DELETE_JOB":
            const copyJobs = [...state.jobs]
            const job_id = action as DeleteAction
            const filterJobs = copyJobs.filter(job => job.job_id !== job_id.payload)
            return {
                ...state,
                jobs: filterJobs
            }

        case "DELETE_SINGLE_STATUS":
            const copyAllJobs = [...state.jobs]
            const statusToDelete = action as DeleteSingleStatusAction
            const findJobStatus = copyAllJobs.find(job => job.job_id === statusToDelete.payload.job_selector.job_id) as Job
            const filterStatus = findJobStatus.statuses?.filter(status => status.id !== statusToDelete.payload.id)
            findJobStatus.statuses = filterStatus

            return {
                ...state,
                jobs: [...state.jobs]
            }
 
        case "EDIT_JOB":
            const editCopyJobs = [...state.jobs]
            const editAction = action as EditJobAction
            const indexEditJob = editCopyJobs.findIndex(job => job.job_id  === editAction.job_id) 
            let copySingleJob = editCopyJobs[indexEditJob] as Job //make a copy from job i want to edit
            copySingleJob = { ...copySingleJob, ...editAction.payload }
            editCopyJobs[indexEditJob] = copySingleJob
            
            return {
                ...state,
                jobs: editCopyJobs
            }

        case "EDIT_SINGLE_STATUS":
            const editStatusCopyJobs = [...state.jobs]
            const editStatusAction = action as EditSingleStatusAction
            const findEditJob = editStatusCopyJobs.find(job => job.job_id === editStatusAction.payload.job_selector.job_id) as Job
            const statuses2 = findEditJob.statuses as Status[]
            const indexEditStatus = statuses2.findIndex(status => status.id === editStatusAction.payload.id)
            let status = statuses2[indexEditStatus as number] as Status //make a copy from status i want to edit
            status = {...status, ...editStatusAction.newStatus}
            statuses2[indexEditStatus] = status

            return {
                ...state,
                jobs: editStatusCopyJobs
            }
            
        case "ADD_NEW_JOB":
            const newJob = (action as AddNewJobAction).payload
            
            return {
                ...state,
                jobs: [...state.jobs, newJob]
            }

        case "SEARCH_JOB":
        
            return {
                ...state,
                jobs: (action as SearchJobAction).payload
            };

        case "ADD_NEW_STATUS_JOB":
            const addStatusCopyJobs = [...state.jobs]
            const addStatusAction = action as AddNewStatusAction
            const findAddJob = addStatusCopyJobs.find(job => job.job_id === addStatusAction.payload.job_selector.job_id) as Job
            if(findAddJob.statuses){
                findAddJob.statuses = [...findAddJob.statuses, addStatusAction.payload]
                return {
                    ...state,
                    jobs: [...state.jobs]
                };
            } else {
                return {
                    ...state
                }
            }; 

        default:
            return state;
    }
};

export default jobsReducer;