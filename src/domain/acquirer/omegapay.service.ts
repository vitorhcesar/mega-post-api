import type { OmegaPayTransactionStatusEnum } from "@/domain/enums/omegapay.enum";

export interface IOmegaPayClient {
  name: string;
  email: string;
  phone: string;
  document: string;
}

export interface IOmegaPayProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IOmegaPaySplit {
  [key: string]: unknown;
}

export interface IOmegaPayReceivePixInput {
  identifier: string;
  amount: number;
  shippingFee?: number;
  extraFee?: number;
  discount?: number;
  client: IOmegaPayClient;
  products?: IOmegaPayProduct[];
  splits?: IOmegaPaySplit[];
  dueDate?: string;
  metadata?: Record<string, unknown> | string;
  callbackUrl?: string;
}

export interface IOmegaPayOrder {
  id: string;
  url?: string;
  receiptUrl?: string;
}

export interface IOmegaPayPix {
  code: string;
  image?: string;
  base64?: string;
}

export interface IOmegaPayReceivePixResult {
  transactionId: string;
  status: OmegaPayTransactionStatusEnum;
  fee: number;
  order: IOmegaPayOrder;
  pix: IOmegaPayPix;
  details?: string;
  errorDescription?: string;
}

export interface IOmegaPayService {
  receivePix(input: IOmegaPayReceivePixInput): Promise<IOmegaPayReceivePixResult>;
}
