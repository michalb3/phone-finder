"use strict";var precacheConfig=[["/index.html","f3c312376691f1b3501d605a551edbd4"],["/static/css/main.e6b7bdae.css","1fe7419cc8cdaf7087919727f9746833"],["/static/js/main.5d8d8f82.js","77cef21f412bd71802fdeeb40cd78b45"],["/static/media/battery-difference.73be5674.svg","73be56746bd8929dc19940e220e75e02"],["/static/media/battery-empty.14814a5f.svg","14814a5fd2ccdf1e68ffc75999d75c7d"],["/static/media/battery.9d4bf1bb.svg","9d4bf1bb1aeb14738fd2518de136374a"],["/static/media/cpu-difference.6abc3d36.svg","6abc3d36d072cbcf4ad1f2b082e0859a"],["/static/media/cpu-empty.d402d292.svg","d402d29253345a46e0ee1163315412f4"],["/static/media/cpu.c92cc5d8.svg","c92cc5d892872f67c5ce64e155851ac0"],["/static/media/diagonal-difference.3e31796e.svg","3e31796eeae62703609599602fbe54e4"],["/static/media/diagonal-empty.9558f459.svg","9558f459eb74b2d32db3371eae3ce81b"],["/static/media/diagonal.75b625f0.svg","75b625f09faf3d26a5440898bc994321"],["/static/media/memory-difference.153f16ce.svg","153f16ce99b31d73751d1eca0e6e2239"],["/static/media/memory-empty.2486fd35.svg","2486fd359abb925e0935c1bbe0cb233c"],["/static/media/memory.ffad03b8.svg","ffad03b84a95f00dff2168b3e3333f89"],["/static/media/os-difference.0184e2d6.svg","0184e2d6ea3943895f249916ffd50175"],["/static/media/os-empty.c68e30ae.svg","c68e30aeefd82f7ae4aec3f9e6706ec4"],["/static/media/os.7ffc490a.svg","7ffc490a023a462ab85722c85c11daaf"],["/static/media/ram-difference.f52f33ec.svg","f52f33eca1440af05f9129136f792d12"],["/static/media/ram-empty.255e9d04.svg","255e9d046d2682d3c6fdb099b7fa92c8"],["/static/media/ram.aa343c34.svg","aa343c344fcfd0f53846f706c9c07f54"],["/static/media/resolution-difference.ca0cbe08.svg","ca0cbe08fe519069a3ea771a3ed1b1c9"],["/static/media/resolution-empty.6a93e129.svg","6a93e129ad574c6b3d6767171c955daa"],["/static/media/resolution.4b2fc04e.svg","4b2fc04ebd38baade9528b3d877f458d"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var c="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});