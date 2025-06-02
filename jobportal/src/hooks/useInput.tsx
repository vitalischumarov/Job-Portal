import { useState } from "react";

export function useInput(inputText: string): [string, (value: string) => void] {
  const [input, setInput] = useState<string>(inputText);
  if (input === undefined) {
    setInput("");
  }
  return [input, setInput];
}
