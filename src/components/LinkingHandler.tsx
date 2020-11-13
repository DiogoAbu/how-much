import { FC, useEffect } from 'react';

import * as Linking from 'expo-linking';

import useMethod from '!/hooks/use-method';
import { rootNavigate } from '!/utils/navigation-ref';
import { parseProductShareUrl } from '!/utils/product-share-url';

const LinkingHandler: FC = () => {
  const handleLinking = useMethod(({ url }: Linking.EventType) => {
    const productData = parseProductShareUrl(url);
    if (productData) {
      requestAnimationFrame(() => {
        rootNavigate('ProductShareImport', { productData });
      });
    }
  });

  useEffect(() => {
    Linking.addEventListener('url', handleLinking);

    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          handleLinking({ url });
        }
      })
      .catch((err) => console.log(err));

    return () => {
      Linking.removeEventListener('url', handleLinking);
    };
  }, [handleLinking]);

  return null;
};

export default LinkingHandler;
