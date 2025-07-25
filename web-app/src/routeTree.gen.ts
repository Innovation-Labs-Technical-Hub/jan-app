/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SystemMonitorImport } from './routes/system-monitor'
import { Route as LogsImport } from './routes/logs'
import { Route as HubImport } from './routes/hub'
import { Route as AssistantImport } from './routes/assistant'
import { Route as IndexImport } from './routes/index'
import { Route as ThreadsThreadIdImport } from './routes/threads/$threadId'
import { Route as SettingsShortcutsImport } from './routes/settings/shortcuts'
import { Route as SettingsPrivacyImport } from './routes/settings/privacy'
import { Route as SettingsMcpServersImport } from './routes/settings/mcp-servers'
import { Route as SettingsLocalApiServerImport } from './routes/settings/local-api-server'
import { Route as SettingsHttpsProxyImport } from './routes/settings/https-proxy'
import { Route as SettingsHardwareImport } from './routes/settings/hardware'
import { Route as SettingsGeneralImport } from './routes/settings/general'
import { Route as SettingsExtensionsImport } from './routes/settings/extensions'
import { Route as SettingsAppearanceImport } from './routes/settings/appearance'
import { Route as LocalApiServerLogsImport } from './routes/local-api-server/logs'
import { Route as SettingsProvidersIndexImport } from './routes/settings/providers/index'
import { Route as SettingsProvidersProviderNameImport } from './routes/settings/providers/$providerName'

// Create/Update Routes

const SystemMonitorRoute = SystemMonitorImport.update({
  id: '/system-monitor',
  path: '/system-monitor',
  getParentRoute: () => rootRoute,
} as any)

const LogsRoute = LogsImport.update({
  id: '/logs',
  path: '/logs',
  getParentRoute: () => rootRoute,
} as any)

const HubRoute = HubImport.update({
  id: '/hub',
  path: '/hub',
  getParentRoute: () => rootRoute,
} as any)

const AssistantRoute = AssistantImport.update({
  id: '/assistant',
  path: '/assistant',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ThreadsThreadIdRoute = ThreadsThreadIdImport.update({
  id: '/threads/$threadId',
  path: '/threads/$threadId',
  getParentRoute: () => rootRoute,
} as any)

const SettingsShortcutsRoute = SettingsShortcutsImport.update({
  id: '/settings/shortcuts',
  path: '/settings/shortcuts',
  getParentRoute: () => rootRoute,
} as any)

const SettingsPrivacyRoute = SettingsPrivacyImport.update({
  id: '/settings/privacy',
  path: '/settings/privacy',
  getParentRoute: () => rootRoute,
} as any)

const SettingsMcpServersRoute = SettingsMcpServersImport.update({
  id: '/settings/mcp-servers',
  path: '/settings/mcp-servers',
  getParentRoute: () => rootRoute,
} as any)

const SettingsLocalApiServerRoute = SettingsLocalApiServerImport.update({
  id: '/settings/local-api-server',
  path: '/settings/local-api-server',
  getParentRoute: () => rootRoute,
} as any)

const SettingsHttpsProxyRoute = SettingsHttpsProxyImport.update({
  id: '/settings/https-proxy',
  path: '/settings/https-proxy',
  getParentRoute: () => rootRoute,
} as any)

const SettingsHardwareRoute = SettingsHardwareImport.update({
  id: '/settings/hardware',
  path: '/settings/hardware',
  getParentRoute: () => rootRoute,
} as any)

const SettingsGeneralRoute = SettingsGeneralImport.update({
  id: '/settings/general',
  path: '/settings/general',
  getParentRoute: () => rootRoute,
} as any)

const SettingsExtensionsRoute = SettingsExtensionsImport.update({
  id: '/settings/extensions',
  path: '/settings/extensions',
  getParentRoute: () => rootRoute,
} as any)

const SettingsAppearanceRoute = SettingsAppearanceImport.update({
  id: '/settings/appearance',
  path: '/settings/appearance',
  getParentRoute: () => rootRoute,
} as any)

const LocalApiServerLogsRoute = LocalApiServerLogsImport.update({
  id: '/local-api-server/logs',
  path: '/local-api-server/logs',
  getParentRoute: () => rootRoute,
} as any)

const SettingsProvidersIndexRoute = SettingsProvidersIndexImport.update({
  id: '/settings/providers/',
  path: '/settings/providers/',
  getParentRoute: () => rootRoute,
} as any)

const SettingsProvidersProviderNameRoute =
  SettingsProvidersProviderNameImport.update({
    id: '/settings/providers/$providerName',
    path: '/settings/providers/$providerName',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/assistant': {
      id: '/assistant'
      path: '/assistant'
      fullPath: '/assistant'
      preLoaderRoute: typeof AssistantImport
      parentRoute: typeof rootRoute
    }
    '/hub': {
      id: '/hub'
      path: '/hub'
      fullPath: '/hub'
      preLoaderRoute: typeof HubImport
      parentRoute: typeof rootRoute
    }
    '/logs': {
      id: '/logs'
      path: '/logs'
      fullPath: '/logs'
      preLoaderRoute: typeof LogsImport
      parentRoute: typeof rootRoute
    }
    '/system-monitor': {
      id: '/system-monitor'
      path: '/system-monitor'
      fullPath: '/system-monitor'
      preLoaderRoute: typeof SystemMonitorImport
      parentRoute: typeof rootRoute
    }
    '/local-api-server/logs': {
      id: '/local-api-server/logs'
      path: '/local-api-server/logs'
      fullPath: '/local-api-server/logs'
      preLoaderRoute: typeof LocalApiServerLogsImport
      parentRoute: typeof rootRoute
    }
    '/settings/appearance': {
      id: '/settings/appearance'
      path: '/settings/appearance'
      fullPath: '/settings/appearance'
      preLoaderRoute: typeof SettingsAppearanceImport
      parentRoute: typeof rootRoute
    }
    '/settings/extensions': {
      id: '/settings/extensions'
      path: '/settings/extensions'
      fullPath: '/settings/extensions'
      preLoaderRoute: typeof SettingsExtensionsImport
      parentRoute: typeof rootRoute
    }
    '/settings/general': {
      id: '/settings/general'
      path: '/settings/general'
      fullPath: '/settings/general'
      preLoaderRoute: typeof SettingsGeneralImport
      parentRoute: typeof rootRoute
    }
    '/settings/hardware': {
      id: '/settings/hardware'
      path: '/settings/hardware'
      fullPath: '/settings/hardware'
      preLoaderRoute: typeof SettingsHardwareImport
      parentRoute: typeof rootRoute
    }
    '/settings/https-proxy': {
      id: '/settings/https-proxy'
      path: '/settings/https-proxy'
      fullPath: '/settings/https-proxy'
      preLoaderRoute: typeof SettingsHttpsProxyImport
      parentRoute: typeof rootRoute
    }
    '/settings/local-api-server': {
      id: '/settings/local-api-server'
      path: '/settings/local-api-server'
      fullPath: '/settings/local-api-server'
      preLoaderRoute: typeof SettingsLocalApiServerImport
      parentRoute: typeof rootRoute
    }
    '/settings/mcp-servers': {
      id: '/settings/mcp-servers'
      path: '/settings/mcp-servers'
      fullPath: '/settings/mcp-servers'
      preLoaderRoute: typeof SettingsMcpServersImport
      parentRoute: typeof rootRoute
    }
    '/settings/privacy': {
      id: '/settings/privacy'
      path: '/settings/privacy'
      fullPath: '/settings/privacy'
      preLoaderRoute: typeof SettingsPrivacyImport
      parentRoute: typeof rootRoute
    }
    '/settings/shortcuts': {
      id: '/settings/shortcuts'
      path: '/settings/shortcuts'
      fullPath: '/settings/shortcuts'
      preLoaderRoute: typeof SettingsShortcutsImport
      parentRoute: typeof rootRoute
    }
    '/threads/$threadId': {
      id: '/threads/$threadId'
      path: '/threads/$threadId'
      fullPath: '/threads/$threadId'
      preLoaderRoute: typeof ThreadsThreadIdImport
      parentRoute: typeof rootRoute
    }
    '/settings/providers/$providerName': {
      id: '/settings/providers/$providerName'
      path: '/settings/providers/$providerName'
      fullPath: '/settings/providers/$providerName'
      preLoaderRoute: typeof SettingsProvidersProviderNameImport
      parentRoute: typeof rootRoute
    }
    '/settings/providers/': {
      id: '/settings/providers/'
      path: '/settings/providers'
      fullPath: '/settings/providers'
      preLoaderRoute: typeof SettingsProvidersIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/assistant': typeof AssistantRoute
  '/hub': typeof HubRoute
  '/logs': typeof LogsRoute
  '/system-monitor': typeof SystemMonitorRoute
  '/local-api-server/logs': typeof LocalApiServerLogsRoute
  '/settings/appearance': typeof SettingsAppearanceRoute
  '/settings/extensions': typeof SettingsExtensionsRoute
  '/settings/general': typeof SettingsGeneralRoute
  '/settings/hardware': typeof SettingsHardwareRoute
  '/settings/https-proxy': typeof SettingsHttpsProxyRoute
  '/settings/local-api-server': typeof SettingsLocalApiServerRoute
  '/settings/mcp-servers': typeof SettingsMcpServersRoute
  '/settings/privacy': typeof SettingsPrivacyRoute
  '/settings/shortcuts': typeof SettingsShortcutsRoute
  '/threads/$threadId': typeof ThreadsThreadIdRoute
  '/settings/providers/$providerName': typeof SettingsProvidersProviderNameRoute
  '/settings/providers': typeof SettingsProvidersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/assistant': typeof AssistantRoute
  '/hub': typeof HubRoute
  '/logs': typeof LogsRoute
  '/system-monitor': typeof SystemMonitorRoute
  '/local-api-server/logs': typeof LocalApiServerLogsRoute
  '/settings/appearance': typeof SettingsAppearanceRoute
  '/settings/extensions': typeof SettingsExtensionsRoute
  '/settings/general': typeof SettingsGeneralRoute
  '/settings/hardware': typeof SettingsHardwareRoute
  '/settings/https-proxy': typeof SettingsHttpsProxyRoute
  '/settings/local-api-server': typeof SettingsLocalApiServerRoute
  '/settings/mcp-servers': typeof SettingsMcpServersRoute
  '/settings/privacy': typeof SettingsPrivacyRoute
  '/settings/shortcuts': typeof SettingsShortcutsRoute
  '/threads/$threadId': typeof ThreadsThreadIdRoute
  '/settings/providers/$providerName': typeof SettingsProvidersProviderNameRoute
  '/settings/providers': typeof SettingsProvidersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/assistant': typeof AssistantRoute
  '/hub': typeof HubRoute
  '/logs': typeof LogsRoute
  '/system-monitor': typeof SystemMonitorRoute
  '/local-api-server/logs': typeof LocalApiServerLogsRoute
  '/settings/appearance': typeof SettingsAppearanceRoute
  '/settings/extensions': typeof SettingsExtensionsRoute
  '/settings/general': typeof SettingsGeneralRoute
  '/settings/hardware': typeof SettingsHardwareRoute
  '/settings/https-proxy': typeof SettingsHttpsProxyRoute
  '/settings/local-api-server': typeof SettingsLocalApiServerRoute
  '/settings/mcp-servers': typeof SettingsMcpServersRoute
  '/settings/privacy': typeof SettingsPrivacyRoute
  '/settings/shortcuts': typeof SettingsShortcutsRoute
  '/threads/$threadId': typeof ThreadsThreadIdRoute
  '/settings/providers/$providerName': typeof SettingsProvidersProviderNameRoute
  '/settings/providers/': typeof SettingsProvidersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/assistant'
    | '/hub'
    | '/logs'
    | '/system-monitor'
    | '/local-api-server/logs'
    | '/settings/appearance'
    | '/settings/extensions'
    | '/settings/general'
    | '/settings/hardware'
    | '/settings/https-proxy'
    | '/settings/local-api-server'
    | '/settings/mcp-servers'
    | '/settings/privacy'
    | '/settings/shortcuts'
    | '/threads/$threadId'
    | '/settings/providers/$providerName'
    | '/settings/providers'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/assistant'
    | '/hub'
    | '/logs'
    | '/system-monitor'
    | '/local-api-server/logs'
    | '/settings/appearance'
    | '/settings/extensions'
    | '/settings/general'
    | '/settings/hardware'
    | '/settings/https-proxy'
    | '/settings/local-api-server'
    | '/settings/mcp-servers'
    | '/settings/privacy'
    | '/settings/shortcuts'
    | '/threads/$threadId'
    | '/settings/providers/$providerName'
    | '/settings/providers'
  id:
    | '__root__'
    | '/'
    | '/assistant'
    | '/hub'
    | '/logs'
    | '/system-monitor'
    | '/local-api-server/logs'
    | '/settings/appearance'
    | '/settings/extensions'
    | '/settings/general'
    | '/settings/hardware'
    | '/settings/https-proxy'
    | '/settings/local-api-server'
    | '/settings/mcp-servers'
    | '/settings/privacy'
    | '/settings/shortcuts'
    | '/threads/$threadId'
    | '/settings/providers/$providerName'
    | '/settings/providers/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AssistantRoute: typeof AssistantRoute
  HubRoute: typeof HubRoute
  LogsRoute: typeof LogsRoute
  SystemMonitorRoute: typeof SystemMonitorRoute
  LocalApiServerLogsRoute: typeof LocalApiServerLogsRoute
  SettingsAppearanceRoute: typeof SettingsAppearanceRoute
  SettingsExtensionsRoute: typeof SettingsExtensionsRoute
  SettingsGeneralRoute: typeof SettingsGeneralRoute
  SettingsHardwareRoute: typeof SettingsHardwareRoute
  SettingsHttpsProxyRoute: typeof SettingsHttpsProxyRoute
  SettingsLocalApiServerRoute: typeof SettingsLocalApiServerRoute
  SettingsMcpServersRoute: typeof SettingsMcpServersRoute
  SettingsPrivacyRoute: typeof SettingsPrivacyRoute
  SettingsShortcutsRoute: typeof SettingsShortcutsRoute
  ThreadsThreadIdRoute: typeof ThreadsThreadIdRoute
  SettingsProvidersProviderNameRoute: typeof SettingsProvidersProviderNameRoute
  SettingsProvidersIndexRoute: typeof SettingsProvidersIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AssistantRoute: AssistantRoute,
  HubRoute: HubRoute,
  LogsRoute: LogsRoute,
  SystemMonitorRoute: SystemMonitorRoute,
  LocalApiServerLogsRoute: LocalApiServerLogsRoute,
  SettingsAppearanceRoute: SettingsAppearanceRoute,
  SettingsExtensionsRoute: SettingsExtensionsRoute,
  SettingsGeneralRoute: SettingsGeneralRoute,
  SettingsHardwareRoute: SettingsHardwareRoute,
  SettingsHttpsProxyRoute: SettingsHttpsProxyRoute,
  SettingsLocalApiServerRoute: SettingsLocalApiServerRoute,
  SettingsMcpServersRoute: SettingsMcpServersRoute,
  SettingsPrivacyRoute: SettingsPrivacyRoute,
  SettingsShortcutsRoute: SettingsShortcutsRoute,
  ThreadsThreadIdRoute: ThreadsThreadIdRoute,
  SettingsProvidersProviderNameRoute: SettingsProvidersProviderNameRoute,
  SettingsProvidersIndexRoute: SettingsProvidersIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/assistant",
        "/hub",
        "/logs",
        "/system-monitor",
        "/local-api-server/logs",
        "/settings/appearance",
        "/settings/extensions",
        "/settings/general",
        "/settings/hardware",
        "/settings/https-proxy",
        "/settings/local-api-server",
        "/settings/mcp-servers",
        "/settings/privacy",
        "/settings/shortcuts",
        "/threads/$threadId",
        "/settings/providers/$providerName",
        "/settings/providers/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/assistant": {
      "filePath": "assistant.tsx"
    },
    "/hub": {
      "filePath": "hub.tsx"
    },
    "/logs": {
      "filePath": "logs.tsx"
    },
    "/system-monitor": {
      "filePath": "system-monitor.tsx"
    },
    "/local-api-server/logs": {
      "filePath": "local-api-server/logs.tsx"
    },
    "/settings/appearance": {
      "filePath": "settings/appearance.tsx"
    },
    "/settings/extensions": {
      "filePath": "settings/extensions.tsx"
    },
    "/settings/general": {
      "filePath": "settings/general.tsx"
    },
    "/settings/hardware": {
      "filePath": "settings/hardware.tsx"
    },
    "/settings/https-proxy": {
      "filePath": "settings/https-proxy.tsx"
    },
    "/settings/local-api-server": {
      "filePath": "settings/local-api-server.tsx"
    },
    "/settings/mcp-servers": {
      "filePath": "settings/mcp-servers.tsx"
    },
    "/settings/privacy": {
      "filePath": "settings/privacy.tsx"
    },
    "/settings/shortcuts": {
      "filePath": "settings/shortcuts.tsx"
    },
    "/threads/$threadId": {
      "filePath": "threads/$threadId.tsx"
    },
    "/settings/providers/$providerName": {
      "filePath": "settings/providers/$providerName.tsx"
    },
    "/settings/providers/": {
      "filePath": "settings/providers/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
