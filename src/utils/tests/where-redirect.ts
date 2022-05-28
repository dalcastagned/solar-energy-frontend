export function whereRedirect(isPrivate: boolean): string {
  if (isPrivate) return '/';
  return '/dashboard';
}
