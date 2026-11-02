"use client";

import React, { createContext, useContext, useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";
import LookbookModal from "@/components/LookbookModal";

interface BookingContextType {
  openBooking: (prefillScope?: string) => void;
  closeBooking: () => void;
  openLookbook: () => void;
  closeLookbook: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [prefilledScope, setPrefilledScope] = useState("");
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);

  const openBooking = (scope = "") => {
    setPrefilledScope(scope);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  const openLookbook = () => {
    setIsLookbookOpen(true);
  };

  const closeLookbook = () => {
    setIsLookbookOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{ openBooking, closeBooking, openLookbook, closeLookbook }}
    >
      {children}
      {isBookingOpen && (
        <ConsultationModal
          isOpen={isBookingOpen}
          onClose={closeBooking}
          prefilledScope={prefilledScope}
        />
      )}
      {isLookbookOpen && (
        <LookbookModal
          isOpen={isLookbookOpen}
          onClose={closeLookbook}
          onOpenBooking={openBooking}
        />
      )}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
