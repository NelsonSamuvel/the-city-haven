import { useEffect, useRef } from "react";

export function useClickEvent(handler, eventPhase = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, eventPhase);

    return () => document.removeEventListener("click", handleClick, eventPhase);
  }, [handler, eventPhase]);

  return ref;
}
