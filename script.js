import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  const res = http.get('http://localhost:8000/');
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}