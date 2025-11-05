import { describe, it, expect } from "vitest";

const validatePesel = (pesel: string) => {
  if (!/^\d{11}$/.test(pesel)) return false;

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const digits = pesel.split("").map(Number);
  const sum = weights.reduce((acc, w, i) => acc + w * digits[i], 0);
  const control = (10 - (sum % 10)) % 10;
  return control === digits[10];
};

describe("validatePESEL", () => {
  it("valid PESEL", () => {
    expect(validatePesel("44051401359")).toBe(true);
  });

  it("PESEL has invalid length", () => {
    expect(validatePesel("1234567")).toBe(false);
  });

  it("PESEL with letters", () => {
    expect(validatePesel("4405140135A")).toBe(false);
  });

  it("wrong control digit", () => {
    expect(validatePesel("44051401358")).toBe(false);
  });
});
