const CACHE_NAME = 'sekta-cache-v1';

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);

    if (cached) {
      return cached
    } else {
      return new Response("Network error, go to main page", {
        status: 408,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }
}

this.addEventListener('fetch', event => {
  const { request } = event;
  event.respondWith(networkFirst(request));
});

this.addEventListener("activate", function(event) { 
  event.waitUntil( 
      caches.keys().then(cacheNames => { 
          return Promise.all( 
              cacheNames 
              .filter(name => name !== CACHE_NAME) 
      .map(name => caches.delete(name))  
    ) 
  })
); 
});
