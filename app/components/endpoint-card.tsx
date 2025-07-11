import CodeBlock from "./code-block";

const EndpointCard = ({ endpoint }: { endpoint: TEndpoint }) => {
  return (
    <div
      id={endpoint.title.toLowerCase().replace(/\s/g, "-")}
      className="bg-gray-800 rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-white mb-2">{endpoint.title}</h2>
      <p className="text-gray-400 mb-4">{endpoint.description}</p>
      <div className="bg-gray-900 p-2 rounded-md mb-4">
        <code className="text-green-400">{endpoint.api}</code>
      </div>

      {endpoint.pathParams && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Path Parameters
          </h3>
          <ul className="list-disc list-inside text-gray-400">
            {Object.entries(endpoint.pathParams).map(([param, desc]) => (
              <li key={param}>
                <code className="text-blue-400">{param}</code> - {desc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {endpoint.queryParams && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Query Parameters
          </h3>
          <ul className="list-disc list-inside text-gray-400">
            {Object.entries(endpoint.queryParams).map(([param, desc]) => (
              <li key={param}>
                <code className="text-blue-400">{param}</code> - {desc}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-2">Request</h3>
        <CodeBlock code={endpoint.request} />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-2">Response</h3>
        <CodeBlock code={endpoint.response} />
      </div>
    </div>
  );
};

export default EndpointCard;
