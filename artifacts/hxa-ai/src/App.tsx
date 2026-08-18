import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import ProcessDetailPage from '@/pages/ProcessDetailPage';
import InsightDetailPage from '@/pages/InsightDetailPage';
import Admin from '@/pages/Admin';
import AdminContent from '@/pages/AdminContent';
import { AdminGate } from '@/components/AdminGate';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/:serviceId">{(params) => <ServiceDetailPage serviceId={params.serviceId} />}</Route>
      <Route path="/process/:stepId">{(params) => <ProcessDetailPage stepId={params.stepId} />}</Route>
      <Route path="/insights/:postId">{(params) => <InsightDetailPage postId={params.postId} />}</Route>
      <Route path="/admin">{() => <AdminGate><Admin /></AdminGate>}</Route>
      <Route path="/admin/content">{() => <AdminGate><AdminContent /></AdminGate>}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
