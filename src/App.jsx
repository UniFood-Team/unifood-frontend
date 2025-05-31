import "./App.css";
import AppRoutes from "./routes/AppRoutes";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { PrimeReactProvider } from "primereact/api";
import Toast from "./components/toast/Toast";
import { ToastProvider } from "./components/toast/ToastContext";

function App() {
  return (
    <PrimeReactProvider>
      <ToastProvider>
        <AppRoutes />
        <Toast />
      </ToastProvider>
    </PrimeReactProvider>
  );
}

export default App;
