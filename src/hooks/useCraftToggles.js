import { useState } from "react";

export const useCraftToggles = () => {
  const [urls, setUrls] = useState("");
  const [copied, setCopied] = useState(false);
  const [apiMethod, setApiMethod] = useState("fetch");
  const [promise, setPromise] = useState("promise");
  const [uiShow, setUiShow] = useState("cards");

  const toggleApiMethod = () => {
    setApiMethod((prev) => (prev === "fetch" ? "axios" : "fetch"));
  };

  const togglePromise = () => {
    setPromise((prev) => (prev === "promise" ? "async" : "promise"));
  };

  const toggleUiShow = () => {
    setUiShow((prev) => (prev === "cards" ? "json" : "cards"));
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    urls,
    setUrls,
    copied,
    handleCopy,
    apiMethod,
    toggleApiMethod,
    promise,
    togglePromise,
    uiShow,
    toggleUiShow,
  };
};
