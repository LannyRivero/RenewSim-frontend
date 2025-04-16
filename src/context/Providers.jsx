
import { NotificationProvider } from "./NotificationContext";
import { SimulationProvider } from "./SimulationContext";
import { LoadingProvider } from "./LoadingContext.jsx";
import { ProfileProvider } from './ProfileContext';

//Recrdar ver porque da error al poner  LoadingProvider


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

