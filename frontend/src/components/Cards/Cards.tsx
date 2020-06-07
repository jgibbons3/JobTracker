import React from "react";
import { connect } from "react-redux";
import "./Cards.css";
import { Job } from "../../store/action/JobAction";
import { Status } from "../../store/action/StatusAction";
import moment from "moment";


interface cardJobs {
    jobs: Job[]
}


export function isJobInterview(job: Job): boolean {
    return !!job.statuses?.find(status => 
        status.application_status === "interview")
}

function futureInterview(job: Job): boolean {
    return !!job.statuses?.find(status => 
        status.application_status === "interview" && new Date(status.date) >= new Date())
}

function differenceDate(job: Job) {
    const copyStatus = job.statuses as Status[]
    const dateOpenJob = moment(copyStatus[copyStatus.length -1].date)
    const dateInterviewJob = moment(copyStatus[copyStatus.length -2].date)
    const diffDate = dateInterviewJob.diff(dateOpenJob, "days")
    return diffDate
}

const Cards: React.FC<cardJobs> = ({jobs}) => {
    const onGoingJobs = jobs?.filter(job => futureInterview(job))
    const interviewJobs: Job[] = jobs?.filter(job => isJobInterview(job))
    
   // average days to interview
    const arrayDays = interviewJobs?.map(item => differenceDate(item))
    const averageInterviewDays = arrayDays.reduce((a: number, b: number) =>  a + b, 0)

    return (
        <div className="cards_container">

            <div className="total_interviews_card">
                <div>
                    <p className="total_interviews_title">Total interviews</p>
                </div>
                <div className="total_interviews_info">
                    <p>{interviewJobs.length} - ({Math.round(interviewJobs.length*100/jobs.length)}%)</p>
                </div>
            </div>


            <div className="total_applications_card">
                <div>
                    <p className="total_applications_title">Total applications</p>
                </div>
                <div className="total_applications_info">
                    <p>{jobs.length}</p>
                </div>
            </div>

            <div className="average_days_interview_card">
                <div>
                    <p className="average_days_interview_title">Average of days to interview</p>
                </div>
                <div className="average_days_interview_info">
                    {averageInterviewDays? <p>{Math.round(averageInterviewDays/interviewJobs.length)}</p> : <></>}
                </div>
            </div>

            <div className="upcoming_interviews_card">
                <div>
                    <p className="upcoming_interview_title">Upcoming Interviews</p>
                </div>
                <div className="upcoming_interview_header">
                    <p>Company</p>
                    <p>Description</p>
                    <p>Date</p>
                </div>
                {onGoingJobs.length === 0 ? <p className="upcoming_interviews_message">No upcoming interviews</p> 
                : onGoingJobs.reverse().map((job) => {
                return <div className="upcoming_interview_info" key={job.job_id}> 
                            <p className="company_name_upcoming_interview">{job.compay_name}</p>
                            <p className="description_upcoming_interview">{job.job_description}</p>

                        {job.statuses?.map(item => {
                            if(item.application_status === "interview") {
                                return <div className="status_and_date" key={item.id}> 
                                            <p>{item.date}</p>
                                        </div>
                                }
                            })
                        } 
                    </div>
                })}
            </div>

        </div>
    )
}


const mapStateToProps = (state: any) => {
    return{
        jobs: state.jobsReducer.jobs
    };
};

export default connect(mapStateToProps)(Cards)