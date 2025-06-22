export const taskB = async () => {
  console.log(`[taskB] working...`);
  await new Promise(resolve => setTimeout(resolve, 2 * 60 * 1000));
  console.log(`[taskB] done`);
};