export interface auth_state {
  token: string | null;
  isAuthenticated: Boolean | null;
  user: any;
  loading: Boolean;
  error: any;
}