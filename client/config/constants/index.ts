export const ironOptions = {
    cookieName: 'siwe',
    password: process.env.IRON_SESSION_PASSWRD,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }


export const signMessage ={
  statement: 'Sign in with Your Wallet to the app.',
  version: '1',
}