import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterApp from './routers/Router';
import { AuthContextProvider } from './context/AuthContext';
const queryClient = new QueryClient();

export default function App() {

  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterApp />
        </QueryClientProvider >
      </AuthContextProvider>
    </>

  );
}

