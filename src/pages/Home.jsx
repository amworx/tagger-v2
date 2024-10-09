import React, { useState } from 'react';
import { useAction } from 'wasp/client/operations';
import { generateOfficeAssetTag, generateEmployeeAssetTag } from 'wasp/client/operations';

const HomePage = () => {
  const [assetNumber, setAssetNumber] = useState('');
  const [assetTypeId, setAssetTypeId] = useState('');
  const [buildingId, setBuildingId] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [generatedTag, setGeneratedTag] = useState('');

  const generateOfficeTag = useAction(generateOfficeAssetTag);
  const generateEmployeeTag = useAction(generateEmployeeAssetTag);

  const handleGenerateOfficeTag = async () => {
    try {
      const { tag } = await generateOfficeTag({ assetNumber, assetTypeId, buildingId, roomNumber });
      setGeneratedTag(tag);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateEmployeeTag = async () => {
    try {
      const { tag } = await generateEmployeeTag({ assetNumber, assetTypeId, departmentId, employeeId });
      setGeneratedTag(tag);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Tag Generator</h1>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Asset Number"
          value={assetNumber}
          onChange={(e) => setAssetNumber(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Asset Type ID"
          value={assetTypeId}
          onChange={(e) => setAssetTypeId(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Building ID"
          value={buildingId}
          onChange={(e) => setBuildingId(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          onClick={handleGenerateOfficeTag}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Office Asset Tag
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Department ID"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          onClick={handleGenerateEmployeeTag}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Employee Asset Tag
        </button>
      </div>
      {generatedTag && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold">Generated Tag:</h2>
          <p>{generatedTag}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
