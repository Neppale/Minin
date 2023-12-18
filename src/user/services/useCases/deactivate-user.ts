export interface DeactivateUser {
  deactivate(id: number, authorization: string): Promise<void>;
}
