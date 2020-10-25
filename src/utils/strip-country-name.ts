export default function stripCountryName(name: string): string {
  return name.replace(/[^a-z ]+/gi, '');
}
