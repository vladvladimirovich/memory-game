function loadFromIndexedDB(storeName){
  return new Promise(
    function(resolve, reject) {
      var dbRequest = indexedDB.open(storeName);

      dbRequest.onerror = function(event) {
        reject(Error("Error text"));
      };

      dbRequest.onupgradeneeded = function(event) {
        // Objectstore does not exist. Nothing to load
        event.target.transaction.abort();
        reject(Error('Not found'));
      };

      dbRequest.onsuccess = function(event) {
        var database      = event.target.result;
        var transaction   = database.transaction([storeName]);
        var objectStore   = transaction.objectStore(storeName);
        var objectRequest = objectStore.getAll();

        objectRequest.onerror = function(event) {
          reject(Error('Error text'));
        };

        objectRequest.onsuccess = function(event) {
          if (objectRequest.result) resolve(objectRequest.result);
          else reject(Error('objects not found'));
        };
      };
    }
  );
}

function saveToIndexedDB(storeName, object){
  return new Promise(
    function(resolve, reject) {
      var dbRequest = indexedDB.open(storeName);

      dbRequest.onerror = function(event) {
        reject(Error("IndexedDB database error"));
      };

      dbRequest.onupgradeneeded = function(event) {
        var database    = event.target.result;
        var objectStore = database.createObjectStore(storeName, {keyPath: "id", autoIncrement: true});
      };

      dbRequest.onsuccess = function(event) {
        var database      = event.target.result;
        var transaction   = database.transaction([storeName], 'readwrite');
        var objectStore   = transaction.objectStore(storeName);
        var objectRequest = objectStore.put(object); // Overwrite if exists

        objectRequest.onerror = function(event) {
          reject(Error('Error text'));
        };

        objectRequest.onsuccess = function(event) {
          resolve('Data saved OK');
        };
      };
    }
  );
}

export {loadFromIndexedDB, saveToIndexedDB};