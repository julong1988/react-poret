import { useEffect, useState } from 'react';
import useStoreContext from '../store/useStoreContext';

let subId = 0;

const usePoretValue = (quark: Quark) => {
  const [, forceUpdate] = useState<[]>([]);
  const storeRef = useStoreContext();
  const store = storeRef.current;
  const { key, defaultValue } = quark;

  // once
  if (!store.values.hasOwnProperty(key)) {
    store.values[key] = defaultValue;
  }
  // update 
  useEffect(() => {
    store.updateComponents[key] = store.updateComponents[key] || {};
    subId++
    store.updateComponents[key][subId] = () => forceUpdate([])
  }, [quark, key, store, storeRef]);

  return store.values[key];
}

export default usePoretValue;