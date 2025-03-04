import { useState, useEffect } from "react";

export function useSsrCompatible(newValue, initialValue) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(newValue);
  }, [newValue]);
  return value;
}
