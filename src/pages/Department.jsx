import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getDepartments } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const DepartmentPage = () => {
  const { data: departments, isLoading, error } = useQuery(getDepartments);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <div className="grid grid-cols-1 gap-4">
        {departments.map((department) => (
          <div key={department.code} className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold">{department.name}</h2>
            <p className="text-gray-600">Code: {department.code}</p>
            <Link to={`/departments/${department.code}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentPage;
