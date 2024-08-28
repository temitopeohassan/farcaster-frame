// Import necessary dependencies
import { useEffect, useState } from 'react';
import axios from 'axios';

const fetchCommunityData = async () => {
  try {
    const response = await axios.get('https://api.rounds.wtf/communities');
    return response.data;
  } catch (error) {
    console.error('Error fetching community data:', error);
    return [];
  }
};

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetchCommunityData().then(setCommunities);
  }, []);

  return (
    <div>
      {communities.map((community, index) => (
        <div key={index}>
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
