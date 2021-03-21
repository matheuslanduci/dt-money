import { useAuth } from "../hooks";
import { Private } from "./Private";
import { Public } from "./Public";

export function Routes() {
  const { signed } = useAuth();

  return signed ? <Private /> : <Public />;
}
