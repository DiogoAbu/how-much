import { DependencyList, useEffect } from 'react';

import { autorun, IAutorunOptions, IReactionPublic } from 'mobx';

export default function useAutorun(
  view: (r: IReactionPublic) => any,
  deps: DependencyList,
  opts?: IAutorunOptions,
): void {
  useEffect(() => {
    return autorun(view, opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
