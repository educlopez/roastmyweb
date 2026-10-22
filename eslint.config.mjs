import { defineConfig, globalIgnores } from "eslint/config"
import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"

function withRuleOverrides(configs) {
  return configs.map((config) => {
    const plugins = config.plugins ?? {}
    const rules = { ...(config.rules ?? {}) }
    let changed = false

    if (plugins["react-hooks"]) {
      rules["react-hooks/set-state-in-effect"] = "warn"
      rules["react-hooks/immutability"] = "warn"
      changed = true
    }

    if (rules["@typescript-eslint/no-explicit-any"]) {
      rules["@typescript-eslint/no-explicit-any"] = "warn"
      changed = true
    }

    if (!changed) return config
    return { ...config, rules }
  })
}

const eslintConfig = defineConfig([
  ...withRuleOverrides(nextCoreWebVitals),
  ...withRuleOverrides(nextTypescript),
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
])

export default eslintConfig
