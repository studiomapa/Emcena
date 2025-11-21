import React, { useState } from 'react';
import { ProposalData, LineItem } from '../types';
import { Plus, Trash2, Wand2, Loader2, Printer } from 'lucide-react';
import { generateProposalItems } from '../services/geminiService';

interface EditorProps {
  data: ProposalData;
  onChange: (data: ProposalData) => void;
}

export const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSenderChange = (field: string, value: string) => {
    onChange({ ...data, sender: { ...data.sender, [field]: value } });
  };

  const handleClientChange = (field: string, value: string) => {
    onChange({ ...data, client: { ...data.client, [field]: value } });
  };

  const handleItemChange = (id: string, field: keyof LineItem, value: string | number) => {
    const newItems = data.items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, items: newItems });
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "Novo Serviço",
      qty: 1,
      price: 0
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    onChange({ ...data, items: data.items.filter(item => item.id !== id) });
  };

  const handleGenerateItems = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const newItemsData = await generateProposalItems(aiPrompt);
      const newItems: LineItem[] = newItemsData.map((item, idx) => ({
        ...item,
        id: Date.now().toString() + idx
      }));
      // Append or Replace? Let's replace for a fresh start effect, or maybe clear and add.
      onChange({ ...data, items: newItems });
    } catch (e) {
      alert("Falha ao gerar itens. Verifique a chave de API.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold text-gray-800">Editor de Proposta</h2>
        <button 
          onClick={() => window.print()}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          title="Imprimir Proposta"
        >
           <Printer size={20} />
        </button>
      </div>

      <div className="p-6 space-y-8">
        
        {/* AI Section */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <h3 className="text-blue-900 font-semibold mb-2 flex items-center gap-2">
            <Wand2 size={16} />
            Preenchimento com IA
          </h3>
          <div className="flex gap-2">
            <input 
              type="text"
              placeholder="ex: 'Produção de vídeo para casamento'"
              className="flex-grow px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateItems()}
            />
            <button 
              onClick={handleGenerateItems}
              disabled={isGenerating}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="animate-spin" size={16} /> : "Gerar"}
            </button>
          </div>
        </div>

        {/* Client Info */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Detalhes do Cliente</h3>
          <div className="space-y-3">
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange outline-none transition"
              placeholder="Nome do Cliente"
              value={data.client.name}
              onChange={(e) => handleClientChange('name', e.target.value)}
            />
             <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange outline-none transition"
              placeholder="Endereço"
              value={data.client.addressLine1}
              onChange={(e) => handleClientChange('addressLine1', e.target.value)}
            />
             <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange outline-none transition"
              placeholder="CEP / Cidade"
              value={data.client.zipCode}
              onChange={(e) => handleClientChange('zipCode', e.target.value)}
            />
          </div>
        </section>

        {/* Dates */}
        <section className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Data</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-orange outline-none"
              value={data.date}
              onChange={(e) => onChange({...data, date: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Vencimento</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-orange outline-none"
              value={data.dueDate}
              onChange={(e) => onChange({...data, dueDate: e.target.value})}
            />
          </div>
        </section>

        {/* Line Items */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Serviços / Itens</h3>
            <button 
              onClick={addItem}
              className="text-brand-orange text-sm font-medium flex items-center gap-1 hover:text-orange-600"
            >
              <Plus size={16} /> Adicionar Item
            </button>
          </div>
          
          <div className="space-y-3">
            {data.items.map((item) => (
              <div key={item.id} className="flex gap-2 items-start bg-gray-50 p-3 rounded-lg group">
                <div className="flex-grow space-y-2">
                  <input 
                    className="w-full bg-transparent border-b border-gray-200 focus:border-brand-orange outline-none text-sm font-medium text-gray-800 placeholder-gray-400"
                    placeholder="Descrição"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  />
                  <div className="flex gap-2">
                    <div className="w-20">
                       <label className="text-[10px] text-gray-500 uppercase">Qtd</label>
                       <input 
                        type="number"
                        className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm outline-none focus:border-brand-orange"
                        value={item.qty}
                        onChange={(e) => handleItemChange(item.id, 'qty', Number(e.target.value))}
                      />
                    </div>
                    <div className="w-28">
                       <label className="text-[10px] text-gray-500 uppercase">Preço</label>
                       <input 
                        type="number"
                        className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm outline-none focus:border-brand-orange"
                        value={item.price}
                        onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section>
           <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Configurações</h3>
           <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="text-sm text-gray-700">Impostos (%)</span>
              <input 
                type="number" 
                className="w-20 bg-white border border-gray-200 rounded px-2 py-1 text-sm outline-none focus:border-brand-orange text-right"
                value={data.taxRate}
                onChange={(e) => onChange({...data, taxRate: Number(e.target.value)})}
              />
           </div>
        </section>

      </div>
    </div>
  );
};