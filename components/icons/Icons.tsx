import React from 'react';

export type IconProps = { className?: string };

export const CubeIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
));

export const CurrencyDollarIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m0-10a9 9 0 110 18 9 9 0 010-18z" />
  </svg>
));

export const CreditCardIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
));

export const BanknotesIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125-1.125h-15c-.621 0-1.125-.504-1.125-1.125v-9.75c0-.621.504-1.125 1.125-1.125h1.5" />
  </svg>
));

export const PuzzlePieceIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v.03c0 .678-.73 1.17-1.606 1.17h-.534c-.876 0-1.606-.492-1.606-1.17v-.03c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875S5.25 3.09 5.25 4.125c0 .369.128.713.349 1.003.215.283.401.604.401.959v12.03c0 .355-.186.676-.401-.959-.221.29-.349-.634-.349-1.003 0 1.036 1.007 1.875 2.25 1.875s2.25-.84 2.25-1.875c0-.369-.128-.713-.349-1.003-.215-.283-.401-.604-.401-.959v-.03c0-.678.73-1.17 1.606-1.17h.534c.876 0 1.606.492 1.606 1.17v.03c0 .355-.186.676-.401-.959-.221.29-.349-.634-.349-1.003 0 1.036 1.007 1.875 2.25 1.875s2.25-.84 2.25-1.875c0-.369-.128-.713-.349-1.003-.215-.283-.401-.604-.401-.959V6.087z" />
  </svg>
));

export const ScaleIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.036.243c-2.132 0-4.14-.354-6.044-.962l-2.62-1.072M5.25 4.97c-1.01.143-2.01.317-3 .52m3-.52l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.036.243c2.132 0 4.14-.354 6.044-.962l2.62-1.072" />
    </svg>
));


export const CheckCircleIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));

export const XCircleIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
));

export const ShieldCheckIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.016h-.008v-.016z" />
  </svg>
));

export const StarIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
));

export const ChatBubbleLeftRightIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.372c-1.034.103-1.933-.417-2.316-1.294l-.243-.518a11.998 11.998 0 00-3.434-.518c-1.171 0-2.305.289-3.344.822l-.243.162a2.25 2.25 0 01-2.316-1.294l-3.722-.372c-1.134-.1-1.98-.9-1.98-2.193v-4.286c0-.97.616-1.813 1.5-2.097" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25a2.25 2.25 0 00-2.25 2.25v2.25a2.25 2.25 0 002.25 2.25zM12 2.25a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25zM12 18a2.25 2.25 0 00-2.25 2.25V22.5a2.25 2.25 0 002.25 2.25zM12 18a2.25 2.25 0 012.25 2.25V22.5a2.25 2.25 0 01-2.25 2.25zM6 18a2.25 2.25 0 00-2.25 2.25v2.25A2.25 2.25 0 006 22.5zM6 18a2.25 2.25 0 012.25 2.25v2.25A2.25 2.25 0 016 22.5zM18 18a2.25 2.25 0 00-2.25 2.25v2.25a2.25 2.25 0 002.25 2.25zM18 18a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25z" />
  </svg>
));


export const PaperAirplaneIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
));

export const XMarkIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
));

export const ArrowPathIcon = React.memo(({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l3.181-3.183a8.25 8.25 0 00-11.664 0l3.181 3.183z" />
  </svg>
));

export const KeyIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
));

export const UserIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
));

export const ServerIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.6H8.25a3.375 3.375 0 00-3.285 2.6l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zM12 15h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zM9.75 15h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zM7.5 15h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008z" />
    </svg>
));

export const MenuIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
));

export const ExclamationTriangleIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
));

export const WalletIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 3V9M3 12V9m0 0a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 9m-18 0v-.75A2.25 2.25 0 015.25 6h13.5A2.25 2.25 0 0121 8.25v.75" />
    </svg>
));

export const ChartBarSquareIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V5.75A2.25 2.25 0 0018 3.5H6A2.25 2.25 0 003.75 5.75v12.5A2.25 2.25 0 006 20.25z" />
    </svg>
));

export const TableCellsIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125V6.375m19.5 0v12A1.125 1.125 0 0119.5 19.5m0-13.125a1.125 1.125 0 00-1.125-1.125H5.625m13.875 0a1.125 1.125 0 011.125 1.125m-19.5 0a1.125 1.125 0 001.125 1.125h17.25m-17.25 0h.008v.008H4.5v-.008zm0 4.5h.008v.008H4.5v-.008zm0 4.5h.008v.008H4.5v-.008zm4.5-9h.008v.008H9v-.008zm0 4.5h.008v.008H9v-.008zm0 4.5h.008v.008H9v-.008zm4.5-9h.008v.008H13.5v-.008zm0 4.5h.008v.008H13.5v-.008zm0 4.5h.008v.008H13.5v-.008zm4.5-9h.008v.008H18v-.008zm0 4.5h.008v.008H18v-.008zm0 4.5h.008v.008H18v-.008z" />
    </svg>
));

export const LockClosedIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
));

export const CalculatorIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zM4.5 3.75v16.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V3.75m-15 0h15M4.5 3.75a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25m-15 0h15" />
    </svg>
));

export const DevicePhoneMobileIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75A2.25 2.25 0 0015.75 1.5h-2.25m-3 0h3m-3 18h3" />
    </svg>
));

export const PhotoIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm16.5-19.5h-16.5A2.25 2.25 0 002.25 4.5v15A2.25 2.25 0 004.5 21.75h16.5A2.25 2.25 0 0023.25 19.5v-15A2.25 2.25 0 0021 2.25z" />
    </svg>
));

export const PiggyBankIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5zM2.25 12.75a7.5 7.5 0 0015 0v-3a7.5 7.5 0 00-15 0v3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75v3.625c0 1.036.84 1.875 1.875 1.875h1.348c.118 0 .235.018.35.053a4.5 4.5 0 012.83 2.83c.125.43.275.85.45 1.253m0-15.126a4.5 4.5 0 00-2.83-2.83c-.115-.035-.232-.053-.35-.053H4.125A1.875 1.875 0 002.25 9.125v3.625" />
    </svg>
));

export const ClipboardDocumentListIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75c0-.231-.035-.454-.1-.664M6.75 7.5H18a2.25 2.25 0 012.25 2.25v9.75a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V9.75A2.25 2.25 0 016.75 7.5z" />
    </svg>
));

export const ChatBubbleBottomCenterTextIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.544-.405 1.499 1.499 0 01-.437-.695 18.683 18.683 0 01-3.483-.352.375.375 0 01-.375-.375V12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
));

export const DocumentTextIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
));

export const CubeTransparentIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
));

export const BoltIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
));

export const CameraIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
));

export const FireIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c0 .346-.013.69-.036 1.031a5.963 5.963 0 00-1.9-3.543m-1.228-2.56C6.446 6.095 4.5 8.87 4.5 12.75a8.25 8.25 0 0015 0c0-4.505-1.946-7.225-4.272-8.995a5.963 5.963 0 00-1.9-1.228z" />
    </svg>
));

export const CpuChipIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 16.5v-1.5m3.75-12H21m-18 0h1.5M12 4.5V3m0 18v-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 6.75a3 3 0 00-3-3H9a3 3 0 00-3 3v10.5a3 3 0 003 3h3a3 3 0 003-3V6.75z" />
    </svg>
));

export const PhoneIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
    </svg>
));

export const QrCodeIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5A.75.75 0 014.5 3.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 10.5A.75.75 0 014.5 9.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 16.5A.75.75 0 014.5 15.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 4.5A.75.75 0 0110.5 3.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 10.5A.75.75 0 0110.5 9.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 16.5A.75.75 0 0110.5 15.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 4.5A.75.75 0 0116.5 3.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5A.75.75 0 0116.5 9.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 16.5A.75.75 0 0116.5 15.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5z" />
    </svg>
));

export const BookOpenIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
));

export const VideoCameraIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
    </svg>
));

export const LightBulbIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a14.994 14.994 0 01-5.25 0M12 3.75a8.963 8.963 0 016.25 2.625m-12.5 0A8.963 8.963 0 0112 3.75m0 14.25V18m0-14.25a8.963 8.963 0 00-6.25 2.625m12.5 0a8.963 8.963 0 00-12.5 0" />
    </svg>
));

export const ChevronDownIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
));

export const NewspaperIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H12v-3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 21a.75.75 0 01-.75-.75v-8.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v8.25a.75.75 0 01-.75.75h-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.25c0-3.351 3.28-6.096 7.332-6.096s7.332 2.745 7.332 6.096h1.125c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H4.875c-.621 0-1.125.504-1.125 1.125v6.75c0 .621.504 1.125 1.125 1.125h1.125z" />
    </svg>
));

export const Squares2X2Icon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6A2.25 2.25 0 0115.75 3.75h2.25A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75A2.25 2.25 0 0115.75 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
));

export const HomeIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.954 8.955M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
));

export const InformationCircleIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
));

export const ChevronDoubleRightIcon = React.memo(({ className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    </svg>
));

export const TwitterIcon = React.memo(({ className }: IconProps) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
));

export const YouTubeIcon = React.memo(({ className }: IconProps) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.73,18.78 17.93,18.84C17.13,18.91 16.44,18.94 15.84,18.94L15,19C12.81,19 11.2,18.84 10.17,18.56C9.27,18.31 8.69,17.73 8.44,16.83C8.31,16.36 8.22,15.73 8.16,14.93C8.09,14.13 8.06,13.44 8.06,12.84L8,12C8,9.81 8.16,8.2 8.44,7.17C8.69,6.27 9.27,5.69 10.17,5.44C11.2,5.16 12.81,5 15,5L15.84,5.06C16.44,5.06 17.13,5.09 17.93,5.16C18.73,5.22 19.36,5.31 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" /></svg>
));

export const DiscordIcon = React.memo(({ className }: IconProps) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M15.25,8.04A1.92,1.92,0,0,0,13.33,6.12A1.92,1.92,0,0,0,11.41,8.04A1.92,1.92,0,0,0,13.33,9.96A1.92,1.92,0,0,0,15.25,8.04M8.67,6.12A1.92,1.92,0,0,0,6.75,8.04A1.92,1.92,0,0,0,8.67,9.96A1.92,1.92,0,0,0,10.59,8.04A1.92,1.92,0,0,0,8.67,6.12M20,2H4A2,2,0,0,0,2,4V18.5A1.5,1.5,0,0,0,3.5,20H17.5L22,15.5V4A2,2,0,0,0,20,2M16.14,13.43C15.3,13.8,14.4,14.08,13.5,14.28C13.25,14.82,12.91,15.34,12.5,15.8C11.5,15.2,10.5,15.2,9.5,15.8C9.09,15.34,8.75,14.82,8.5,14.28C7.6,14.08,6.7,13.8,5.86,13.43C5.78,12.84,5.78,12.24,5.84,11.66C6.88,11.13,7.85,10.7,8.75,10.36C8.5,9.82,8.25,9.3,8.09,8.78C8.67,8.56,9.25,8.39,9.79,8.27C10.27,8.8,10.82,9.3,11.41,9.75C11.75,9.5,12,9.23,12.24,8.96C12.5,8.7,12.75,8.44,13,8.18C13.42,8.5,13.85,8.79,14.25,9.07C14.77,8.6,15.29,8.12,15.75,7.6C16.5,8.03,17.2,8.5,17.84,9C18,9.55,18.12,10.11,18.16,10.66C17.2,11.08,16.22,11.5,15.25,11.9C15.5,12.42,15.75,12.95,15.91,13.46C16,13.45,16.08,13.44,16.14,13.43Z" /></svg>
));

export const InstagramIcon = React.memo(({ className }: IconProps) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>
));

export const LinkedInIcon = React.memo(({ className }: IconProps) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
));

export const TelegramIcon = React.memo(({ className }: IconProps) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M9.78,18.65L10.26,14.21L18.73,7.45C19.29,6.96 18.8,6.04 18.17,6.32L5.4,12.3C4.6,12.64 4.6,13.68 5.44,13.96L8.46,15.05L16.29,9.45C16.63,9.18 16.96,9.44 16.71,9.7L10.26,16.4L9.78,18.65C9.5,19.55 10.35,19.79 10.72,19.38L12.5,17.3L15.42,19.68C16.14,20.14 17.07,19.73 17.18,18.85L19.41,8.05C19.57,6.86 18.44,6.07 17.5,6.54L2.83,12.84C1.65,13.34 1.6,14.83 2.76,15.42L5.7,16.85L7.97,19.88C8.31,20.44 8.97,20.61 9.49,20.27L15.42,16.03L18.3,18.9C18.78,19.31 19.5,19.06 19.68,18.42L21.96,8.54C22.25,7.24 20.94,6.07 19.69,6.5L9.78,18.65Z" /></svg>
));

export const WhatsappIcon = React.memo(({ className }: IconProps) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M12,2A10,10 0 0,0 2,12C2,14.03 2.7,15.85 3.89,17.26L2.6,21.4L6.87,20.13C8.26,21.31 10.07,22 12,22H12.03C17.55,22 22,17.5 22,12C22,6.5 17.5,2 12,2M12,4C16.42,4 20,7.58 20,12C20,14.09 19.16,15.96 17.81,17.31L17.2,17.9L17.54,19.8L19.4,20.2L17.5,18.46L16.89,18.87C15.54,19.84 13.8,20 12,20H11.97C8.21,20 5.12,17.22 4.38,13.78L4.29,13.3L4.14,12.8C4,12.27 4,11.73 4,11.97V12C4,7.58 7.58,4 12,4M8.13,7.27C7.96,7.27 7.78,7.31 7.63,7.45C7.47,7.59 7.04,8.04 7.04,8.96C7.04,9.88 7.63,10.76 7.76,10.94C7.89,11.12 9.4,13.62 11.83,14.59C13.82,15.37 14.3,15.17 14.65,15.12C15.2,15.03 15.96,14.43 16.16,13.86C16.35,13.28 16.35,12.8 16.3,12.67C16.25,12.54 16.12,12.48 15.92,12.37C15.71,12.27 14.45,11.66 14.22,11.56C14,11.47 13.85,11.42 13.71,11.66C13.56,11.9 13.08,12.48 12.93,12.67C12.78,12.85 12.63,12.88 12.43,12.78C12.24,12.68 11.44,12.42 10.45,11.59C9.69,10.96 9.19,10.16 9.07,9.94C8.94,9.72 9.07,9.6 9.18,9.48C9.28,9.38 9.4,9.26 9.51,9.13C9.61,9 9.65,8.9 9.74,8.72C9.82,8.54 9.78,8.4 9.73,8.27C9.68,8.13 9.21,6.94 9,6.47C8.78,6 8.58,5.97 8.43,5.97L8.13,5.97V7.27Z" /></svg>
));