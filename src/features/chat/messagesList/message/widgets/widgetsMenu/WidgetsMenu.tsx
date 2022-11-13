import { memo, useCallback } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import {
  CurrencyDollarIcon,
  EllipsisHorizontalCircleIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { WidgetType } from '../../../../hooks/useGetMessages';

type WidgetsMenuProps = {
  onWidgetSelect(widgetType: WidgetType): void;
  className?: string;
};

const WidgetsMenu = (props: WidgetsMenuProps) => {
  const { onWidgetSelect, className = '' } = props;

  const handleWidgetSelect = useCallback(
    (widgetType: WidgetType) => {
      return () => onWidgetSelect(widgetType);
    },
    [onWidgetSelect]
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <EllipsisHorizontalCircleIcon
            className={clsx('h-6 w-6', className)}
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute bottom-0 left-0 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <p className="w-full p-2 pl-3 text-base text-slate-400">
            Выберите виджет
          </p>
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleWidgetSelect('SIGNABLE')}
                  className={`${
                    active ? 'bg-blue-400 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <PencilIcon className="mr-2 h-5 w-5" />
                  Сообщение с подписью
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleWidgetSelect('INVEST_IDEA')}
                  className={`${
                    active ? 'bg-blue-400 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <CurrencyDollarIcon className="mr-2 h-5 w-5" />
                  Инвест идея
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default memo(WidgetsMenu);
