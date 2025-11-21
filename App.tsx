import React, { useState } from 'react';
import { DEFAULT_PROPOSAL } from './constants';
import { ProposalData } from './types';
import { ProposalPreview } from './components/ProposalPreview';
import { Editor } from './components/Editor';

const App: React.FC = () => {
  const [data, setData] = useState<ProposalData>(DEFAULT_PROPOSAL);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      {/* Editor Panel - Left Side (Scrollable) */}
      <div className="w-full md:w-[400px] lg:w-[450px] h-full shrink-0 z-20 shadow-xl no-print">
        <Editor data={data} onChange={setData} />
      </div>

      {/* Preview Panel - Right Side (Scrollable area containing the fixed-size document) */}
      <div className="flex-grow h-full overflow-y-auto overflow-x-hidden bg-gray-200/50 p-4 md:p-12 flex justify-center">
        <div className="w-full max-w-[850px] origin-top transform transition-transform duration-200 scale-100">
          <ProposalPreview data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;