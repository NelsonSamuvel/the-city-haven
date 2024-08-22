import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashBoard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:bookingId" element={<Booking />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/account" element={<Account />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={8}
        containerStyle={{
          margin: "12px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
            maxWidth: "500px",
            fontSize: "16px",
            padding: "16px 24px",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
