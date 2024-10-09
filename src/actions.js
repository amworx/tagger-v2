import { HttpError } from 'wasp/server'

export const generateOfficeAssetTag = async ({ assetNumber, assetTypeId, buildingId, roomNumber }, context) => {
  if (!context.user) { throw new HttpError(401) };

  if (assetNumber <= 0 || assetNumber > 9999) {
    throw new HttpError(400, 'Invalid asset number.');
  }
  if (roomNumber <= 0 || roomNumber > 999) {
    throw new HttpError(400, 'Invalid room number.');
  }

  const assetType = await context.entities.AssetType.findUnique({
    where: { id: assetTypeId }
  });
  if (!assetType) {
    throw new HttpError(404, 'Asset type not found.');
  }

  const building = await context.entities.Building.findUnique({
    where: { id: buildingId }
  });
  if (!building) {
    throw new HttpError(404, 'Building not found.');
  }

  const tag = `${String(assetNumber).padStart(4, '0')}-${assetType.code}-${building.code}-RM${String(roomNumber).padStart(3, '0')}`;
  return { tag };
}

export const generateEmployeeAssetTag = async ({ assetNumber, assetTypeId, departmentId, employeeId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  if (assetNumber < 0 || assetNumber > 9999) { throw new HttpError(400, 'Invalid asset number') };

  if (employeeId < 0 || employeeId > 999) { throw new HttpError(400, 'Invalid employee ID') };

  const assetType = await context.entities.AssetType.findUnique({
    where: { id: assetTypeId }
  });
  if (!assetType) { throw new HttpError(404, 'Asset type not found') };

  const department = await context.entities.Department.findUnique({
    where: { id: departmentId }
  });
  if (!department) { throw new HttpError(404, 'Department not found') };

  const tag = `${assetNumber.toString().padStart(4, '0')}-${assetType.code}-${department.code}-${employeeId.toString().padStart(3, '0')}`;

  return { tag };
}
