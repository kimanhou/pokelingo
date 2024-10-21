import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const getTestEnvName = () => {
    if(process.env.TEST_ENV_NAME != null){
        return process.env.TEST_ENV_NAME
    } else {
        return "test"
    }
}

export default mergeConfig(viteConfig, defineConfig({
    base: `/pokelingo/env/${getTestEnvName()}`,
}))