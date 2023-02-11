import base from './base';

export const CreateJob = (payload) => base.post('/services/data/v56.0/jobs/ingest',payload);