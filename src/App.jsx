/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Online Brain Project

The Online Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Online Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Online
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

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
import Signup from "./pages/Signup";
import AppLayout from "./components/AppLayout";

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
            <Route element={<AppLayout />}>
              <Route index element={<Search />} />
              <Route path="s/:startNodeId/e/:endNodeId" element={<Tree />} />
              {/* <Route //Temporarily disabled while I work on the MVP
                path="edit/:nodeIds"
                element={
                  <ProtectedRoute>
                    <Edit />
                  </ProtectedRoute>
                }
              /> */}
            </Route>

            {/* <Route path="login" element={<Login />} /> //Temporarily disabled while I work on the MVP
            <Route path="signup" element={<Signup />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            /> */}
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
