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
}