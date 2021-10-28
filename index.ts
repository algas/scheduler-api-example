import {initAuth, getJob, listjobs, createJob, CreateJobParamenter, deleteJob} from './scheduler';

const main = async (keyFilePath: string) => {
  const location = 'us-central1';
  const jobId = 'api-job-example1';
  const projectId = await initAuth(keyFilePath);
  const params: CreateJobParamenter = {
    name: `projects/${projectId}/locations/${location}/jobs/${jobId}`,
    schedule: '0 19 * * *',
    timeZone: 'Asia/Tokyo',
    httpTarget: {
      uri: 'https://example.com',
      httpMethod: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Google-Cloud-Scheduler',
      },
    }
  };
  const created = await createJob(projectId, location, params);
  console.log(created);
  const jobs = await listjobs(projectId, location);
  console.log(jobs);
  if(jobs){
    console.log(jobs.map(w => w.name));
  }
  const wf = await getJob(projectId, location, jobId);
  console.log(wf);
  const deleted = await deleteJob(projectId, location, jobId);
  console.log(deleted);
}

if (require.main === module) {
  main(process.argv[2]).catch(e => {
    console.error(e);
  });
}
