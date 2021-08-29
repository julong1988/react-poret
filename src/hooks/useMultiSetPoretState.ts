import useStoreContext from '../store/useStoreContext';
import updateValues from '../utils/updateValues';

const useMultiSetPoretState = () => {
  const store = useStoreContext().current;
  return (quarks: QuarkMulti[]) => {
    quarks.forEach(({ quark, value }) => {
      updateValues(store, quark, value);
    });
  }
}

export default useMultiSetPoretState;