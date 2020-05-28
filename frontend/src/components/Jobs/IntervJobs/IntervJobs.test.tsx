import React from "react";
import { isJobOngoing } from "./IntervJobs";
import { Job } from "../../../store/action/JobAction";


it('check function isJobRejected returns the right value', () => {
    const fakeJob: Job = {
        job_id: 2,
        compay_name: "fakeCompany",
        job_description: "fakeJob",
        country: "ch",
        city: "zr",
        comments: "none",
        statuses: [
            {
                id: 4,
                job_selector: {
                    job_id: 2
                },
                application_status: "opne",
                date: "2020-05-17"
            },
            {
                id: 4,
                job_selector: {
                    job_id: 2
                },
                application_status: "interview",
                date: "2020-05-17"
            },
            {
                id: 3,
                job_selector: {
                    job_id: 2
                },
                application_status: "rejected",
                date: "2020-05-15"
            }
        ]
    }

    const result = isJobOngoing(fakeJob)
    expect(result).toBe(false)
});

it('check function isJobRejected returns the right value', () => {
    const fakeJob: Job = {
        job_id: 2,
        compay_name: "fakeCompany",
        job_description: "fakeJob",
        country: "ch",
        city: "zr",
        comments: "none",
        statuses: [
            {
                id: 4,
                job_selector: {
                    job_id: 2
                },
                application_status: "open",
                date: "2020-05-17"
            },
            {
                id: 3,
                job_selector: {
                    job_id: 2
                },
                application_status: "interview",
                date: "2020-05-15"
            }
        ]
    }

    const result = isJobOngoing(fakeJob)
    expect(result).toBe(true)
});

it('check function isJobRejected returns the right value', () => {
    const fakeJob: Job = {
        job_id: 2,
        compay_name: "fakeCompany",
        job_description: "fakeJob",
        country: "ch",
        city: "zr",
        comments: "none",
        statuses: [
            {
                id: 4,
                job_selector: {
                    job_id: 2
                },
                application_status: "open",
                date: "2020-05-17"
            },
            {
                id: 3,
                job_selector: {
                    job_id: 2
                },
                application_status: "rejected",
                date: "2020-05-15"
            }
        ]
    }

    const result = isJobOngoing(fakeJob)
    expect(result).toBe(false)
});

it('check function isJobRejected returns the right value', () => {
    const fakeJob: Job = {
        job_id: 2,
        compay_name: "fakeCompany",
        job_description: "fakeJob",
        country: "ch",
        city: "zr",
        comments: "none",
        statuses: [
            {
                id: 3,
                job_selector: {
                    job_id: 2
                },
                application_status: "open",
                date: "2020-05-15"
            }
        ]
    }

    const result = isJobOngoing(fakeJob)
    expect(result).toBe(false)
});