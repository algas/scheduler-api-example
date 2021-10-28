import {google} from 'googleapis';
const cloudscheduler = google.cloudscheduler('v1');

export const initAuth = async (keyFilePath: string) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  
  const authClient = await auth.getClient();
  google.options({auth: authClient});
  const projectId = await auth.getProjectId();
  return projectId
}

export const getJob = async (projectId: string, location: string, jobId: string) => {
  const res = await cloudscheduler.projects.locations.jobs.get({
    name: `projects/${projectId}/locations/${location}/jobs/${jobId}`,
  });
  return res?.data;
}

export const listjobs = async (projectId: string, location: string) => {
  const res = await cloudscheduler.projects.locations.jobs.list({
    parent: `projects/${projectId}/locations/${location}`,
  });
  return res?.data?.jobs;
}

export interface JobHttpTarget {
  uri: string;
  httpMethod: string;
  headers: {[k: string]: string};
  body?: string;
}

export interface CreateJobParamenter {
  attemptDeadline?: string;
  httpTarget: JobHttpTarget;
  name: string;
  schedule: string;
  timeZone?: string;
}

export const createJob = async (projectId: string, location: string, params: CreateJobParamenter) => {
  const res = await cloudscheduler.projects.locations.jobs.create({
    parent: `projects/${projectId}/locations/${location}`,
    requestBody: params,
  });
  return res?.data;
}

export const deleteJob = async (projectId: string, location: string, jobId: string) => {
  const res = await cloudscheduler.projects.locations.jobs.delete({
    name: `projects/${projectId}/locations/${location}/jobs/${jobId}`,
  });
  return res?.data;
}

