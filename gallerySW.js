//global worker

// Dummy
worker.get('/api/v1/allphotos', (req, res) => {
  return getAllPhotos().
    then(photos => {
      return new Response(JSON.stringify(photos), { headers: {'Content-Type': 'application/json'} });
    });
});

worker.post('/api/v1/upload', (req, res) => {
  // Fake request to wake up the SW and listen for the Broadcast message
  var bc = new BroadcastChannel("upload");
  bc.addEventListener('message', (msg) => {
    console.log('-------> ', msg);
    var file = msg.data;
    return caches.open('images').
      then((cache) => {
        var name = '/api/v1/fs/' + file.name;
        var request = new Request(name, {
          headers: {
            'Content-Type': file.type
          }
        });
        var response = new Response(file);
        return cache.put(request, response).
          then(() => {
            return getAllPhotos();
          }).
          then((photos) => {
            photos.push({
              original: name,
              thumbnail: name
            });

            return saveAllPhotos(photos);
          })
      });
  });
  return Promise.resolve(new Response('{}', { headers: {'Content-Type': 'application/json'} }));
});

worker.get('/api/v1/fs/:name', (req, res) => {
  var name = req.parameters.name;
  var file = '/api/v1/fs/' + name;
  return caches.open('images').
    then((cache) => {
      return cache.match(req);
    });
});

function getAllPhotos() {
  return caches.open('control').
    then(cache => {
      return cache.match(new Request('allphotos'));
    }).
    then(result => {
      if (result != null) {
        return result.json();
      }

      return [];
    });
}

function saveAllPhotos(photos) {
  return caches.open('control').
    then(cache => {
      var request = new Request('allphotos');
      var response = new Response(JSON.stringify(photos), { headers: {'Content-Type': 'application/json'} });

      return cache.put(request, response);
    });
}

