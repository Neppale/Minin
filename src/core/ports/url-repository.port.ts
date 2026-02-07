import { Url } from "../entities/url.entity";

export interface UrlRepositoryPort {
    create(url: Url): Promise<Url>;
    load(id: string): Promise<Url | null>;
}