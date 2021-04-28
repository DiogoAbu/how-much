import { findNodeHandle, ScrollView, TextInput } from 'react-native';

/**
 * Use SrollView method to scroll component into view
 */
export default function scrollIntoView(
  ref: TextInput,
  scrollRef: React.RefObject<ScrollView>,
  animated = true,
  offsetY = 0,
): void {
  if (scrollRef && scrollRef.current) {
    requestAnimationFrame(() => {
      ref.measureLayout?.(
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
  ref: React.RefObject<TextInput>,
  scrollRef: React.RefObject<ScrollView>,
  animated?: boolean,
  offsetY?: number,
): () => void {
  return () => {
    if (ref?.current) {
      scrollIntoView(ref.current, scrollRef, animated, offsetY);
      ref.current?.focus?.();
    }
  };
}

export function focusNextPrice(
  ref: React.RefObject<(TextInput | null)[]>,
  index: number | null | undefined,
  scrollRef: React.RefObject<ScrollView>,
  animated?: boolean,
  offsetY?: number,
): () => void {
  return () => {
    if (index && ref.current && ref.current[index]) {
      scrollIntoView(ref.current[index]!, scrollRef, animated, offsetY);
      ref.current?.[index]?.focus?.();
    }
  };
}
