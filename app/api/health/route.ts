export function GET() { return Response.json({ ok: true, service: "putter-archive", timestamp: new Date().toISOString() }); }
