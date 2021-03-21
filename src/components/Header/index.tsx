import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks";

import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  const { Logout } = useAuth();

  function handleLogout() {
    Logout();
  }

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
        <button type="button" onClick={handleLogout} className="logout">
          Logout
        </button>
      </Content>
    </Container>
  );
}
