import React from 'react';
import { ProposalData } from '../types';

interface ProposalPreviewProps {
  data: ProposalData;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ data }) => {
  const subTotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const taxes = subTotal * (data.taxRate / 100);
  const totalDue = subTotal + taxes;

  return (
    <div className="w-full bg-white shadow-2xl print-container relative min-h-[1100px] flex flex-col text-sm md:text-base">
      {/* Top Orange Decoration */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-brand-orange rounded-b-3xl mx-12"></div>

      <div className="p-12 pt-20 flex-grow flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div className="flex items-center">
            <div className="border-r-2 border-brand-orange pr-6 mr-6">
              <h1 className="text-3xl font-bold text-brand-orange tracking-wide uppercase">
                {data.sender.companyName}
              </h1>
              <p className="text-xs text-gray-500 tracking-widest text-right uppercase">{data.sender.subtitle}</p>
            </div>
            <div className="text-xs text-gray-800 font-semibold">
              <p className="mb-1">Endereço:</p>
              <p className="text-gray-600 font-normal">{data.sender.addressLine1}</p>
              <p className="text-gray-600 font-normal">{data.sender.addressLine2}</p>
              <p className="text-gray-600 font-normal">{data.sender.zipCode}</p>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 tracking-tight mt-4">proposta</h2>
        </div>

        {/* Info Section */}
        <div className="flex justify-between items-start mb-12 bg-gray-100/50 p-6 rounded-lg md:bg-transparent md:p-0">
          <div>
            <p className="font-bold text-gray-700 mb-1">Proposta para:</p>
            <p className="font-bold text-gray-900">{data.client.name}</p>
            <p className="text-gray-600 text-sm">{data.client.addressLine1}</p>
            <p className="text-gray-600 text-sm">{data.client.addressLine2}</p>
            <p className="text-gray-600 text-sm">{data.client.zipCode}</p>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <p className="font-bold text-gray-800 text-sm">Data</p>
              <p className="text-gray-600 text-sm">{data.date}</p>
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Vencimento</p>
              <p className="text-gray-600 text-sm">{data.dueDate}</p>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-brand-orange text-white font-bold text-sm uppercase tracking-wider flex rounded-lg py-3 px-6 mb-6">
          <div className="w-12 text-center">Nº</div>
          <div className="flex-grow pl-8">Descrição</div>
          <div className="w-20 text-center">Qtd</div>
          <div className="w-28 text-right">Preço</div>
          <div className="w-28 text-right">Total</div>
        </div>

        {/* Table Body */}
        <div className="flex-grow mb-8">
          {data.items.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex items-center py-4 px-6 mb-2 rounded-lg text-gray-700 font-medium ${
                (index + 1) % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <div className="w-12 text-center text-gray-500">{index + 1}</div>
              <div className="flex-grow pl-8">{item.description}</div>
              <div className="w-20 text-center">{item.qty}</div>
              <div className="w-28 text-right">{formatCurrency(item.price)}</div>
              <div className="w-28 text-right text-gray-900 font-bold">{formatCurrency(item.qty * item.price)}</div>
            </div>
          ))}
        </div>

        {/* Footer / Summary */}
        <div className="flex justify-between items-end mb-16">
          <div className="w-1/2 pr-12">
            <h3 className="text-brand-orange font-bold text-sm uppercase mb-2">Forma de Pagamento</h3>
            <p className="text-sm text-gray-700 font-bold">Transferência Bancária</p>
            <p className="text-sm text-gray-600">Banco do Brasil</p>
            <p className="text-sm text-gray-600 mb-6">Ag: 0001 Cc: 12345-6</p>

            <h3 className="text-brand-orange font-bold text-sm uppercase mb-2">Termos e Condições</h3>
            <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
              {data.terms}
            </p>
            
            <div className="mt-8">
                <h3 className="text-brand-orange font-bold text-xs uppercase mb-1">Telefone</h3>
                <p className="text-sm text-gray-600">{data.sender.phone}</p>
            </div>
          </div>

          <div className="w-1/2 pl-12">
             <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-gray-900 font-bold">{formatCurrency(subTotal)}</span>
             </div>
             <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Impostos ({data.taxRate}%)</span>
                <span className="text-gray-900 font-bold">{formatCurrency(taxes)}</span>
             </div>
             <div className="flex justify-between items-center py-4 mt-2">
                <span className="text-brand-orange font-bold uppercase tracking-wide">Total a Pagar</span>
                <span className="text-brand-orange text-xl font-bold">{formatCurrency(totalDue)}</span>
             </div>
             
             <div className="mt-16 text-right">
                <p className="font-bold text-gray-800">{data.sender.contactName}</p>
                <p className="text-gray-500 text-sm">{data.sender.contactTitle}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};