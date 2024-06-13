import dotenv from 'dotenv';

dotenv.config();

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `./public_html/themes/${process.env.WP_DEFAULT_THEME}/*.{php,html}`, 
    `./public_html/themes/${process.env.WP_DEFAULT_THEME}/**/*.{php,html}`,
    `./public_html/plugins/${process.env.WP_DEFAULT_THEME}-blocks/*.{php,html}`,
    `./public_html/plugins/${process.env.WP_DEFAULT_THEME}-blocks/**/*.{php,html}`,
    './resources/**/*.{php,html,js}'
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1986px',
      },
      colors: {
        'primary': '',
        'secondary': '',
        'tertiary': '',
      },
    },
  },
  plugins: [],
}