// LEVR Worker v0.2.0
// Static site worker with analytics hooks

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;
    
    // Default to index.html for root or paths without extensions
    if (path === '/' || (!path.includes('.') && !path.endsWith('/'))) {
      path = path.endsWith('/') ? path + 'index.html' : path + '/index.html';
    }
    
    try {
      // Try to fetch the asset
      const asset = await env.ASSETS.fetch(new URL(path, url.origin));
      
      if (asset.status === 404) {
        // Try without trailing index.html
        const fallback = await env.ASSETS.fetch(new URL('/index.html', url.origin));
        if (fallback.status === 200) {
          return new Response(fallback.body, {
            headers: {
              'content-type': 'text/html;charset=UTF-8',
              'cache-control': 'public, max-age=0, must-revalidate'
            }
          });
        }
      }
      
      return asset;
    } catch (e) {
      return new Response('Not Found', { status: 404 });
    }
  }
};
