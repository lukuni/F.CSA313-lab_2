from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import time

class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # чимээгүй, консол бөглөрөхгүй байхын тулд

    def do_GET(self):
        if self.path == "/slow":
            time.sleep(0.1)  # 100ms хиймэл удаашрал
        self.send_response(200)
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(b"OK")

if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", 8000), Handler)
    print("Server listening on http://localhost:8000")
    server.serve_forever()