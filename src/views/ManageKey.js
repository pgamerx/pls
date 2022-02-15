import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import fetch from "node-fetch";

export const ManageKeyComponent = () => {
  const { user } = useAuth0();
  const [state, setState] = useState({
    showResult: false,
    showdel: false,
    apiMessage: "",
    error: null,
  });

  const { loginWithPopup, getAccessTokenWithPopup } = useAuth0();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const callApi = async () => {
    try {
      const email = user.email;
      const res = await fetch(
        `https://api.pgamerx.com/protected/api/key/${email}`
      );
      const data = await res.json();

      if (data[0] === "failure") {
        const res = await fetch(
          `https://api.pgamerx.com/protected/api/generate/${email}`
        );
        const data = await res.json();
        const key = data[0];

        setState({
          ...state,
          showResult: true,
          apiMessage: key,
        });
      } else if (data[0]) {
        const res = await fetch(
          `https://api.pgamerx.com/protected/api/regenerate/${email}`
        );
        const data = await res.json();
        const key = data[0];

        setState({
          ...state,
          showResult: true,
          apiMessage: key,
        });
      }
    } catch (err) {
      setState({
        ...state,
        error: err.error,
      });
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  return (
    <>
      <div className="mb-5">
        {state.error === "consent_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              class="alert-link"
              onClick={(e) => handle(e, handleConsent)}
            >
              consent to get access to users api
            </a>
          </Alert>
        )}

        {state.error === "login_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              class="alert-link"
              onClick={(e) => handle(e, handleLoginAgain)}
            >
              log in again
            </a>
          </Alert>
        )}

        <h1>Manage Api Key</h1>
        <p className="lead">Regenrate/Generate API key for {user.email}</p>

        <p>
          Hi {user.name}, you can generate new api key by clicking on the button
          below.
        </p>
        
        <Button color="primary" className="mt-5" onClick={callApi}>
          Regenrate A New Key
        </Button>
        <Alert color="warning">
            When generating new api key, your old api key (if any) will be
            invalidated. (Please dont abuse this feature, it will lead to a permanent ban)
          </Alert>

        <Button color="danger" className="mt-5" disabled={true}>
          Delete All Keys
        </Button>
        <Alert color="danger">
            By clicking this button, you will delete all your api keys.
            Do remember that you will not be able to use the API anymore, but you can always generate a new key.
          </Alert>
      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">API Key</h6>
            <Highlight>
              <span>{state.apiMessage}</span>
            </Highlight>
            <Alert color="success">
              Successfully generated new API key, though remember to save it as <strong>you cannot view it again</strong>
            </Alert>
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(ManageKeyComponent, {
  onRedirecting: () => <Loading />,
});
