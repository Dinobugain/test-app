import cluster from 'cluster';
const numWorkers = 5;

if (cluster.isPrimary) {
  console.log(`[master] Run ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    console.log(`[master] Worker ${worker.process.pid} has been terminated. Code: ${code}`);
    console.log(`[master] restart worker...`);
    cluster.fork();
  });

} else {
  const workerId = cluster.worker.id;
  const instanceId = `worker-${workerId}`;

  console.log(`[worker ${instanceId}] is starting...`);
  process.env.INSTANCE_ID = instanceId;

  import('./app.js');
}
