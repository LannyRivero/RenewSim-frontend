import { DarkModeProvider } from "./DarkModeContext";
import { NotificationProvider } from "./NotificationContext";
import { SimulationProvider } from "./SimulationContext";
import { LoadingProvider } from "./LoadingContext .jsx";

//Recrdar ver porque da error al poner  LoadingProvider


export const AppProviders = ({ children }) => (
  <DarkModeProvider>
    <NotificationProvider>
      <SimulationProvider>
        <LoadingProvider>
        {children}
        </LoadingProvider>
      </SimulationProvider>
    </NotificationProvider>
  </DarkModeProvider>
);

