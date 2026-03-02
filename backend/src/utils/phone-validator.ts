/**
 * Validates Ethiopian phone numbers in the format +251XXXXXXXXX.
 */
export function validateEthiopianPhone(phone: string): boolean {
  const regex = /^\+251[0-9]{9}$/;
  return regex.test(phone);
}