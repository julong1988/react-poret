import useStoreContext from '../store/useStoreContext';
import updateValues from '../utils/updateValues';

const useSetPoretState = (quark: Quark) => {
  const store = useStoreContext().current;
  const { key, value } = quark;

  // once
  if (!store.values.hasOwnProperty(key)) {
    store.values[key] = value;
  }

  return (newValue: any) => {
    updateValues(store, quark, newValue);
  }
}

export default useSetPoretState;