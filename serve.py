import http.server
import socketserver
import os
import sys

class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True
    allow_reuse_address = True

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        '': 'application/octet-stream',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.json': 'application/json',
        '.md': 'text/markdown',
    }

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run():
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)

    for port in [8080, 8081, 8082, 3000, 5000]:
        try:
            with ThreadingTCPServer(("", port), Handler) as httpd:
                print(f"FORMANUPP Server running at http://localhost:{port}/")
                sys.stdout.flush()
                httpd.serve_forever()
                break
        except OSError:
            continue

if __name__ == '__main__':
    run()
