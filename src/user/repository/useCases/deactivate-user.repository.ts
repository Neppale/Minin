export interface DeactivateUserRepository {
  deactivate(id: number): Promise<void>;
}
