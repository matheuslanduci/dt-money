import Modal from "react-modal";
import { ToastContainer } from "react-toastify";

import { TransactionsProvider } from "./containers/TransactionsProvider";
import { GlobalStyle } from "./styles/global";
import { UserProvider } from "./containers/UserProvider";
import { Routes } from "./routes";

Modal.setAppElement("#root");

export function App() {
  return (
    <UserProvider>
      <TransactionsProvider>
        <Routes />
        <ToastContainer />
        <GlobalStyle />
      </TransactionsProvider>
    </UserProvider>
  );
}
