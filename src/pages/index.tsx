// src/pages/index.tsx
import React from 'react';
import { useRouter } from 'next/router';
import SubmitForm from 'components/submit-form';
import LinkedinLogin from 'components/linkedin-login';



const IndexPage: React.FC = () => {
  const router = useRouter()

  return(
    <LinkedinLogin />
  );
}

export default IndexPage
