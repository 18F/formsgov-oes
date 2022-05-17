import './header.scss';
import React, { useState } from 'react';
import { getLoginUrl } from '../../../../app/shared/util/url-utils';
import { GovBanner, Header, Menu, NavDropDownButton, NavList, NavMenuButton, PrimaryNav, Title } from '@trussworks/react-uswds';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import http from '../../../shared/service/http-service';
export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInProduction: boolean;
}

const HeaderBar = (props: IHeaderProps) => {
  const [expanded, setExpanded] = useState(false);
  const onClick = (): void => setExpanded(prvExpanded => !prvExpanded);
  const [isOpen, setIsOpen] = useState([false, false]);
  const location = useLocation();
  const formsMenuItems = [
    <Link to="/form/form-A" key="a">
      Form-A
    </Link>,
    <Link to="/form/form-B" key="b">
      Form-B
    </Link>,
  ];

  const onToggle = (index: number): void => {
    setIsOpen(prevIsOpen => {
      const newIsOpen = [false, false];
      newIsOpen[index] = !prevIsOpen[index];
      return newIsOpen;
    });
  };
  const downloadOutput = async () => {
    await http
      .get(
        `https://portal-test.forms.gov/agencydemo-dev/form/61d8966635085e13770e2a64/export?format=csv&view=formatted&timezone=America%2FNew_York`,
        {
          headers: {
            'x-token': '3J8m1cZTchgez7uSJwz2r6WfAeCYJb',
          },
          responseType: 'blob',
        }
      )
      .then(response => {
        const time = Math.floor(Date.now() / 1000);
        const fileName = 'formB-submission-data-' + time + '.csv';
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      });

    await http
      .get(
        `https://portal-test.forms.gov/agencydemo-dev/form/61d8966635085e13770e2a5c/export?format=csv&view=formatted&timezone=America%2FNew_York`,
        {
          headers: {
            'x-token': '3J8m1cZTchgez7uSJwz2r6WfAeCYJb',
          },
          responseType: 'blob',
        }
      )
      .then(response => {
        const time = Math.floor(Date.now() / 1000);
        const fileName = 'formA-submission-data-' + time + '.csv';
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      });
  };

  const formsItemsMenu = [
    // <Link to="/" key="home" className={location.pathname === '/' ? 'usa-nav__link usa-current' : 'usa-nav__link'}>
    //   <span>Home</span>
    // </Link>,
    // <button
    //   tabIndex={0}
    //   // className="usa-button usa-button--outline usa-button--inverse usa-button--unstyled"
    //   onClick={() => downloadOutput()}
    //   key="downloadformB"
    // >
    //   <FontAwesomeIcon aria-label="download summary pdf" title="download summary pdf" color="#de241b" size="3x" icon="download" />
    // </button>,
    // <a onClick={() => downloadOutput()} key="downloadform">
    //   <span className="a-link">Download output</span>
    // </a>,
    // <>
    //   <>
    //     <NavDropDownButton
    //       menuId="formsDropDownOne"
    //       onToggle={(): void => {
    //         onToggle(0);
    //       }}
    //       isOpen={isOpen[0]}
    //       label="Forms"
    //       isCurrent={location.pathname === '/form/form-A' || location.pathname === '/form/form-B'}
    //     />
    //     <Menu key="one" items={formsMenuItems} isOpen={isOpen[0]} id="formsDropDownOne" />
    //   </>
    // </>,
    // <>
    //   {' '}
    //   {!props.isAuthenticated ? (
    //     <a href={getLoginUrl()} key="signin" className="usa-nav__link">
    //       <span>Sign in</span>
    //     </a>
    //   ) : (
    //     <a href="/logout" key="signout" className="usa-nav__link">
    //       <span>Sign out</span>
    //     </a>
    //   )}
    // </>,
  ];

  return (
    <>
      <GovBanner aria-label="Official government website" />
      <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`}></div>
      <Header basic={true}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            {/* <Title>
              <Link to="/" key="home">
                <img src="content/images/oes-logo.png" height={62} width={150} alt="OES logo" />
              </Link>
            </Title> */}
            <NavMenuButton onClick={onClick} label="Menu" />
          </div>
          <PrimaryNav className="pb-4" items={formsItemsMenu} mobileExpanded={expanded} onToggleMobileNav={onClick}></PrimaryNav>
        </div>
      </Header>
    </>
  );
};
export default HeaderBar;
