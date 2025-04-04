
import { useEffect, useState } from "react";
import checkBackendStatus from "@/services/apiService";


const BackendStatus = () => {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    const fetchStatus = async () => {
      const result = await checkBackendStatus();
      setStatus(result);
    };

    fetchStatus();
  }, []);

  return <div>{status}</div>;
};

export default BackendStatus;


