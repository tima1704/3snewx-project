import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "../Hooks";

import { TErrorPage } from "../Redux/AppRedux/types";

interface ErrorsPagesProps {
  errorPage: TErrorPage;
}

export default function ErrorsPages({ errorPage }: ErrorsPagesProps) {
  const location = useLocation();

  const [pathName] = useState<string>(location.pathname);

  const { removeErrorPage } = useAppDispatch();

  useEffect(() => {
    if (location.pathname !== pathName) {
      removeErrorPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, pathName]);

  const history = useHistory();

  const onClickGoBack = () => {
    history.goBack();
  };

  switch (errorPage) {
    case 403:
      return (
        <div>
          <h1>403</h1>
          <h2>Error</h2>
          <Button onClick={onClickGoBack}>Go back</Button>
        </div>
      );

    case 404:
      return <div>Error 404</div>;

    default:
      return <div>ERROR {errorPage}</div>;
  }
}
