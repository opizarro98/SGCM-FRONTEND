import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Sistema',
  },
  {
    displayName: 'Página Principal',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Pacientes',
  },
  {
    displayName: 'pacientes',
    iconName: 'user',
    route: '/sistema/persona',
  },
  {
    navCap: 'Atención',
  },
  {
    displayName: 'Citas Médicas',
    iconName: 'rosette',
    route: '/sistema/citas',
  },
    {
    displayName: 'Historia Médica',
    iconName: 'list',
    route: '/sistema/historia',
  },
  {
    navCap: 'CIE 10',
  },
  {
    displayName: 'Diagnostico',
    iconName: 'poker-chip',
    route: '/sistema/diagnostico',
  },
  {
    displayName: 'Categotia',
    iconName: 'category',
    route: '/sistema/categoria',
  },


  /*{
    navCap: 'Ui Components',
  },
  {
    displayName: 'Badge',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    route: '/ui-components/tooltips',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },*/
];
