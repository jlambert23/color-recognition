importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js'
);

workbox.routing.registerRoute(
  ({ request }) => ['image', 'font'].includes(request.destination),
  new workbox.strategies.CacheFirst()
);
