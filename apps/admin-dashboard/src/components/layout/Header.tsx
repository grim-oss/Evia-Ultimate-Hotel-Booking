import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function Header() {
  const logout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
          <span>Admin</span>
          <ChevronDownIcon className="w-4 h-4" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  );
}