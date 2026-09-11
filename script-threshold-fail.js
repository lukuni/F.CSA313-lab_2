import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 30, 
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<1'],    // Санаатайгаар хэт хатуу болгосон босго 
    http_req_failed:   ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('http://localhost:8000/');
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}