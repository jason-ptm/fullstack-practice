import { SxProps } from '@mui/material';

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name: string, additionalStyles?: SxProps) {
  const names = name.split(' ');
  let children = '';

  if (names.length > 1)
    children = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  else children = `${name.split(' ')[0][0]}`;

  return {
    sx: {
      bgcolor: stringToColor(name),
      ...additionalStyles,
    },
    children,
  };
}
