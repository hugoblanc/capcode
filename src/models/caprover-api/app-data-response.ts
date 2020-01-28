interface AppDataResponse {
    status: number;
    description: string;
    data: AppData;
  }
  
  interface AppData {
    isAppBuilding: boolean;
    logs: Logs;
    isBuildFailed: boolean;
  }
  
  interface Logs {
    lines: string[];
    firstLineNumber: number;
  }