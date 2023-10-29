/**
 * <Quick Rule>
 * For `React Component Props`, use `type`
 * For other object-like or class-like stuffs, use `interface`
 */

export interface IAffiliate {
  id: number;
  title: string;
  content_short: string;
  content: string;
}

export interface IDiscount {
  id: number;
  title: string;
  region: string;
  open_hour: string;
  phone: string;
  content: string;
}
