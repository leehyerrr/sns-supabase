import RootRoute from "@/root-route";
import SessionProvider from "./provider/session-provider";

function App() {
  return (
    <SessionProvider>
      <RootRoute />
    </SessionProvider>
  );
}

export default App;
