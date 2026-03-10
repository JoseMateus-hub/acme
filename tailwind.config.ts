import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
     './src/app/**/*.{js,jsx,ts,tsx}',
     '.src/components/**/*.{js,jsx,ts,tsx}'
  ],
  theme:{ 
     extends: {}
  },
  plugins: []
}

export default config;


