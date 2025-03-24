import type { RouteRecordNormalized } from 'vue-router'

const modules = import.meta.glob('./modules/*.ts', { eager: true })
const externalModules = import.meta.glob('./externalModules/*.ts', {
  eager: true,
})

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]
    result.push(...moduleList)
  })
  console.log(result)

  return result
}

export const appRoutes: RouteRecordNormalized[] = [formatModules(modules, [])[0],formatModules(modules, [])[7],formatModules(modules, [])[3]]


export const appExternalRoutes: RouteRecordNormalized[] = [formatModules(externalModules, [])[1]]

// export const appRoutes: RouteRecordNormalized[] = formatModules(modules, [])

// export const appExternalRoutes: RouteRecordNormalized[] = formatModules(externalModules, [])
console.log(modules)
