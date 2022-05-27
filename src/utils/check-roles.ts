const userHasRequiredRole = (
  userRoles: string[],
  requiredRoles: string[],
): boolean => {
  return requiredRoles.some(role => userRoles.includes(role));
};

export const checkRoles = (requiredRoles: string[]): boolean => {
  const user = localStorage.getItem('user');

  if (
    user &&
    requiredRoles.length > 0 &&
    !userHasRequiredRole(JSON.parse(user).roles, requiredRoles)
  )
    return false;

  return true;
};
