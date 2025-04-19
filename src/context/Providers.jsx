
import { NotificationProvider } from "./NotificationContext";
import { SimulationProvider } from "./SimulationContext";
import { LoadingProvider } from "./LoadingContext.jsx";
import { ProfileProvider } from './ProfileContext';

export const AppProviders = ({ children }) => (

  <NotificationProvider>
    <SimulationProvider>
      <LoadingProvider>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </LoadingProvider>
    </SimulationProvider>
  </NotificationProvider>

);

