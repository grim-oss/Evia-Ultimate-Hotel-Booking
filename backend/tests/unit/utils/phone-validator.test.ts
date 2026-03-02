import { validateEthiopianPhone } from '../../../src/utils/phone-validator';

describe('validateEthiopianPhone', () => {
  it('should return true for valid Ethiopian numbers', () => {
    expect(validateEthiopianPhone('+251911223344')).toBe(true);
    expect(validateEthiopianPhone('+251912345678')).toBe(true);
  });

  it('should return false for invalid numbers', () => {
    expect(validateEthiopianPhone('0911223344')).toBe(false); // missing +251
    expect(validateEthiopianPhone('+25191122')).toBe(false); // too short
    expect(validateEthiopianPhone('+2519112233445')).toBe(false); // too long
    expect(validateEthiopianPhone('+254911223344')).toBe(false); // wrong country
  });
});