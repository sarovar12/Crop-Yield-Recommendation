import ReactDOM from 'react-dom/client';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import RoutingHandler from './components/RoutingHandler.jsx';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RoutingHandler />
  </QueryClientProvider>
);
