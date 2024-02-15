import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { utils } from '@qubejs/web-react';

class TopNavigation extends Component {
  props: any;
  static propTypes: any;
  constructor(props: any) {
    super(props);
  }

  render() {
    const {
      children,
      pageData = {},
      data = {},
      store,
      onAnalytics,
    }: any = this.props;
    const { GlobalNavigation } = utils.storage.components.get();
    const { theme: pageTheme } = pageData;
    const { metaData = {}, siteMap = {} } = data;
    const { theme: siteMapTheme } = siteMap?.siteMap || {};
    const props = { ...siteMap?.siteMap?.globalNavigation };
    return (
      <div
        className={`sq-template sq-template-content sq-content-page sq-content-page--header-footer-body ${
          pageData.wrapperClassName || ''
        }`}
      >
        {siteMap && (
          <header>
            <GlobalNavigation
              logo={siteMap.siteMap.logo}
              items={metaData.navigation}
              {...props}
              onAnalytics={onAnalytics}
            />
          </header>
        )}
        <div
          className={`sq-content-page__body-wrapper ${
            pageData.bodyClassName || ''
          }`}
        >
          {children}
        </div>
      </div>
    );
  }
}

TopNavigation.propTypes = {
  children: PropTypes.node,
  pageData: PropTypes.object,
  store: PropTypes.object,
  onAnalytics: PropTypes.func,
  data: PropTypes.object,
};

export default TopNavigation;
