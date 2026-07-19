import * as Updates from "expo-updates";
import { useEffect, useState } from "react";

export const useUpdate = () => {
  const [isLoading, setIsLoadingUpdate] = useState(false);

  useEffect(() => {
    const update = async () => {
      if (__DEV__) {
        return;
      }

      try {
        setIsLoadingUpdate(true);
        const { isAvailable } = await Updates.checkForUpdateAsync();

        if (isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
        setIsLoadingUpdate(false);
      } catch {
        setIsLoadingUpdate(false);
      }
    };

    update();
  }, []);

  return isLoading;
};
