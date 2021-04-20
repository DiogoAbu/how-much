import useMethod from './use-method';

type Callback<Args extends unknown[], Result> = (...args: Args) => Result;

export default function usePress<Args extends unknown[], Result = unknown>(
  callback: Callback<Args, Result>,
): (...args: Args) => Result {
  return useMethod(callback);
}
