import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="text-white w-64 flex flex-col min-h-screen">
    
      <div className="p-4 flex-grow">
        <ul className="space-y-2">
          <li className="hover:bg-gray-800 rounded">
            <Link className="block p-2" to=''>Create ChatBots</Link>
          </li>
          <li className="hover:bg-gray-800 rounded">
            <Link  className="block p-2" to='managebot'>Manage ChatBots</Link>
          </li>
          <li className="hover:bg-gray-800 rounded">
            <Link  className="block p-2" to='chatbot'>Connect With bots</Link>
          </li>
          <li className="hover:bg-gray-800 rounded">
            <Link  className="block p-2" to='editbot'>Edit bot details</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
