import { SignIn } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SignInPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <SignIn />
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;