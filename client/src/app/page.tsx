// import Dashboard from '@/app/dashboard/page'

// export default function Home() {
//   return <Dashboard/>;
// }
 
import { redirect } from "next/navigation";
export default function Home() { 
  // Redirect homepage to login 
  redirect("/login"); 
}