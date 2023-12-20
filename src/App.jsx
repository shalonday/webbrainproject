import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Tree from "./pages/Tree";
import PageNotFound from "./pages/PageNotFound";
import Edit from "./pages/Edit";
import "./App.css";
import { SkillTreesContextProvider } from "./contexts/SkillTreesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SkillTreesContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Search />} />
            <Route path="s/:startNodeId/e/:endNodeId" element={<Tree />} />
            <Route path="edit/:nodeIds" element={<Edit />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </SkillTreesContextProvider>
    </QueryClientProvider>
  );
}

export default App;
