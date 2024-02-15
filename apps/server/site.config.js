const envConfig = require('./config/environment');
var packageJson = require('../../package.json');
module.exports = {
  analytics: envConfig.analytics,
  siteMap: {
    theme: 'main',
    maxNavigationLevel: 2,
    appVersion: process.env.VERSION || packageJson.version,
    title: 'QubeJs: Low code platform to meet all your needs',
    errorRedirects: {
      500: '/content/pages/500',
      404: '/content/pages/404',
    },
    globalNavigation: {
      className: 'sq-global-navigation--default sq-global-navigation--blured',
      navPosition: 'sticky',
      rightItems: [
        {
          type: 'LinkButton',
          color: 'none',
          buttonText: '',
          className: 'sq-link--button mr-4',
          iconName: 'email',
          to: '/content/en/contact',
          analytics: {
            click: {
              type: 'event',
              eventName: 'link_click',
              action: 'contact',
              label: 'Contact',
              category: 'Content',
              section: 'Homepage',
            },
          },
        },
        {
          type: 'Button',
          size: 'small',
          buttonText: 'Try Now',
          className: 'sq-link--button mr-4',
          to: '/content/en/qubejs/trynow',
          analytics: {
            click: {
              type: 'event',
              eventName: 'link_click',
              action: 'trynow',
              label: 'Try Now',
              category: 'Content',
              section: 'Homepage',
            },
          },
        },
      ],
      items: [
        {
          title: 'Features',
          href: '/content/en/qubejs/features',
        },
        {
          title: 'Showcase',
          href: '/content/en/qubejs/showcase',
        },
        {
          title: 'Docs',
          href: '/content/en/qubejs/docs',
        },
        {
          title: 'Examples',
          href: '/content/en/qubejs/examples',
        },
      ],
    },
    globalNavigationLoggedIn: {
      className: 'sq-global-navigation--default',
      rightItems: [
        {
          type: 'Button',
          color: 'primary',
          buttonText: 'My Dashboard',
          iconName: 'dashboard',
          iconSize: 'small',
          to: 'dashboard',
        },
      ]
    },
    globalFooter: {
      logo: {
        name: 'logo-muted',
        size: 'logowide',
      },
      classes: {
        item: 'col-xs-6 col-sm-4',
        itemWrapper: 'row',
      },
      contactus: {
        header: 'Contact us',
        info: [
          {
            iconName: 'call',
            buttonText: '+91 97187 17347',
            to: 'tel:+919718717347',
          },
          {
            iconName: 'email',
            buttonText: 'hello@qubejs.com',
            to: 'mailto:hello@qubejs.com',
          },
        ],
      },
      // newsletter: {
      //   header: 'Newsletter',
      //   label: 'Email',
      //   buttonText: 'Subscribe',
      //   api: {
      //     type: 'POST',
      //     url: '/api/v1/contact/newsletter'
      //   },
      //   successMessage: 'You have succesfully subscribed.'
      // },
      socialLinks: {
        header: 'Follow us on',
        links: [
          {
            iconName: 'facebook',
            to: 'https://www.facebook.com/qubejs',
          },
          {
            iconName: 'twitter',
            to: 'https://www.twitter.com/qubejs',
          },
          {
            iconName: 'linkedin',
            to: 'https://www.linkedin.com/qubejs',
          },
          {
            iconName: 'instagram',
            to: 'https://www.instagram.com/qubejs',
          },
          {
            iconName: 'youtube',
            to: 'https://www.youtube.com/qubejs',
          },
        ],
      },
      items: [
        {
          title: 'QubeJs',
          href: '/content/en/qubejs',
          children: [
            {
              title: 'Features',
              href: '/content/en/qubejs/features',
            },
            {
              title: 'Showcase',
              href: '/content/en/qubejs/showcase',
            },
            {
              title: 'Docs',
              href: '/content/en/qubejs/docs',
            },
            {
              title: 'Examples',
              href: '/content/en/qubejs/examples',
            },
          ],
        },
      ],
      items2: [
        {
          title: 'Resources',
          children: [
            {
              title: 'Privacy Policy',
              href: '/content/en/privacypolicy',
            },
            {
              title: 'Cookie Policy',
              href: '/content/en/cookiepolicy',
            },
          ],
        },
      ],

      className: 'sq-footer--light sq-footer--primary',
      copyrights: '© QubeJS 2021, All Rights Reserved',
    },
    logo: {
      name: 'logo-wide',
      className: '',
      size: 'logowide',
      variant: 'primary',
      href: '/content/en/home',
    },
    children: [],
  },
};
