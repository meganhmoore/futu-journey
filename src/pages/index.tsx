// src/pages/index.tsx
import React from 'react';
import { useRouter } from 'next/router';
import SubmitForm from 'components/submit-form';
import LinkedinLogin from 'components/linkedin-login';



const IndexPage: React.FC = () => {
  const router = useRouter()

  return(
    <div>
    <LinkedinLogin />
    <div className="flex justify-center">Or Fill In the Data Manually Here:</div>
    <a className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"href='journeyViz'>See My Journey</a>
    </div>
  );
}

export default IndexPage
