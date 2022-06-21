import React, { useEffect } from "react";
import Header from "./Components/Main/Header";
import ErrorsToasts from "./Components/MiniComponents/ErrorsToasts";
import { useAppDispatch, useAppSelector } from "./Hooks";
import AuthPages from "./Pages/Auth";

import NavigationBar from "./Components/Main/NavigationBar";

import PagesCabinet from "./Pages";

function App() {
  const { checkUserAuth, fetchAppLanguages } = useAppDispatch();

  const { isLogged, loading: loadedApp, user, errors } = useAppSelector(
    (state) => state.App
  );

  useEffect(() => {
    console.log("createApp");

    checkUserAuth();
    fetchAppLanguages();

    // если нету токена не приходят языки и потом нужно вызвать получение языков

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-c">
      <ErrorsToasts errors={errors} />
      {!loadedApp && (
        <div>
          <Header username={user.name} />
          {!isLogged ? (
            <AuthPages />
          ) : (
            <div>
              <NavigationBar />
              <PagesCabinet />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
