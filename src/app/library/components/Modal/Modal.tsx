// components/ResponsiveModal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ResponsiveModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white w-3/4 md:w-3/4 lg:w-1/2 p-6 md:p-8 lg:p-10 rounded-lg max-w-md md:max-w-lg lg:max-w-xl transform transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveModal;
