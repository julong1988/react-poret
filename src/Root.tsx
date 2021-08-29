import React, { useRef } from 'react';
import Context from './store/Context';

const Root: React.FC = ({ children }) => {
  const rootState = useRef<RootState>({
    values: {},
    updateComponents: {},
  });
  return (
    <Context.Provider value={rootState}>
      {children}
    </Context.Provider>
  )
}

export default Root;
