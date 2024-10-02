export type Restriction = "nexplore" | "sunlife";

export enum DemoType {
  mobile = "Mobile App",
  web = "Web App",
  ux = "Ux Ui Design ( video demo )",
}
export type DemoTypeObj = Record<
  keyof typeof DemoType,
  Record<string, string[]>
>;

export interface DemoVideo {
  title: string;
  video: string;
  content: string;
}
export interface Bindings {
  DATABASE_URL: string;
  USERNAME: string;
  PASSWORD: string;
}

export interface State {
  role?: string;
}
