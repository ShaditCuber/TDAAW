import Main from './Pages/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

export default function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Main></Main>
      </QueryClientProvider >
    </>

  );
}

