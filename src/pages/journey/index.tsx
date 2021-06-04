import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';

const JourneyPage: NextPage = () => {
    const router = useRouter();
    const code = router.query.code;
    const state = router.query.state;

    const getStaticProps = async function() {
        const url = 'https://www.linkedin.com/oauth/v2/accessToken';
        const dataSubmit = {'grant_type': "authorization_code", 'code': code, 'state': state, 'redirect_uri': process.env.NEXT_PUBLIC_REDIRECT, 
        'client_id': process.env.NEXT_PUBLIC_CLIENT_ID, 'client_secret': process.env.NEXT_PUBLIC_CLIENT_SECRET}
        const request_string = `${url}?grant_type=authorization_code&code=${code}&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fjourney`

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': 'http://localhost:3001/journey',
            },
            body: JSON.stringify(dataSubmit)
        });

        // const res = await fetch(request_string, {
        //     method: 'POST'
        // });

        //     mode: 'cors', // no-cors, *cors, same-origin
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     //credentials: 'same-origin', // include, *same-origin, omit
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     redirect: 'follow', // manual, *follow, error
        //     referrerPolicy: 'no-referrer',
        const data = await res.json();
      
        if (!data) {
          return {
            notFound: true,
          }
        }
        
        return {
          props: { data }, // will be passed to the page component as props
        }
      }
    
    getStaticProps().then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
      });

    return (
        <div>
            <h1>{code}</h1>
            <h2>{state}</h2>
        </div>
    );
};

export default JourneyPage;