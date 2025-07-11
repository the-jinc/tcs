import { createRoute } from "honox/factory";
import { endpoints } from "../lib/endpoints";
import EndpointCard from "../components/endpoint-card";

export default createRoute((c) => {
  return c.render(
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Telegram Channel Scraper API
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            API documentation for scraping Telegram channels.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row">
          <aside className="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
            <nav className="sticky top-20">
              <h2 className="text-lg font-semibold text-white mb-4">
                Endpoints
              </h2>
              <ul>
                {endpoints.map((endpoint) => (
                  <li key={endpoint.title} className="mb-2">
                    <a
                      href={`#${endpoint.title
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                      className="text-gray-400 hover:text-white"
                    >
                      {endpoint.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="w-full lg:w-3/4">
            {endpoints.map((endpoint) => (
              <EndpointCard key={endpoint.title} endpoint={endpoint} />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
});
