import axios from 'axios';
import pLimit from 'p-limit';

const USER_ID = 1;
const AMOUNT = -2;
const CONCURRENCY = 1000;
const TOTAL_REQUESTS = 10000;
const limit = pLimit(CONCURRENCY);

let success = 0;
let failed = 0;

const runSingleRequest = async () => {
  try {
    const res = await axios.post('http://localhost:3000/users/wallet/update-balance', {
      userId: USER_ID,
      amount: AMOUNT
    });

    if (res.status === 200) {
      success++;
    } else {
      failed++;
    }
  } catch (e) {
    failed++;
  }
};

const main = async () => {
  console.time('⏱  Выполнение заняло');

  const tasks = Array.from({ length: TOTAL_REQUESTS }).map(() =>
    limit(() => runSingleRequest())
  );

  await Promise.all(tasks);

  console.timeEnd('⏱  Выполнение заняло');
  console.log(`✅ Успешно: ${success}`);
  console.log(`❌ Ошибок (недостаточно средств): ${failed}`);
};

main();
