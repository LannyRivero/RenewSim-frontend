
import { NotificationProvider } from "./NotificationContext";
import { SimulationProvider } from "./SimulationContext";
import { LoadingProvider } from "./LoadingContext.jsx";


export const AppProviders = ({ children }) => (

  <NotificationProvider>
    <SimulationProvider>
      <LoadingProvider>
          {children}
      </LoadingProvider>
    </SimulationProvider>
  </NotificationProvider>

);

