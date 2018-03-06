from http.server import BaseHTTPRequestHandler, HTTPServer
import time, sys, os, re
from jinja2 import Environment, PackageLoader


hostName = "localhost"
hostPort = 9000
env = Environment(loader=PackageLoader(os.path.basename(os.getcwd()), 'views'))


def myPathJoin(*paths):
    # i think it works only on win
    rpath = ''
    for path in paths:
        if path[0] == '/' or path[0] == '\\':
            path = path[1:]
        npath = os.path.normpath(path)
        rpath = os.path.join(rpath, npath)
    return rpath

def getExtension(s):
    result = re.search(r'\.([^\.]+)$', s)
    if result:
        return result.group(1)
    else: 
        return None

class MyRequestHandler(BaseHTTPRequestHandler):
    extensionsToContentTypes = {
        'jpg': {'ctype': 'image/jpg', 'openMode': 'rb'},
        'jpeg': {'ctype': 'image/jpg', 'openMode': 'rb'},
        'png': {'ctype': 'image/png', 'openMode': 'rb'},
        'svg': {'ctype': 'image/svg+xml', 'openMode': 'r'},
        'css': {'ctype': 'text/css', 'openMode': 'r'},
        'js': {'ctype': 'text/javascript', 'openMode': 'r'},
        'html': {'ctype': 'text/html', 'openMode': 'r'},
    }
    def do_GET(self):
        curPath = myPathJoin(os.getcwd(), self.path)
        try:
            ifile = open(curPath, 'r')
            ifile.close()
        except FileNotFoundError:
            self.send_response(404)
            self.end_headers()
            template = env.get_template('error.jj.html').render(path=self.path)
            self.wfile.write(template.encode('utf-8'))
            return

        self.send_response(200)
        ext = getExtension(os.path.basename(self.path))
        if self.extensionsToContentTypes.get(ext):
            finfo = self.extensionsToContentTypes.get(ext)
            self.send_header("Content-type", finfo['ctype'])
            self.end_headers()
            if finfo['openMode'] == 'rb':
                file = open(curPath, 'rb')
                self.wfile.write(file.read())
            else:
                file = open(curPath, 'r')
                self.wfile.write(file.read().encode('utf-8'))
        else:
            self.send_header("Content-type", "text/html")
            self.end_headers()
            file = open(curPath, 'r')
            self.wfile.write(file.read().encode('utf-8'))

myServer = HTTPServer((hostName, hostPort), MyRequestHandler)
print(time.asctime(), "Server starts - %s:%s" % (hostName, hostPort))
sys.stdout.flush()

try:
    myServer.serve_forever()
except KeyboardInterrupt:
    myServer.server_close()
    print(time.asctime(), "Server stopped - %s:%s" % (hostName, hostPort))
    sys.stdout.flush()