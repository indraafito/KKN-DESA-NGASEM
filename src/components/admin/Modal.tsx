import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  animation?: "fade" | "slide" | "scale" | "blur";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  footer?: React.ReactNode;
  headerActions?: React.ReactNode;
}

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "md",
  animation = "scale",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  footer,
  headerActions
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg", 
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw] max-h-[95vh]"
  };

  const animationClasses = {
    fade: "animate-in fade-in-0 duration-200",
    slide: "animate-in slide-in-from-bottom-4 duration-300",
    scale: "animate-in zoom-in-95 duration-200",
    blur: "animate-in fade-in-0 duration-300"
  };

  const overlayAnimationClasses = {
    fade: "animate-in fade-in-0 duration-200",
    slide: "animate-in fade-in-0 duration-200", 
    scale: "animate-in fade-in-0 duration-200",
    blur: "animate-in fade-in-0 backdrop-blur-sm duration-300"
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 bg-black/60 ${overlayAnimationClasses[animation]}`}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`relative w-full ${sizeClasses[size]} bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-800 transition-all ${animationClasses[animation]} max-h-[90vh] flex flex-col`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient background */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200/50 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-t-3xl">
          <h3
            id="modal-title"
            className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mx-4"
          >
            {title}
          </h3>
          
          <div className="flex items-center gap-2">
            {headerActions}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-full transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto overscroll-contain">
          <div className="space-y-4">
            {children}
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-gray-200/50 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-b-3xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;