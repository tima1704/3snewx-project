import { AxiosError } from "axios";
import { useState } from "react";
import {
  Col,
  Collapse,
  Form,
  FormControl,
  Row,
  Spinner,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { TOKEN } from "Constants/AppConstants";
import { LoginApi } from "Helpers/api";
import { URL_FORGOT_PASSWORD } from "Constants/URLConstants/URLLogin";

import { useAppDispatch } from "Hooks";
import { ErrILogin, ILoginData } from "Types/Response/login";

import styles from "Styles/pagesStyles/auth.module.css";

export default function Login() {
  const { checkUserAuth } = useAppDispatch();

  const [loginData, setLogin] = useState<ILoginData>({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...loginData, userName: e.target.value });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...loginData, password: e.target.value });
  };

  const onChangeRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    LoginApi.submitLogin(loginData)
      .then((res) => {
        if (rememberMe) {
          localStorage.setItem(TOKEN, res.data.data.key);
        } else {
          sessionStorage.setItem(TOKEN, res.data.data.key);
        }
        checkUserAuth();
      })
      .catch((e: AxiosError<ErrILogin>) => {
        if (e.response?.data) {
          return setError(e.response.data.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      <Form className={styles.form} onSubmit={submitForm}>
        <h3 className={styles.loginCaption}>Login</h3>

        <div className="form-group">
          <label className={styles.label}>E-mail</label>
          <FormControl
            type="email"
            placeholder="Enter email"
            value={loginData.userName}
            onChange={onChangeUserName}
            autoComplete={"email"}
            isInvalid={error.length > 0}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className={styles.label}>Password</label>
          <FormControl
            type="password"
            placeholder="Enter password"
            value={loginData.password}
            onChange={onChangePassword}
            autoComplete={"current-password"}
            isInvalid={error.length > 0}
            disabled={loading}
          />
        </div>

        <Collapse in={error.length > 0}>
          <div className={styles.loginError}>{error}</div>
        </Collapse>

        <Row className={styles.loginHelpers}>
          <Col>
            <div className="form-group">
              <Form.Check
                type={"checkbox"}
                label={"Remember me"}
                id={"rememberId"}
                className={"checkbox"}
                disabled={loading}
                checked={rememberMe}
                onChange={onChangeRememberMe}
              />
            </div>
          </Col>
          <Col>
            <p className={styles.forgotPassword}>
              <Link to={URL_FORGOT_PASSWORD}>Forgot password?</Link>
            </p>
          </Col>
        </Row>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={
            loginData.password.length < 6 ||
            loginData.userName.length < 6 ||
            loading
          }
        >
          {!loading ? "Sign in" : <Spinner animation="border" size="sm" />}
        </Button>
      </Form>
    </div>
  );
}
