import http.server
import socketserver
import os

os.chdir('d:\\oversea_compliance_platform\\dist')

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

Handler = MyHandler
Handler.extensions_map.update({
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html; charset=utf-8',
})

with socketserver.TCPServer(('127.0.0.1', 4173), Handler) as httpd:
    httpd.timeout = 30
    print('Serving...', flush=True)
    httpd.serve_forever()
