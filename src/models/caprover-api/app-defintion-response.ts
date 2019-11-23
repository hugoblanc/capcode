interface AppDefinitionResponse  {
    status: number;
    description: string;
    data: AppDefinitionData;
  }
  
  interface AppDefinitionData {
    appDefinitions: AppDefinition[];
    rootDomain: string;
    defaultNginxConfig: string;
  }
  
  interface AppDefinition {
    hasPersistentData: boolean;
    description: string;
    instanceCount: number;
    captainDefinitionRelativeFilePath: string;
    networks: string[];
    envVars: EnvVar[];
    volumes: Volume[];
    ports: any[];
    versions: Version[];
    deployedVersion: number;
    notExposeAsWebApp: boolean;
    customDomain: any[];
    hasDefaultSubDomainSsl: boolean;
    forceSsl: boolean;
    websocketSupport: boolean;
    containerHttpPort: number;
    nodeId: string;
    preDeployFunction: string;
    appName: string;
    isAppBuilding: boolean;
    customNginxConfig?: string;
  }
  
  interface Version {
    version: number;
    timeStamp: string;
    deployedImageName?: string;
    gitHash?: string;
  }
  
  interface Volume {
    containerPath: string;
    hostPath: string;
  }
  
  interface EnvVar {
    key: string;
    value: string;
  }