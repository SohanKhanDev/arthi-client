import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes.jsx";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/** ---* tanstack query client *--- **/
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/** -* tanstack query provider *-  **/}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        {/** -* hot toast *-  **/}
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
      {/** -* tanstack dev tools *-  **/}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
