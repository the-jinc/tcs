"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Code,
  Database,
  Search,
  FileText,
  MessageSquare,
  Users,
  Menu,
  ExternalLink,
} from "lucide-react";

const endpoints = [
  {
    id: "channel-info",
    title: "Retrieve Channel Information",
    description: "Fetches detailed information about a specific channel.",
    api: "api/v1/info/:username",
    method: "GET",
    pathParams: { username: "The unique identifier of the channel." },
    request: "https://tcs.jinc.team/api/v1/info/abdeta_terefe",
    response: `{
  "username": "@abdeta_terefe",
  "name": "Abdi",
  "description": "Personal blogs and writing channel.\\nVisit my website for more about me.\\nhttps://abdeta.vercel.app",
  "image": "https://cdn4.cdn-telegram.org/file/...",
  "subscribers": "18",
  "photos": "61",
  "videos": "4",
  "files": "3",
  "links": "10"
}`,
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "single-post",
    title: "Retrieve Single Post",
    description:
      "Fetches detailed information about a specific post within a channel.",
    api: "api/v1/post/:username/:id",
    method: "GET",
    pathParams: {
      username: "The unique identifier of the channel.",
      id: "The unique identifier of the post.",
    },
    request: "https://tcs.jinc.team/api/v1/post/abdeta_terefe/101",
    response: `{
  "id": "101",
  "user": "Abdi",
  "text": "Deno is actually great.",
  "views": "81",
  "time": "2023-11-29T17:44:51+00:00"
}`,
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    id: "channel-posts",
    title: "Retrieve Channel Posts",
    description: "Fetches the most recent 20 posts from a specific channel.",
    api: "api/v1/posts/:username",
    method: "GET",
    pathParams: { username: "The unique identifier of the channel" },
    queryParams: {
      before: "Fetches 20 posts preceding a specific post ID",
      after: "Fetches 20 posts following a specific post ID",
    },
    request: "https://tcs.jinc.team/api/v1/posts/abdeta_terefe?after=111",
    response: `[
  {
    "id": "113",
    "user": "Abdi",
    "images": [
      "https://cdn4.cdn-telegram.org/file/..."
    ],
    "views": "139",
    "time": "2024-01-20T12:25:19+00:00"
  },
  {
    "id": "116",
    "user": "Abdi",
    "text": "https://github.com/abdetaterefe/phone_recap",
    "views": "145",
    "time": "2024-01-20T14:26:47+00:00",
    "reply": {
      "id": "111",
      "author": "Abdi"
    }
  }
]`,
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "search-results",
    title: "Retrieve Search Results",
    description:
      "Fetches the most recent 20 posts that match a specific search query.",
    api: "api/v1/search/:username",
    method: "GET",
    pathParams: { username: "The unique identifier of the channel." },
    queryParams: { query: "The search term or phrase." },
    request: "https://tcs.jinc.team/api/v1/search/abdeta_terefe?query=java",
    response: `[
  {
    "id": "60",
    "user": "Abdi",
    "text": "a simple Java project that scraps websites and saves data in JSON format.",
    "image": "https://cdn4.cdn-telegram.org/file/...",
    "views": "50",
    "time": "2023-04-18T17:47:14+00:00"
  },
  {
    "id": "85",
    "user": "Abdi",
    "text": "coding is so stressful",
    "views": "67",
    "time": "2023-09-11T18:25:37+00:00",
    "reply": {
      "id": "84",
      "author": "Abdi"
    }
  }
]`,
    icon: <Search className="h-5 w-5" />,
  },
];

function Sidebar({ className = "" }: { className?: string }) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    endpoints.forEach((endpoint) => {
      const element = document.getElementById(endpoint.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={`space-y-2 ${className}`}>
      <div className="pb-4">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Quick Navigation
        </h3>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
          onClick={() => scrollToSection("getting-started")}
        >
          <Code className="h-4 w-4 mr-2" />
          Getting Started
        </Button>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          API Endpoints
        </h3>
        <div className="space-y-1">
          {endpoints.map((endpoint) => (
            <Button
              key={endpoint.id}
              variant="ghost"
              className={`w-full justify-start text-left h-auto py-2 px-3 ${
                activeSection === endpoint.id
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => scrollToSection(endpoint.id)}
            >
              <div className="flex items-start gap-2 w-full">
                {endpoint.icon}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {endpoint.title}
                  </div>
                  <div className="text-xs opacity-70 truncate">
                    {endpoint.method} {endpoint.api}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Telegram Channel Scraper API
                </h1>
                <p className="text-slate-400 text-sm">
                  Complete API documentation and reference
                </p>
              </div>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-slate-400 hover:text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 bg-slate-900 border-slate-800"
              >
                <div className="py-4">
                  <Sidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 border-r border-slate-800 bg-slate-900 sticky top-0 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          <div className="container mx-auto px-4 py-8 lg:px-8">
            {/* Introduction */}
            <section id="getting-started" className="mb-12">
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl text-white">
                    <Code className="h-5 w-5 text-blue-400" />
                    Getting Started
                  </CardTitle>
                  <CardDescription className="text-base text-slate-300">
                    The Telegram Channel Scraper API provides programmatic
                    access to Telegram channel data. All endpoints return JSON
                    responses and use RESTful conventions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-200">
                        Base URL
                      </h4>
                      <code className="bg-slate-800 text-blue-300 px-3 py-1 rounded text-sm font-mono">
                        https://tcs.jinc.team
                      </code>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-200">
                        Response Format
                      </h4>
                      <code className="bg-slate-800 text-green-300 px-3 py-1 rounded text-sm font-mono">
                        application/json
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Endpoints */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                API Endpoints
              </h2>

              {endpoints.map((endpoint) => (
                <section
                  key={endpoint.id}
                  id={endpoint.id}
                  className="scroll-mt-20"
                >
                  <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-900/50 rounded-lg border border-blue-800">
                            {endpoint.icon}
                          </div>
                          <div>
                            <CardTitle className="text-xl text-white">
                              {endpoint.title}
                            </CardTitle>
                            <CardDescription className="text-base mt-1 text-slate-300">
                              {endpoint.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-green-900/50 text-green-300 border-green-800"
                        >
                          {endpoint.method}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Endpoint URL */}
                      <div>
                        <h4 className="font-semibold mb-2 text-slate-200">
                          Endpoint
                        </h4>
                        <div className="flex items-center gap-2">
                          <code className="bg-slate-800 text-slate-100 px-4 py-2 rounded-lg block font-mono text-sm flex-1">
                            {endpoint.method} /{endpoint.api}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-white"
                            onClick={() =>
                              window.open(endpoint.request, "_blank")
                            }
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Path Parameters */}
                      {endpoint.pathParams && (
                        <div>
                          <h4 className="font-semibold mb-3 text-slate-200">
                            Path Parameters
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(endpoint.pathParams).map(
                              ([param, description]) => (
                                <div
                                  key={param}
                                  className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                                >
                                  <code className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded text-sm font-mono border border-blue-800">
                                    {param}
                                  </code>
                                  <span className="text-slate-300 text-sm">
                                    {description}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Query Parameters */}
                      {endpoint.queryParams && (
                        <div>
                          <h4 className="font-semibold mb-3 text-slate-200">
                            Query Parameters
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(endpoint.queryParams).map(
                              ([param, description]) => (
                                <div
                                  key={param}
                                  className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                                >
                                  <code className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded text-sm font-mono border border-purple-800">
                                    {param}
                                  </code>
                                  <span className="text-slate-300 text-sm">
                                    {description}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      <Separator className="bg-slate-700" />

                      {/* Example Request */}
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-200">
                          Example Request
                        </h4>
                        <code className="bg-slate-800 text-slate-100 px-4 py-3 rounded-lg block font-mono text-sm overflow-x-auto border border-slate-700">
                          GET {endpoint.request}
                        </code>
                      </div>

                      {/* Example Response */}
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-200">
                          Example Response
                        </h4>
                        <pre className="bg-slate-800 text-slate-100 px-4 py-3 rounded-lg text-sm overflow-x-auto border border-slate-700">
                          <code>{endpoint.response}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              ))}
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-slate-800">
              <div className="text-center text-slate-400">
                <p className="text-sm">
                  © 2025 JINC. Built with ❤️ for developers.
                </p>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
