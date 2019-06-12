import React from 'react';


export function createRefPolyfill<T>()  {
  if (React.createRef != null) {
    return React.createRef<T>();
  }

  const ref: { (instance: T | null): void; current?: T | null } = (instance: T | null) => {
    ref.current = instance;
  };

  ref(null);
  return ref;
}
