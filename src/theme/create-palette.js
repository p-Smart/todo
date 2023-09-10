
export const primary = {
  lightest: '#f9fafb',
  light: '#eaedfe',
  main: '#3F5BF6',
  dark: '',
  darkest: ''
}

export const secondary = {
  lightest: '',
  light: '',
  main: '#FFCF2D',
  dark: '',
  darkest: ''
}

export const neutral = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927'
}

export const divider = '#D5E6FB'

export const grey = {
  lightest: '#F6F6F6',
  light: '#D2D2D2',
  main: '#7F7F7F',
  dark: '#464646',
  darkest: '#212121',
}

export const background = "#f7f8ff"


export const createPalette = () => {

  return {
      primary,
      secondary,
      neutral,
      divider,
      grey,
      background,
      white: '#fff',
  }
}