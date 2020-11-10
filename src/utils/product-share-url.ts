import * as Linking from 'expo-linking';
import { decode, encode } from 'js-base64';

import { CountryWageModel } from '!/stores/models/CountryWageModel';
import { PriceModel } from '!/stores/models/PriceModel';
import { ProductModel } from '!/stores/models/ProductModel';
import { Unarray } from '!/types';

export interface ProductShareData
  extends Pick<ProductModel, 'id' | 'description' | 'updatedAt' | 'createdAt'> {
  prices: Pick<PriceModel, 'id' | 'currencyId' | 'value'>[];
  wages: Pick<CountryWageModel, 'currencyId' | 'value'>[];
}

type DataMinified = {
  i: ProductShareData['id'];
  d: ProductShareData['description'];
  p: {
    i: Unarray<ProductShareData['prices']>['id'];
    c: Unarray<ProductShareData['prices']>['currencyId'];
    v: Unarray<ProductShareData['prices']>['value'];
  }[];
  u: ProductShareData['updatedAt'];
  c: ProductShareData['createdAt'];
  w?: {
    c: Unarray<ProductShareData['wages']>['currencyId'];
    v: Unarray<ProductShareData['wages']>['value'];
  }[];
};

export function buildProductShareUrl(data: ProductShareData): string {
  const minified: DataMinified = {
    i: data.id,
    d: data.description,
    p: data.prices.map((e) => ({
      i: e.id,
      c: e.currencyId,
      v: e.value,
    })),
    u: data.updatedAt,
    c: data.createdAt,
  };

  if (data.wages?.length) {
    minified.w = data.wages.map((e) => ({
      c: e.currencyId,
      v: e.value,
    }));
  }

  const encodedString = encode(JSON.stringify(minified), true);
  const url = Linking.makeUrl('product/share', { data: encodedString });

  return url;
}

export function parseProductShareUrl(url: string): ProductShareData | null {
  const { path, queryParams } = Linking.parse(url);

  if (path !== 'product/share' || !queryParams?.data) {
    return null;
  }

  try {
    const minified = JSON.parse(decode(queryParams!.data!)) as DataMinified;
    return {
      id: minified.i,
      description: minified.d,
      prices: minified.p.map((e) => ({
        id: e.i,
        currencyId: e.c,
        value: e.v,
      })),
      updatedAt: minified.u,
      createdAt: minified.c,
      wages:
        minified.w?.map((e) => ({
          currencyId: e.c,
          value: e.v,
        })) ?? [],
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
