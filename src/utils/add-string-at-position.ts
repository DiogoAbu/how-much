export default function addStringAtPosition(text: string, string: string, index: number): string {
  if (index > 0) {
    return text.substring(0, index) + string + text.substring(index, text.length);
  }
  return string + text;
}
