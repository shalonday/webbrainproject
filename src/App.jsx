/* 
Copyright 2023, 2025 Salvador Pio Alonday

This file is part of The Web Brain Project

The Web Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Web Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Web
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { SkillTreesContextProvider } from "./contexts/SkillTreesContext";
import DarkTheme from "./DarkTheme";
import GlobalStyles from "./GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import Search from "./pages/Search";
import Tree from "./pages/Tree";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

function AppRoutes() {
    <Routes>
        <Route element={<AppLayout />}>
            <Route
                element={<Search />}
                index
            />
            <Route
                element={<Tree />}
                path="s/:startNodeId/e/:endNodeId"
            />
        </Route>
        <Route
            element={<PageNotFound />}
            path="*"
        />
    </Routes>
}

function AppProviders({ children }) {
    return ( 
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <SkillTreesContextProvider>
                {children}
            </SkillTreesContextProvider>
        </QueryClientProvider>
    );
}

function AppToasterComponent () {
    return (
        <Toaster
            containerStyle={{ margin: "8px" }}
            gutter={12}
            position="bottom-center"
            toastOptions={{
                error: {
                    duration: 1500,
                },
                style: {
                    fontSize: "1rem",
                    maxWidth: "500px",
                    padding: "16px 24px",
                },
                success: {
                    duration: 3000,
                },
            }}
        />
    )
}

function App() {
    return (
        <AppProviders>
            <GlobalStyles />
            <DarkTheme />
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
            <AppToasterComponent />
        </AppProviders>
    );
}

export default App;

AppProviders.propTypes = {
    children: PropTypes.node.isRequired
}
