import React from "react";
import { HeadProvider } from "react-head";

const Privacy = () => {
  return (
    <section className="px-5">
      <HeadProvider>
        <title>FinEase | Privacy Policy</title>
      </HeadProvider>

      <h1 className="title text-center">Privacy Policy</h1>

      <div className="mt-6 max-w-3xl mx-auto space-y-4 text-lg">
        <p>
          At FinEase, your privacy is our top priority. We collect only the necessary information to provide you with the best personal finance experience.
        </p>
        <p>
          All your financial data is stored securely and will never be shared with third parties without your consent.
        </p>
        <p>
          We use cookies and analytics tools solely to improve the platform and provide better services.
        </p>
        <p>
          By using FinEase, you agree to our terms and policies. We recommend reviewing this page periodically for updates.
        </p>
      </div>
    </section>
  );
};

export default Privacy;
