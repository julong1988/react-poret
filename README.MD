## Install
```sh
npm install --save react-poret
```

### Root
```jsx
import React from 'react';
import { render } from 'react-dom';
import { Root } from 'react-poret';
import App from './App';

render(
  <Root>
    <App />
  </Root>,
  document.getElementById('app'),
);
```

### quark
```jsx
const countQuark = quark({
  key: 'count',
  value: 0
})
```

### usePoretValue, useSetPoretState
```jsx
import React from 'react';
import { usePoretValue, useSetPoretState } from 'react-poret';

const countQuark = quark({
  key: 'count',
  value: 0
})

function Com1() {
  const count = usePoretValue(countQuark);
  const setCount = useSetPoretState(countQuark);

  const handleChange = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Component</h1>
      <div>count: {count}</div>
      <button onClick={handleChange}>Click</button>
    </div>
  )
}
```

### usePoretState
```jsx
import React from 'react';
import { usePoretState } from 'react-poret';

const countQuark = quark({
  key: 'count',
  value: 0
})

function Com1() {
  const [count, setCount] = usePoretState(countQuark);

  const handleChange = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Component</h1>
      <div>count: {count}</div>
      <button onClick={handleChange}>Click</button>
    </div>
  )
}
```
