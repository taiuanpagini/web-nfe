import React from 'react';
import * as Icon from 'react-feather';

const navigationConfig = [
  {
    id: 'home',
    title: 'Dashboard',
    type: 'item',
    icon: <Icon.Home size={20} />,
    permissions: ['admin'],
    navLink: '/dashboard',
  },
  {
    type: 'groupHeader',
    groupTitle: 'Perfis',
  },
  {
    id: 'users',
    title: 'Usuários',
    type: 'collapse',
    icon: <Icon.User size={20} />,
    children: [
      {
        id: 'view',
        title: 'Novo Usuário',
        type: 'item',
        icon: <Icon.Plus size={12} />,
        permissions: ['admin'],
        navLink: '/usuario',
      },
      {
        id: 'list',
        title: 'Listar Todos',
        type: 'item',
        icon: <Icon.List size={12} />,
        permissions: ['admin'],
        navLink: '/usuarios',
      },
    ],
  },
];

export default navigationConfig;
