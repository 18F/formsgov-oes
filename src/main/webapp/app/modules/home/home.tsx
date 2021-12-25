import './home.scss';
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { getLoginUrl, REDIRECT_URL } from '../../../app/shared/util/url-utils';
import { useAppSelector } from '../../../app/config/store';
import { Alert, Button } from '@trussworks/react-uswds';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  useEffect(() => {
    const redirectURL = localStorage.getItem(REDIRECT_URL);
    if (redirectURL) {
      localStorage.removeItem(REDIRECT_URL);
      location.href = `${location.origin}${redirectURL}`;
    }
  });
  return (
    <Row>
      <Col md="9">
        {/* <p className="lead">This is your homepage</p> */}
        {account && account.login ? (
          <>
            <h2>
              Hello, {account.firstName}&nbsp;{account.lastName}!
            </h2>
            <Alert className="mt-4 mb-4" type="success" heading="Login Successful">
              You are logged in with the email address {account.email}.
            </Alert>
            <div>
              <h4 style={{ fontSize: '1.14rem' }}>
                {' '}
                Now that you have signed in, select the form you would like to complete from the drop down menu above labeled Forms. You
                will be able to complete and sign the form with only a few clicks. Once all the required informaion is entered, you will be
                prompted to sign the form electronically.
                <br />
                <br />
                If you have any questions about the forms, contact [email].
              </h4>
            </div>
          </>
        ) : (
          <>
            <h4 style={{ fontSize: '1.14rem' }}>Form A/B testing.</h4>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Home;
