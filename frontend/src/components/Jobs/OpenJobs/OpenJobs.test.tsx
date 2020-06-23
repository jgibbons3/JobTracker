import React from "react";
import { Job } from "../../../store/action/JobAction";
import { isJobRejected } from "../Jobs";


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
                application_status: "rejected",
                date: "2020-05-17"
            },
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

    const result = isJobRejected(fakeJob)
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
                application_status: "interview",
                date: "2020-05-17"
            },
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

    const result = isJobRejected(fakeJob)
    expect(result).toBe(false)
});