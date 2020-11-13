import { findNodeHandle, ScrollView } from 'react-native';

/**
 * Use SrollView method to scroll component into view
 */
export default function scrollIntoView(
  ref: React.RefObject<any> | any,
  scrollRef: React.RefObject<ScrollView>,
  animated = true,
  offsetY = 0,
): void {
  if (scrollRef && scrollRef.current) {
    requestAnimationFrame(() => {
      const measureLayout = ref.current?.measureLayout ?? ref.measureLayout;
      measureLayout?.(
        findNodeHandle(scrollRef.current)!,
        (_: number, y: number) => {
          scrollRef.current!.scrollTo({
            x: 0,
            y: y + offsetY,
            animated,
          });
        },
        () => null,
      );
    });
  }
}

/**
 * Returns a function that will scroll the component into view, if valid.
 * @param ref Reference to a component
 * @param scrollRef Reference to the scroll view
 * @param animated Whether the scroll action should be animated
 */
export function focusNext(
  ref: React.RefObject<any>,
  scrollRef: React.RefObject<ScrollView>,
  animated?: boolean,
  offsetY?: number,
): () => void {
  return () => {
    if (ref?.current) {
      scrollIntoView(ref, scrollRef, animated, offsetY);
      ref.current?.focus?.();
    }
  };
}

export function focusNextPrice(
  ref: React.RefObject<any[]>,
  index: number | null | undefined,
  scrollRef: React.RefObject<ScrollView>,
  animated?: boolean,
  offsetY?: number,
): () => void {
  return () => {
    if (index && ref?.current?.[index]) {
      scrollIntoView(ref?.current?.[index], scrollRef, animated, offsetY);
      ref.current?.[index]?.focus?.();
    }
  };
}
