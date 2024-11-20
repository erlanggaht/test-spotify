import { getServerSession } from 'next-auth';
import Home from './home'
import { authOptions } from './api/auth/[...nextauth]/route';
export default async function page() {
  const session = await getServerSession(authOptions)
  return <Home session={session}/>;
}
