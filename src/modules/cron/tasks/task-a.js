export const taskA = async () => {
  console.log(`[taskA] working...`);
  await new Promise(resolve => setTimeout(resolve, 2 * 60 * 1000));
  console.log(`[taskA] done`);
};