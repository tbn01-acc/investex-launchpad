import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const currencyRates: Record<string, Record<string, number>> = {
  USD: { RUB: 100, EUR: 0.92 },
  EUR: { RUB: 109, USD: 1.09 },
  RUB: { USD: 0.01, EUR: 0.0092 }
};

export function convertCurrency(amount: number, from: string, to: string): number {
  if (from === to) return amount;
  
  const rate = currencyRates[from]?.[to];
  if (rate) {
    return Math.ceil(amount * rate);
  }
  
  return amount;
}

export function formatCurrency(amount: number, currency: string, fromCurrency: string = 'RUB'): string {
  const symbols = { USD: '$', EUR: '€', RUB: '₽' };
  
  if (fromCurrency === currency) {
    return `${amount.toLocaleString()}${symbols[currency as keyof typeof symbols] || ''}`;
  }
  
  const converted = convertCurrency(amount, fromCurrency, currency);
  return `${converted.toLocaleString()}${symbols[currency as keyof typeof symbols] || ''}`;
}
