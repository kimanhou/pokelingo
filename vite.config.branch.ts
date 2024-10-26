import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const getBranchName = () => {
    if(process.env.BRANCH_NAME == null){
        throw new Error("Branch name was not found.")
    }
    return process.env.BRANCH_NAME
}

export default mergeConfig(viteConfig, defineConfig({
    base: `/pokelingo/branch/${getBranchName()}`,
}))