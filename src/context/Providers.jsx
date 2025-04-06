import { DarkModeProvider } from "./DarkModeContext";
import { NotificationProvider } from "./NotificationContext";
import { SimulationProvider } from "./SimulationContext";

export const AppProviders = ({ children }) => (
  <DarkModeProvider>
    <NotificationProvider>
      <SimulationProvider>
        {children}
      </SimulationProvider>
    </NotificationProvider>
  </DarkModeProvider>
);
