import { DBNAME } from "./constants";

let db: IDBDatabase;
const version = 1;

export enum Stores {
  Config = "config",
  Tasks = "tasks",
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    const request = indexedDB.open(DBNAME);

    request.onupgradeneeded = () => {
      db = request.result;

      // if the data object store doesn't exist, create it
      Object.values(Stores).forEach((store) => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store);
        }
      });
    };

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const saveDBData = <Type,>(
  storeName: string,
  key: string,
  data: Type,
): Promise<Type | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(DBNAME, version);

    request.onsuccess = () => {
      db = request.result;
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      store.put(data, key);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const deleteDBData = <Type,>(
  storeName: string,
  key: string,
): Promise<Type | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(DBNAME, version);

    request.onsuccess = () => {
      db = request.result;
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      store.delete(key);
      resolve(key);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const getDBData = <Type,>(
  storeName: Stores,
  key: string | null = null,
): Promise<Type> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(DBNAME);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      let res: IDBRequest;
      if (key === null) {
        res = store.getAll();
      } else {
        res = store.get(key);
      }
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};
