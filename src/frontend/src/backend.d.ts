import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ContactSubmission {
    projectType: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface backendInterface {
    deleteSubmission(email: string, timestamp: Time): Promise<void>;
    getAllSubmissions(): Promise<Array<ContactSubmission>>;
    getSubmissionsByEmail(email: string): Promise<Array<ContactSubmission>>;
    getSubmissionsByProjectType(projectType: string): Promise<Array<ContactSubmission>>;
    submitContact(name: string, email: string, phone: string, projectType: string, message: string): Promise<void>;
}
