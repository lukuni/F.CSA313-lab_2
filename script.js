import http from 'k6/http';
import { check, sleep } from 'k6';

// VU болон duration-г CLI-аас өгнө:
//   k6 run --vus 5   --duration 30s script.js | tee results/run-05vu.txt
//   k6 run --vus 30  --duration 30s script.js | tee results/run-30vu.txt
//   k6 run --vus 100 --duration 30s script.js | tee results/run-100vu.txt
export const options = {};

export default function () {
  const res = http.get('https://test.k6.io/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}