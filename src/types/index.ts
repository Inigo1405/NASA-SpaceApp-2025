export interface NavItem {
  path: string;
  label: string;
  icon?: string;
}

export interface Planet {
  name: string;
  status: string;
  distance: string;
  type: string;
  x: number;
  y: number;
  id: number;
  // Extended properties for detailed view
  discoveryYear?: number;
  discoveryMethod?: string;
  orbitalPeriod?: string;
  radius?: string;
  mass?: string;
  temperature?: string;
  starType?: string;
  habitabilityIndex?: number;
  atmosphere?: string;
  description?: string;
  features?: string[];
}