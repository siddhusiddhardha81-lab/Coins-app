// sw.js - No monetag tags - Only new 12138304 in layout
self.addEventListener('install', e=>self.skipWaiting());
self.addEventListener('activate', e=>self.clients.claim());
