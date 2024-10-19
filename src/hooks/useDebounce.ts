import { useEffect, useMemo } from "react";

const DEBOUNCE_DELAY = 500;

const safeClearTimeout = (timeout: NodeJS.Timeout | null) => {
  if (timeout != null) {
    clearTimeout(timeout);
  }
};

const debounce = (func: Function, wait = DEBOUNCE_DELAY) => {
  let timeout: NodeJS.Timeout | null = null;
  function executedFunction(...args: any[]) {
    safeClearTimeout(timeout); // this clears the timeout each time the function is run again preventing later from running until we stop calling the function
    timeout = setTimeout(() => {
      safeClearTimeout(timeout);
      func(...args);
    }, wait); // this sets the time out to run after the wait period
  }
  executedFunction.cancel = function () {
    safeClearTimeout(timeout);
  };
  return executedFunction;
};

const useDebounce = (callback: Function, delay = DEBOUNCE_DELAY) => {
  const debouncedCallback = useMemo(
    () => debounce(callback, delay),
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      debouncedCallback.cancel(); // cancel any pending calls
    };
  }, [callback, delay, debouncedCallback]);

  return debouncedCallback;
};

export default useDebounce;
