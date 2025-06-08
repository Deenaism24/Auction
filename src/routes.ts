export const routes = {
  home: '/',
  auth: '/auth',
  register: '/register',
  favorite: '/favorite',
  openLot: '/lot/:lot?',
  article: '/article/:id?',
  personalAccount: '/profile',
  // Header
  information: '/information',
  // Header anchors
  access: '/information#preferred-access-section',
  about:'/information#about-us-section',
  services: '/information#services-section',
  instructions: '/information#how-to-buy-or-sell-section',

  ANCHOR_PREFERRED_ACCESS: 'preferred-access-section',
  ANCHOR_ABOUT: 'about-section',
  ANCHOR_SERVICES: 'services-section',
  ANCHOR_HOW_TO_BUY_SELL: 'how-to-buy-or-sell-section',

    // Маршрут для страницы со всеми ссылками футера
    footerLinksPage: '/footer-links',

    // !!! NEW: Константы для строковых ID якорей на странице footerLinksPage
    ANCHOR_FOOTER_LINKS_SUPPORT: 'footer-links-support-section',
    ANCHOR_FOOTER_LINKS_CORPORATE: 'footer-links-corporate-section',
    ANCHOR_FOOTER_LINKS_MORE: 'footer-links-more-section',

    // !!! NEW: Маршруты (HashLinks) для ссылок на якоря на странице footerLinksPage (используются в Header)
    ROUTE_TO_FOOTER_LINKS_SUPPORT: '/footer-links#footer-links-support-section',
    ROUTE_TO_FOOTER_LINKS_CORPORATE: '/footer-links#footer-links-corporate-section',
    ROUTE_TO_FOOTER_LINKS_MORE: '/footer-links#footer-links-more-section',

    // Footer Links Structure (used for actual footer rendering and the new page)
    footerLinks: {
      support: [
        { path: '/help-center', text: 'HELP CENTER' },
        { path: '/locations-page', text: 'LOCATIONS' },
        { path: '/download-app-page', text: 'DOWNLOAD THE APP' },
      ],
      corporate: [
        { path: '/press', text: 'PRESS' },
        { path: '/privacy-policy', text: 'PRIVACY POLICY' },
        { path: '/corporate-governance', text: 'CORPORATE GOVERNANCE' },
        { path: '/careers', text: 'CAREERS' },
      ],
      more: [
        { path: '/security', text: 'SECURITY' },
        { path: '/terms-conditions', text: 'TERMS & CONDITIONS' },
        { path: '/conditions-of-business', text: 'CONDITIONS OF BUSINESS' },
        { path: '/modern-slavery-statement', text: 'MODERN SLAVERY STATEMENT' },
      ],
    },
};