export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    
    // Health check endpoint
    if (url.pathname === '/api/health') {
      return Response.json({ status: 'ok', timestamp: Date.now() })
    }

    // Let Cloudflare Assets handle static files
    return new Response(null, { status: 404 })
  }
}

interface Env {
  ANALYTICS?: AnalyticsEngineDataset
}
