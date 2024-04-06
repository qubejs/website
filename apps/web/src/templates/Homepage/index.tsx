import React from 'react';
import PropTypes from 'prop-types';
import { utils } from '@qubejs/web-react';
import './homepage.scss';

import BaseContainer from '../../containers/BaseContainer';

class Homepage extends BaseContainer {
  constructor(props: any) {
    super(props);
    this.state = {
      qs: {},
    };
  }
  componentDidMount() {
    const params = utils.queryString.query.get();
    this.setState({
      qs: params,
    });
  }

  render() {
    const { GlobalNavigation, Footer } = utils.storage.components.get();
    const { children, pageData = {}, data = {}, userData } = this.props;
    const { pageData: dynamicSiteMap } = userData.dynamicSiteMap || {};
      console.log(userData, dynamicSiteMap);
    let { siteMap = {} } = data;
    siteMap = dynamicSiteMap?.siteMap ? dynamicSiteMap : siteMap?.siteMap
      ? siteMap
      : utils.win.getWindow().APP_CONFIG?.siteMap;
    let props = {};
    props = { ...siteMap?.siteMap?.globalNavigation };
    return (
      <div
        className={`sq-content-page homepage sq-content-page--header-footer-body ${
          pageData.templateClassName || ''
        }`}
      >
        
        <header>
          <GlobalNavigation logo={siteMap.siteMap.logo} {...props} />
        </header>
        <div className={'sq-content-page__body-wrapper '}>{children}</div>
        <Footer logo={siteMap.siteMap.logo} items={siteMap.siteMap.globalNavigation} {...siteMap.siteMap.globalFooter} />
      </div>
    );
  }
}

Homepage.propTypes = {
  children: PropTypes.node,
  pageData: PropTypes.object,
  userStore: PropTypes.object,
  data: PropTypes.object,
};

export default Homepage;
