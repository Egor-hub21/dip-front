export interface RegimeFileRequest {
    file: File;
    timestamp: Date;
}
  
export interface RegimeFileResponse {
    id: string;
    name: string;
    timestamp: string;
}