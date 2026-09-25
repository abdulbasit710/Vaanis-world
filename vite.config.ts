import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {staticSeo} from './scripts/static-seo';
export default defineConfig({plugins:[react(),staticSeo()],server:{allowedHosts:['.loca.lt']}});
