const oneCent = /[.,]\d{1}$/g;
const twoCents = /[.,]\d{2}$/g;

export default function addCents(text: string): string {
  if (oneCent.test(text)) {
    return text + '0';
  }
  if (!twoCents.test(text)) {
    return text + ',00';
  }

  return text;
}
