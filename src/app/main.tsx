/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'app/config/i18n/i18n.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
)
