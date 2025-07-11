import { useState } from "hono/jsx";

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg my-4">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
        <span className="text-gray-400 text-xs">EXAMPLE</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white text-xs"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-white overflow-x-auto text-sm">{code}</pre>
    </div>
  );
};

export default CodeBlock;
