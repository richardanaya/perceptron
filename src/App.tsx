import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import { invoke } from "@tauri-apps/api";

function App() {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    invoke("show_main_window");
  }, []);

  let generateCallback = useCallback(async () => {
    let prompt = inputRef.current?.value;
    if (!prompt || prompt.trim() === "") {
      setText("Please enter a prompt");
      return;
    }
    prompt = prompt.trim();
    const r = await fetch(
      "http://localhost:8080/api/text-completion?prompt=famous%20qoute",
      {
        method: "POST",
        body: prompt,
      }
    );
    const text = await r.text();
    setText(text);
  }, []);

  return (
    <>
      <div className="card">
        <textarea placeholder="Enter a prompt" ref={inputRef} />
        <button onClick={generateCallback}>Generate</button>
        <pre>{text}</pre>
      </div>
    </>
  );
}

export default App;
