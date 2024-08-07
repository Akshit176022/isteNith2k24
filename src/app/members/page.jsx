"use client";
import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, useQuery, gql, ApolloProvider } from '@apollo/client';
import { FaInstagram } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import Link from 'next/link';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache(),
  // credentials: 'include'
});

const GET_MEMBERS = gql`
  {
    members {
      name
      section
      post
      linkedin
      instagram
      img
      rollNumber
      branch
      location
      about
    }
  }
`;

const Team = () => {
  const [initialYear, setYear] = useState("finalyear");

  const { loading, error, data } = useQuery(GET_MEMBERS, {
    client,
    fetchPolicy: 'cache-first',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredProfiles = data.members.filter(profile => profile.section === initialYear);

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">

<div className=' bg-[#1E1E1E] lg:w-full  lg:fixed top-0 z-50 '>
        <div className="lg:mx-10 lg:pt-12 md:mx-60 pt-2 ml-24 text-4xl md:text-6xl lg:px-4 font-r2">ISTE NITH</div>
        <div className="border-t-2 w-3/4 md:mx-24 lg:w-11/12 ml-10 border-white lg:my-4 lg:mb-0 -mb-40 lg:ml-10"></div>
      </div>

      <div className='flex flex-col-reverse md:flex-col-reverse mt-16 pt-24 sm:flex-col lg:flex-row'>
        <div className="grid md:1/2  w-3/4 lg:w-3/4 ml-16 md:mx-28 lg:mx-0 lg:ml-10 md:grid-cols-2 lg:grid-cols-4 ">
          {filteredProfiles.map((details, index) => (
            <div className="w-full " key={index}>
              <div className="flex flex-col relative">
                <img
                  src={details.img}
                  alt=""
                  className="h-64 w-64 lg:ml-0  drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                />
                <div className="bg-[#1E1E1E] lg:absolute absolute ml-40  bottom-2 lg:mr-0 lg:mt-0  lg:bottom-2  lg:right-6 flex  text-white opacity-80 hover:opacity-100 transition-opacity duration-300">
                  <Link href={details.instagram} className="flex items-center justify-center ml-2 h-8 w-8">
                    <FaInstagram />
                  </Link>
                  <Link href={details.linkedin} className="flex items-center justify-center mr-2  h-8 w-8">
                    <TiSocialLinkedin />
                  </Link>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className="mt-2 w-4/5">
                  <h1 className="font-f2 ">{details.name}</h1>
                  <p className="font-f2 text-white font-bold">{details.post}</p>
                  <p className="font-f2 tracking-expanded ">{details.branch}</p>
                  <p className="font-f2 tracking-expanded  mb-8 lg:mb-4">{details.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex lg:flex-col flex-col lg:fixed lg:right-16  lg:mt-0 mt-2 ml-24 '>
          <div className='text-3xl md:text-4xl lg:text-7xl font-r2 md:mx-48 lg:mx-0 flex flex-row lg:flex-col '>
            <div>{initialYear.toUpperCase().substring(0, 5)}</div>
            <div>{initialYear.toUpperCase().substring(5, 11)}</div>
          </div>
<div className='flex flex-col lg:flex-col md:flex-col w-full   '>
            
<div className="border-t-2 border-white lg:mt-80 lg:w-full w-3/4 -ml-6 lg:mx-0 md:mx-12 lg:ml-0 lg:mr-4"></div>

          <div className="text-1xl md:text-2xl lg:text-2xl md:mx-52 lg:mx-0 mt-2 text-slate-300 ml-10 lg:ml-0  font- hover:brightness-150">
            <button onClick={() => setYear('finalyear')}>FINAL YEAR</button>
          </div>
          <div className="text-1xl md:text-2xl lg:text-2xl  lg:mx-0  md:mx-52 mt-0 lg:mb-1 ml-10 lg:ml-0  text-slate-300 font-sans hover:brightness-150">
            <button onClick={() => setYear('Thirdyear')}>THIRD YEAR</button>
          </div>
          <div className="text-1xl md:text-2xl lg:text-2xl lg:mx-0 md:mx-52 lg:mb-1 text-slate-300 font-sans ml-10 lg:ml-0 hover:brightness-150">
            <button onClick={() => setYear('secondyear')}>SECOND YEAR</button>
          </div>
          <div className="text-1xl md:text-2xl lg:text-2xl lg:mx-0 md:mx-52 lg:mb-1 text-slate-300 font-sans ml-10 lg:ml-0 mb-4 hover:brightness-150">
            <button onClick={() => setYear('firstyear')}>FIRST YEAR</button>
          </div>

</div>
        </div>
      </div>
    </div>
  );
};

const TeamWithApollo = () => (
  <ApolloProvider client={client}>
    <Team />
  </ApolloProvider>
);

export default TeamWithApollo;
