import React, { createContext, PropsWithChildren, useContext } from 'react';
import { configure } from 'mobx';
import { CurrencyStore } from './currencyStore';

configure({ enforceActions: 'never' });

type RootStateContextValue = {
  currencyStore: CurrencyStore;
};

const RootStateContext = createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

const currencyStore = new CurrencyStore();

export const RootStateProvider = ({ children }: PropsWithChildren) => {
  return (
    <RootStateContext.Provider value={{ currencyStore }}>
      {children}
    </RootStateContext.Provider>
  );
};

export const useStore = () => useContext(RootStateContext);
