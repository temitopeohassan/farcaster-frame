"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Community interface
interface Community {
  id: string;
  name: string;
  description: string;
  // Add any other fields you expect from the API
}

const fetchCommunityData = async (): Promise<Community[]> => {
  try {
    const response = await axios.get('https://api.rounds.wtf/communities');
    return response.data;
  } catch (error) {
    console.error('Error fetching community data:', error);
    return [];
  }
};

const CommunityList = () => {
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    fetchCommunityData().then(setCommunities);
  }, []);

  return (
    <div>
      {communities.map((community) => (
        <div key={community.id}>
          <h3>{community.name}</h3>
          <p>{community.description}</p>
        </div>
      ))}
    </div>
  );
};

const Page = () => {
  return (
    <div>
      <h1>Farcaster Community Frame</h1>
      <CommunityList />
    </div>
  );
};

export default Page;
