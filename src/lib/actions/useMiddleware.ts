import { ROLES } from "./roles";

const { ADMINISTRATOR, RECEIVING, RELEASING, SECTOR } = ROLES;

const checkRole = (userRole: any, allowedRoles: any) => {
  return allowedRoles.includes(userRole);
};

const getDefaultRoute = (userRole: any) => {
  switch (userRole) {
    case ADMINISTRATOR:
      return "/application";
    case RECEIVING:
      return "/application";
    case RELEASING:
      return "/application";
    default:
      return "/application";
  }
};

export const useAuthMiddleware = (allowedRoles: any, currentUser: any) => {
  // if allowed return true else return default route
  const allowed = checkRole(currentUser.roles.role, allowedRoles);
  const defaultRoute = getDefaultRoute(currentUser.roles.role);
  return {
    allowed,
    defaultRoute,
  };
};
