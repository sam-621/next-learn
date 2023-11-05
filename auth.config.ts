import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // this function is executed every time page url match with the paths in the middleware
    // in other words, is going to execute every time user need to be authorized
    // is executed before the accessing page renders
    // petition to `/a` -> middleware -> this authorized function -> ok ? page renders : redirect to /login
    authorized({ auth, request: { nextUrl } }) {
      console.log('Authorization callback is executed')

      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    },
  },
} satisfies NextAuthConfig
