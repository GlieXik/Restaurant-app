import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      return token?.role === "admin" || token?.role === "cooker";
    },
  },
});

export const config = { matcher: ["/admin/:path*"] };
