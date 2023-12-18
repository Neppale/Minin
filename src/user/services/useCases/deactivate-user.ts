export interface DeactivateUser {
  deactivate(id: number): Promise<void>;
}
