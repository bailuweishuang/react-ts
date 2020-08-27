import { RefObject, useEffect } from 'react';

function useClickOut(ref: RefObject<HTMLElement>, handle: Function) {
  useEffect(() => {
    const lister = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handle(event);
    };
    document.addEventListener('click', lister);
    return () => {
      document.removeEventListener('click', lister);
    };
  });
}

export default useClickOut;
