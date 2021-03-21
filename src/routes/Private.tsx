import { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";

import { Header } from "../components/Header";
import { NewTransactionModal } from "../components/NewTransactionModal";

export function Private() {
  const [
    isNewTransactionModalOpen,
    setIsNewTransactionModalOpen
  ] = useState<boolean>(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <BrowserRouter>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
