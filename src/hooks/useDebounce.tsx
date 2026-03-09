import { useRef } from "react";

export const useDebounce = (delay: number) => {
  const debounceRef = useRef<number | undefined>(undefined);

  const debounce = (callback: () => void) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(callback, delay);
  };

  return debounce;
};