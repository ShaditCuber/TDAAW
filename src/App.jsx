import React, { useState } from 'react';
import Main from './Pages/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Main></Main>
      </QueryClientProvider >
    </>

  );
}

export default App;
