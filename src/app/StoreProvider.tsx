"use client";

import { store } from "@/Redux/store";
import React from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}

// we use this file because we want the main layout to be server not client
