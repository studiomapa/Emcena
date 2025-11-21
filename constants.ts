import { ProposalData } from './types';

export const DEFAULT_PROPOSAL: ProposalData = {
  number: "001",
  date: "28 de Dezembro de 2020",
  dueDate: "28 de Dezembro de 2020",
  client: {
    name: "Beth L Thompson",
    addressLine1: "2108 Fantages Way",
    addressLine2: "Swan Valley, Idaho",
    zipCode: "30901"
  },
  sender: {
    companyName: "EMCENAFILMES",
    subtitle: "EM MOMENTOS ESPECIAIS",
    addressLine1: "790 Par Drive",
    addressLine2: "Goleta, California",
    zipCode: "81762",
    phone: "706-760-1850",
    contactName: "Marciano Rehbein",
    contactTitle: "Filmmaker | Editor"
  },
  items: [
    { id: "1", description: "Estratégia de Marca", qty: 2, price: 100.00 },
    { id: "2", description: "Logo da Empresa", qty: 1, price: 200.00 },
    { id: "3", description: "Revisão", qty: 4, price: 50.00 },
    { id: "4", description: "Consultoria de Design", qty: 3, price: 70.00 },
    { id: "5", description: "Brochura", qty: 2, price: 90.00 },
    { id: "6", description: "Design de Site", qty: 1, price: 100.00 },
  ],
  taxRate: 5,
  terms: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam."
};