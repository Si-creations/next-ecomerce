"use client";

import { ReactNode, useEffect, useState } from "react";
import { useThemeStore } from "@/store";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const themeStore = useThemeStore();
  //Wait till Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <>
      {isHydrated ? (
        <body
          className="px-4  md:px-20  lg:px-80 font-lobster "
          data-theme={themeStore.mode}
        >
          {" "}
          {children}
        </body>
      ) : (
        <body></body>
      )}
    </>
  );
}

//So basicly this is for page to wait until its get its data and you can render sometging before that happens.
