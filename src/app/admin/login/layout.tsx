export const metadata = {
  title: 'Admin Login',
  description: 'Login to access the admin dashboard',
};

// This is a special layout file that completely replaces the root layout
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 