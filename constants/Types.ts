import { FC, ReactChild, ReactNode } from "react";

export type Component<T = {}> = FC<T & { children?: any }>;
