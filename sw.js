importScripts("sww.js");var version="1.0.0",worker=new self.ServiceWorkerWare;worker.use(new self.StaticCacher(["app.js","image-gallery.css","index.html","main.css","install-sw.js","sw.js","sww.js","gallerySW.js"])),worker.use(new self.SimpleOfflineCache);var extraFiles=["gallerySW.js"];extraFiles.length&&importScripts(...extraFiles),worker.init();