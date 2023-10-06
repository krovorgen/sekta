const CACHE_NAME = 'sekta-cache-v1';

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return await cache.match(request);
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
