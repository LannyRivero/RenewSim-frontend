import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

const Tooltip = ({ children, text }) => {
  return (
    <Popover className="relative">
      <Popover.Button as="div" className="inline-flex">
        {children}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 px-3 py-1 text-sm font-medium text-white bg-black rounded shadow-lg -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {text}
          <div className="absolute inset-x-0 bottom-[-6px] flex justify-center">
            <div className="w-2 h-2 transform rotate-45 bg-black" />
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Tooltip;
