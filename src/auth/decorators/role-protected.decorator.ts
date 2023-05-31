import { SetMetadata } from '@nestjs/common';
import { ValidResources } from '../interfaces/valid-roles';
export const META_RESOURCES = 'resources'
// insert valid roles in metadata for acces in guards with reflector
export const RoleProtected = (resource: ValidResources) => {
    return SetMetadata(META_RESOURCES, resource)
};
