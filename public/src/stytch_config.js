// Initialize Stytch.js with your public token. You can find this in your Stytch dashboard under API Keys.
var STYTCH_PUBLIC_TOKEN = "public-token-test-edc55d05-a146-4a3b-9f73-5d694f983536";
var stytch = Stytch(STYTCH_PUBLIC_TOKEN);
var loginOrSignupViewConfig = {
  emailMagicLinksOptions: {
    loginRedirectURL: "http://localhost:9000/authenticate",
    loginExpirationMinutes: 30,
    signupRedirectURL: "http://localhost:9000/authenticate",
    signupExpirationMinutes: 30,
  },
  oauthOptions: {
    loginRedirectURL: "http://localhost:9000/authenticate",
    signupRedirectURL: "http://localhost:9000/authenticate",
    providers: [
      {
        type: 'google',
        'one_tap': true,
        position: 'embedded',
      },
    ],
  },
  products: [
    'oauth',
    'emailMagicLinks'
  ],
};
stytch.mount({
  elementId: "#stytch-sdk",
  loginOrSignupView: loginOrSignupViewConfig,
});