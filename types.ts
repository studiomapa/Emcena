export interface LineItem {
  id: string;
  description: string;
  qty: number;
  price: number;
}

export interface ClientInfo {
  name: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
}

export interface SenderInfo {
  companyName: string;
  subtitle: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  phone: string;
  contactName: string;
  contactTitle: string;
}

export interface ProposalData {
  number: string;
  date: string;
  dueDate: string;
  client: ClientInfo;
  sender: SenderInfo;
  items: LineItem[];
  taxRate: number; // percentage 0-100
  terms: string;
}