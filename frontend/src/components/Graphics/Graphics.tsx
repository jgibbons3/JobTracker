import React from "react";
import "./Graphics.css";
import { Bar, Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { Job } from "../../store/action/JobAction";


interface graphicsJobs {
    jobs: Job[]
}


const Graphics: React.FC<graphicsJobs> = ({jobs}) => {
     
    // jobs per city   
    function jobsPerCity(jobs:Job[]) {
        const jobsPerCity: {[key: string]: number}  = {}
        jobs?.map(job => {
            if(job.city in jobsPerCity) {
                jobsPerCity[job.city] += 1
            } else {
                jobsPerCity[job.city] = 1
            }
        })
        return jobsPerCity
    }

    const barJobsPerCity = {
        labels: Object.keys(jobsPerCity(jobs)),
        datasets: [{
            label: "city",
            data: Object.values(jobsPerCity(jobs)),
            backgroundColor: "orange",  
        }]
    }

    // applications per date
    function applicationsPerDateArray(job: Job, perDateArray: {[key: string]: number}) {
        job.statuses?.map(status => {
            if(status.application_status === "open") {
                if(status.date in perDateArray){
                    perDateArray[status.date] += 1 
                } else {
                    perDateArray[status.date] = 1 
                }    
            }    
        })
        return perDateArray
    }
    
    function applicationsPerDate(jobs?: Job[]) {
        const perDateArray: {[key: string]: number}  = {}
        jobs?.map(job => {
            applicationsPerDateArray(job, perDateArray)
        }); 
        return perDateArray
    }

    const lineApplicationsPerDate = {
        labels: Object.keys(applicationsPerDate(jobs)),
        datasets: [{
            label: "dates",
            data: Object.values(applicationsPerDate(jobs)),
            borderColor: "salmon", 
            fill: false  
        }]
    }
    
    //total interviews per city
    function interviewsPerCity(job: Job, interviewCityArray: {[key: string]: number}) {
        job.statuses?.map(status => {
            if(status.application_status === "interview") {
                if(job.city in interviewCityArray){
                    interviewCityArray[job.city] += 1 
                } else {
                    interviewCityArray[job.city] = 1 
                }    
            }    
        })
        return interviewCityArray
    }

    function intervPerCity(jobs?: Job[]) {
        const interCityArray: {[key: string]: number}  = {}
        jobs?.map(job => {
            interviewsPerCity(job, interCityArray)
        }); 
        return interCityArray
    }

    const barInterviewsPerCity = {
        labels: Object.keys(intervPerCity(jobs)),
        datasets: [{
            label: "cities",
            data: Object.values(intervPerCity(jobs)),
            backgroundColor: "#6398DE",   
        }]
    }

    return (
        <div className="graphics_page">
            {jobs.length === 0 ? <p className="graphics_page_message">Add your job applications to see the graphics</p> : 
            
            <div className="graphics_row_one">
                <div className="graphics_container">
                    <Bar
                        data={barJobsPerCity}
                        options={{
                            title: {
                                display: true,
                                text: "Total applications per city"
                            },
                            legend: {
                                display: false
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: 1
                                    }
                                }]
                            }}}
                    />
                    
                </div>
                
                <div className="graphics_container">
                    <Bar
                        data={barInterviewsPerCity}
                        options={{
                            title: {
                                display: true,
                                text: "Interviews per city"
                            },
                            legend: {
                                display: false
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: 1
                                    }
                                }]
                        }}}
                    />
                </div>
            </div>
            }
            {jobs.length === 0 ? <div></div> :
            <div className="graphics_row_two">
                <div className="graphics_container">
                    <Line
                        data={lineApplicationsPerDate}
                        options={{
                            title: {
                                display: true,
                                text: "Total applications per day"
                            },
                            legend: {
                                display: false
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: 1
                                    }
                                }]
                        }}}
                    />
                </div>
            </div>
            }
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return{
        jobs: state.jobsReducer.jobs
    };
};

export default connect(mapStateToProps)(Graphics);