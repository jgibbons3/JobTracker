import React from "react";
import { connect } from "react-redux";
import "./Cards.css";
import { Job } from "../../store/action/JobAction";


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


const Cards: React.FC<cardJobs> = ({jobs}) => {

    const onGoingJobs = jobs?.filter(job => futureInterview(job))
    const interviewJobs = jobs?.filter(job => isJobInterview(job))

    return (
        <div className="cards_container">

            <div className="total_interviews_card">
                <div>
                    <p className="total_interviews_title">Total interviews</p>
                </div>
                <div className="total_interviews_info">
                    <p>{interviewJobs.length}</p>
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
                : onGoingJobs?.map((job, i: number) => {
                return <div className="upcoming_interview_info" key={i}> 
                            <p className="company_name_upcoming_interview">{job.compay_name}</p>
                            <p className="description_upcoming_interview">{job.job_description}</p>

                        {job.statuses?.map(item => {
                            if(item.application_status === "interview") {
                                return <div className="status_and_date" key={i}> 
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