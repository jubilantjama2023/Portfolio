import { toPostRecord } from "./postUtils";

const postFiles = import.meta.glob("./posts/*.md", { query: "?raw", import: "default", eager: true });

export const posts = Object.entries(postFiles).map(([path, raw]) => toPostRecord(path, raw));
