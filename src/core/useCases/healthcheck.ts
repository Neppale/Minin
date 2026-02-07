import { readFileSync } from "fs";
import { join } from "path";

interface PackageJson {
  version: string;
}

export class Healthcheck {
  private static instance: Healthcheck;
  private version: string;

  private constructor() {
    const packageJsonPath = join(process.cwd(), "package.json");
    const packageJsonContent = readFileSync(packageJsonPath, "utf-8");
    const packageJson: PackageJson = JSON.parse(packageJsonContent);
    this.version = packageJson.version;
  }

  public static getInstance(): Healthcheck {
    if (!Healthcheck.instance) {
      Healthcheck.instance = new Healthcheck();
    }
    return Healthcheck.instance;
  }

  public getVersion(): { version: string } {
    return { version: this.version };
  }
}
