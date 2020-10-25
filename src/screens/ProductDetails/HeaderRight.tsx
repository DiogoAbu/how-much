import React, { FC, useState } from 'react';
import { Alert, InteractionManager } from 'react-native';

import { Appbar, Menu } from 'react-native-paper';

import usePress from '!/hooks/use-press';
import useTheme from '!/hooks/use-theme';
import useTranslation from '!/hooks/use-translation';
import { useStores } from '!/stores';
import { MainNavigationProp, MainRouteProp } from '!/types';

interface Props {
  navigation: MainNavigationProp<'ProductDetails'>;
  route: MainRouteProp<'ProductDetails'>;
}

const HeaderRight: FC<Props> = ({ navigation, route }) => {
  const { colors, dark } = useTheme();
  const { productsStore } = useStores();
  const { t } = useTranslation();

  const { params } = route;

  // State for menu visiblity
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Handlers
  const handleHideMenu = usePress(() => {
    setIsMenuVisible(() => false);
  });

  const handleShowMenu = usePress(() => {
    setIsMenuVisible(() => true);
  });

  const handleEdit = usePress(() => {
    setIsMenuVisible(() => false);

    productsStore.copyProductForm(params.productId);
    requestAnimationFrame(() => {
      navigation.navigate('ProductForm', { isEditing: true });
    });
  });

  const handleDuplicate = usePress(() => {
    setIsMenuVisible(() => false);

    productsStore.copyProductForm(params.productId, false);
    requestAnimationFrame(() => {
      navigation.navigate('ProductForm');
    });
  });

  const handleDelete = usePress(() => {
    setIsMenuVisible(() => false);

    Alert.alert(
      t('areYouSure'),
      t('doYouWantToDeleteThisProduct'),
      [
        {
          text: t('label.no'),
        },
        {
          text: t('label.yes'),
          style: 'destructive',
          onPress: () => {
            requestAnimationFrame(() => {
              navigation.pop();
              void InteractionManager.runAfterInteractions(() => {
                productsStore.deleteProductById(params.productId);
              });
            });
          },
        },
      ],
      { cancelable: true },
    );
  });

  const dotsIcon = (
    <Appbar.Action
      color={dark ? colors.text : colors.textOnPrimary}
      disabled={isMenuVisible}
      icon='dots-vertical'
      onPress={handleShowMenu}
    />
  );

  return (
    <Menu anchor={dotsIcon} onDismiss={handleHideMenu} visible={isMenuVisible}>
      <Menu.Item icon='pencil' onPress={handleEdit} title={t('label.edit')} />
      <Menu.Item icon='content-copy' onPress={handleDuplicate} title={t('label.duplicate')} />
      <Menu.Item icon='delete' onPress={handleDelete} title={t('label.delete')} />
    </Menu>
  );
};

export default HeaderRight;
