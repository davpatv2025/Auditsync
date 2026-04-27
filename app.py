"""ContaAI helper entrypoint.

This file exists because some deployment/automation environments expect an `app.py`
module at repository root. ContaAI's production runtime is Next.js on Vercel,
so this Python app is optional and only provides a tiny health endpoint for
integration checks.
"""

from http.server import BaseHTTPRequestHandler, HTTPServer
import json


class Handler(BaseHTTPRequestHandler):
    def _send_json(self, payload: dict, status: int = 200) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):  # noqa: N802
        if self.path in ("/", "/health"):
            self._send_json(
                {
                    "service": "ContaAI",
                    "status": "ok",
                    "runtime": "python-helper",
                    "note": "Main app runs in Next.js/Vercel."
                }
            )
            return

        self._send_json({"error": "not_found", "path": self.path}, status=404)


def main() -> None:
    server = HTTPServer(("0.0.0.0", 8000), Handler)
    print("ContaAI helper app.py running on http://0.0.0.0:8000")
    server.serve_forever()


if __name__ == "__main__":
    main()
