import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Tree from "./pages/Tree";
import PageNotFound from "./pages/PageNotFound";
import Edit from "./pages/Edit";
import "./App.css";
import { SkillTreesContextProvider } from "./contexts/SkillTreesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalStyles from "./GlobalStyles";
import DarkTheme from "./DarkTheme";
import Profile from "./pages/Profile";

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
        <GlobalStyles />
        <DarkTheme />
        <BrowserRouter>
          <Routes>
            <Route index element={<Search />} />
            <Route path="s/:startNodeId/e/:endNodeId" element={<Tree />} />

            <Route
              path="edit/:nodeIds"
              element={
                <ProtectedRoute>
                  <Edit />
                </ProtectedRoute>
              }
            />

            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="bottom-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 1500,
            },
            style: {
              fontSize: "1rem",
              maxWidth: "500px",
              padding: "16px 24px",
            },
          }}
        />
      </SkillTreesContextProvider>
    </QueryClientProvider>
  );
}

export default App;
