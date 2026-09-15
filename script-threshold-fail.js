import http from 'k6/http';
import { check, sleep } from 'k6';

// Санаатайгаар baseline-аас хамаагүй хатуу SLO тавьж, k6 thresholds
// зөрчлийг зөв илрүүлдгийг харуулах зорилготой (жинхэнэ baseline
// p95=36.71ms байхад энд p(95)<10 гэж хатуу тогтоов).
export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<10'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}

// Ажиллуулах:
//   k6 run script-threshold-fail.js | tee results/run-threshold-fail.txt
// Санамж: k6 threshold зөрчигдвөл exit code != 0 буцаана.