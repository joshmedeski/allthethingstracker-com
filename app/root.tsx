import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser, themeSessionResolver } from "./session.server";

import {
  ThemeProvider,
  useTheme,
  PreventFlashOnWrongTheme,
} from "remix-themes";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "All the Things Tracker",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  theme: any;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);
  const theme = getTheme();
  return json<LoaderData>({
    user: await getUser(request),
    theme,
  });
};

function App() {
  const data = useLoaderData();
  const [theme] = useTheme();
  return (
    <html lang="en" data-theme={theme ?? ""}>
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#f2e96c" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "production" && (
          <script
            src="https://cdn.usefathom.com/script.js"
            data-site="SSSMOPFC"
            defer
          ></script>
        )}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}
