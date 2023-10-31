import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Mail from './pages/Mail';
import Inbox from './pages/Mail/Inbox';
import Starred from './pages/Mail/Starred';
import Sent from './pages/Mail/Sent';
import All from './pages/Mail/All';
import Important from './pages/Mail/Important';
import Trash from './pages/Mail/Trash';
import Read from './pages/Mail/Read';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <div className="app">
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='mail' element={<Mail />}>
              <Route path='inbox' element={<Inbox />} />
              <Route path='important' element={<Important />} />
              <Route path='starred' element={<Starred />} />
              <Route path='sent' element={<Sent />} />
              <Route path='all' element={<All />} />
              <Route path='trash' element={<Trash />} />
              <Route path='read/:id' element={<Read />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
