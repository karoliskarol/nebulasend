import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Mail from './pages/Mail';
import Read from './pages/Mail/Read';
import Messages from './pages/Mail/layout/RightSide/Messages';
import { useEffect } from 'react';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  useEffect(() => {
    if (window.location.href.indexOf('www.') > -1) {
      window.location.href = window.location.href.replace('www.', '');
    }
  }, []);

  return (
    <div className="app">
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='mail' element={<Mail />}>
              <Route path='important' element={<Messages qKey='important' />} />
              <Route path='starred' element={<Messages qKey='starred' />} />
              <Route path='sent' element={<Messages qKey='sent' />} />
              <Route path='all' element={<Messages qKey='all' />} />
              <Route path='trash' element={<Messages qKey='trash' />} />
              <Route path='inbox' element={<Messages qKey='inbox' />} />
              <Route path='read/:id' element={<Read />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;