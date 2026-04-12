import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'v7l39ws0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

export default client;
