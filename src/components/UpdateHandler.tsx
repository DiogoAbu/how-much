import { FC, useEffect } from 'react';

import * as Updates from 'expo-updates';

import { useStores } from '!/stores';

const UpdateHandler: FC = () => {
  const { generalStore } = useStores();

  useEffect(() => {
    void (async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          generalStore.setUpdateAvailable(true);
        }
      } catch (err) {
        console.log('UpdateHandler', err);
        generalStore.setUpdateAvailable(false);
      }
    })();
  }, [generalStore]);

  return null;
};

export default UpdateHandler;
