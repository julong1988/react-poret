## Referrence
## Store
```jsx
// context.ts
import React from 'react'
export default React.createContext({} as any);
// useStoreContext.ts
import { useContext } from 'react'
import Context from './Context'
export default () => useContext(Context); 
```

설명 생략...



## Root

```tsx
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
```

```js
// rootState 설명.
{
  values: {
    '$key': '$value'
  },
  updateComponents: {
    '$key': {
      '${subId: number}': 'callbackFn_forceUpdate_hook'
    }
  }
}
```

values는 공통으로 바라보는 값임.

updateComponents는 해당 key를 가지고 있는 컴포넌트에 ForceUpdate hook추가.



## Quark

```jsx
const quark = (quark: Quark): Quark => {
  // quark enhancer
  return quark;
}

export default quark;
```



## usePoretValue

```js
import { useEffect, useState } from 'react';
import useStoreContext from '../store/useStoreContext';

let subId = 0;

const usePoretValue = (quark: Quark) => {
  const [, forceUpdate] = useState<[]>([]);
  const storeRef = useStoreContext();
  const store = storeRef.current;
  const { key, value } = quark;

  // once 스토어에 해당 키값이 존재하면 기존값을 유지한다.
  if (!store.values.hasOwnProperty(key)) {
    store.values[key] = value;
  }
  // update 새로운 quark, key, store일때 새로운 객체 생성 및 usePoretValue를 강제 리프레시. 컴포넌트 unmount시 관련 링크 삭제.
  useEffect(() => {
    store.updateComponents[key] = store.updateComponents[key] || {};
    subId++
    store.updateComponents[key][subId] = () => forceUpdate([])
    return () => {
      delete store.updateComponents[key][subId];
    }
  }, [quark, key, store, storeRef]);
	// return value
  return store.values[key];
}

export default usePoretValue;
```



## useSetPoretState

```js
import useStoreContext from '../store/useStoreContext';
import updateValues from '../utils/updateValues';

const useSetPoretState = (quark: Quark) => {
  const store = useStoreContext().current;
  const { key, value } = quark;

  // once 스토어에 해당 키값이 존재하면 기존값을 유지한다.
  if (!store.values.hasOwnProperty(key)) {
    store.values[key] = value;
  }
	
  // 업데이트 관련된 정보 전달.
  return (newValue: any) => {
    updateValues(store, quark, newValue);
  }
}

export default useSetPoretState;
```



## updateValues - utils

```js
interface IUpdateValues {
  (store: RootState, quark: Quark, value: any): void
}
const updateValues: IUpdateValues = (store, { key }, value) => {
  store.values[key] = value;
  store.updateComponents[key] = store.updateComponents[key] || {};
  Object.values(store.updateComponents[key]).forEach((cb: any) => cb());
};

export default updateValues;
```

