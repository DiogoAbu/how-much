import { DependencyList } from 'react';

import { autorun, IAutorunOptions, IReactionPublic } from 'mobx';

import useFocusEffect from './use-focus-effect';

export default function useAutorunOnFocus(
  view: (r: IReactionPublic) => any,
  deps: DependencyList,
  opts?: IAutorunOptions,
): void {
  useFocusEffect(() => {
    return autorun(view, opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
