import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      console.log(token?.role === "admin" || token?.role === "cooker");
      return token?.role === "admin" || token?.role === "cooker";
    },
  },
});

export const config = { matcher: ["/admin/:path*"] };
