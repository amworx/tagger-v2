import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getBuildings } from 'wasp/client/operations';

const BuildingPage = () => {
  const { data: buildings, isLoading, error } = useQuery(getBuildings);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Buildings</h1>
      <ul className='space-y-2'>
        {buildings.map((building) => (
          <li key={building.id} className='bg-gray-100 p-4 rounded-lg'>
            <div className='font-medium'>{building.name}</div>
            <div className='text-sm text-gray-500'>{building.code}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuildingPage;
