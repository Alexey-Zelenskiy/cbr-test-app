import { useEffect, useState } from 'react';

import NetInfo from '@react-native-community/netinfo';

export const useNetInfo = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  useEffect(
    () =>
      NetInfo.addEventListener((state) => setIsConnected(state.isConnected)),
    []
  );
  return [isConnected];
};
