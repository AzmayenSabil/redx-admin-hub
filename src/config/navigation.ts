export interface NavItem {
  key: string;
  label: string;
  path: string;
  roles: string[];
}

export const navigationItems: NavItem[] = [
  {
    key: 'parcels',
    label: 'Parcels',
    path: '/parcels',
    roles: ['RedX Super Admin', 'RedX Finance Team'],
  },
];
