
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "../Router";
import { UsuarioProvider } from "./context/AuthContext";
import { Toaster } from 'sonner';
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Toaster richColors closeButton position="top-center"  />
      <QueryClientProvider client={queryClient}>
        <UsuarioProvider>
          <BrowserRouter>
            <RouterApp />
          </BrowserRouter>
        </UsuarioProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
