import { HttpError } from 'wasp/server'

export const getAssetTypes = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.AssetType.findMany({
    select: {
      name: true,
      code: true
    }
  });
}

export const getBuildings = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Building.findMany({
    select: {
      name: true,
      code: true
    }
  });
}

export const getDepartments = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Department.findMany({
    select: {
      name: true,
      code: true
    }
  });
}
