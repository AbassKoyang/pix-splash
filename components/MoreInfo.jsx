import React, {useState, Fragment} from 'react';
import { Dialog, Transition } from '@headlessui/react';

const MoreInfo = ({isOpen, image, closeModal}) => {

    return (
     <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
      open={isOpen}
      onClose={() => {closeModal}}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <Dialog.Title>Complete your order</Dialog.Title>

          {/* ... */}
        </Dialog.Panel>
      </div>
    </Dialog>
      </Transition>
    );
}

export default MoreInfo