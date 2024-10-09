import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getAssetTypes } from 'wasp/client/operations';

const AssetTypePage = () => {
  const { data: assetTypes, isLoading, error } = useQuery(getAssetTypes);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Types</h1>
      <ul className="list-disc pl-5">
        {assetTypes.map((assetType) => (
          <li key={assetType.code} className="mb-2">
            <span className="font-semibold">{assetType.name}</span> - {assetType.code}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssetTypePage;
