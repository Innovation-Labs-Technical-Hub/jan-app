import { AIEngine, BaseExtension, ExtensionTypeEnum } from '@janhq/core'

import { convertFileSrc, invoke } from '@tauri-apps/api/core'

/**
 * Extension manifest object.
 */
export class Extension {
  /** @type {string} Name of the extension. */
  name: string

  /** @type {string} Product name of the extension. */
  productName?: string

  /** @type {string} The URL of the extension to load. */
  url: string

  /** @type {boolean} Whether the extension is activated or not. */
  active?: boolean

  /** @type {string} Extension's description. */
  description?: string

  /** @type {string} Extension's version. */
  version?: string

  constructor(
    url: string,
    name: string,
    productName?: string,
    active?: boolean,
    description?: string,
    version?: string
  ) {
    this.name = name
    this.productName = productName
    this.url = url
    this.active = active
    this.description = description
    this.version = version
  }
}

export type ExtensionManifest = {
  url: string
  name: string
  productName?: string
  active?: boolean
  description?: string
  version?: string
}

/**
 * Manages the registration and retrieval of extensions.
 */
export class ExtensionManager {
  date = new Date().toISOString()
  // Registered extensions
  private extensions = new Map<string, BaseExtension>()

  // Registered inference engines
  private engines = new Map<string, AIEngine>()

  /**
   * Registers an extension.
   * @param extension - The extension to register.
   */
  register<T extends BaseExtension>(name: string, extension: T) {
    // Register for naming use
    this.extensions.set(name, extension)

    // Register AI Engines
    if ('provider' in extension && typeof extension.provider === 'string') {
      this.engines.set(
        extension.provider as unknown as string,
        extension as unknown as AIEngine
      )
    }
  }

  /**
   * Retrieves a extension by its type.
   * @param type - The type of the extension to retrieve.
   * @returns The extension, if found.
   */
  get<T extends BaseExtension>(type: ExtensionTypeEnum): T | undefined {
    return this.getAll().find((e) => e.type() === type) as T | undefined
  }

  /**
   * Retrieves a extension by its type.
   * @param type - The type of the extension to retrieve.
   * @returns The extension, if found.
   */
  getByName(name: string): BaseExtension | undefined {
    return this.extensions.get(name) as BaseExtension | undefined
  }

  /**
   * Retrieves a extension by its type.
   * @param type - The type of the extension to retrieve.
   * @returns The extension, if found.
   */
  getAll(): BaseExtension[] {
    return Array.from(this.extensions.values())
  }

  /**
   * Retrieves a extension by its type.
   * @param engine - The engine name to retrieve.
   * @returns The extension, if found.
   */
  getEngine<T extends AIEngine>(engine: string): T | undefined {
    return this.engines.get(engine) as T | undefined
  }

  /**
   * Loads all registered extension.
   */
  load() {
    this.listExtensions().forEach((ext) => {
      ext.onLoad()
    })
  }

  /**
   * Unloads all registered extensions.
   */
  unload() {
    this.listExtensions().forEach((ext) => {
      ext.onUnload()
    })
  }

  /**
   * Retrieves a list of all registered extensions.
   * @returns An array of extensions.
   */
  listExtensions() {
    return [...this.extensions.values()]
  }

  /**
   * Retrieves a list of all registered extensions.
   * @returns An array of extensions.
   */
  async getActive(): Promise<Extension[]> {
    const res = await invoke('get_active_extensions')
    if (!res || !Array.isArray(res)) return []

    const extensions: Extension[] = res.map((ext: ExtensionManifest) => {
      return new Extension(
        ext.url,
        ext.name,
        ext.productName,
        ext.active,
        ext.description,
        ext.version
      )
    })
    return extensions
  }

  /**
   * Register a extension with its class.
   * @param {Extension} extension extension object as provided by the main process.
   * @returns {void}
   */
  async activateExtension(extension: Extension) {
    // Import class
    const extensionUrl = extension.url
    await import(/* @vite-ignore */convertFileSrc(extensionUrl)).then((extensionClass) => {
      // Register class if it has a default export
      if (
        typeof extensionClass.default === 'function' &&
        extensionClass.default.prototype
      ) {
        this.register(
          extension.name,
          new extensionClass.default(
            extension.url,
            extension.name,
            extension.productName,
            extension.active,
            extension.description,
            extension.version
          )
        )
      }
    })
  }

  /**
   * Registers all active extensions.
   * @returns {void}
   */
  async registerActive() {
    // Get active extensions
    const activeExtensions = (await this.getActive()) ?? []
    // Activate all
    await Promise.all(
      activeExtensions.map((ext: Extension) => this.activateExtension(ext))
    )
  }

  /**
   * Install a new extension.
   * @param {Array.<installOptions | string>} extensions A list of NPM specifiers, or installation configuration objects.
   * @returns {Promise.<Array.<Extension> | false>} extension as defined by the main process. Has property cancelled set to true if installation was cancelled in the main process.
   */
  async install(extensions: ExtensionManifest[]) {
    if (typeof window === 'undefined') {
      return
    }
    const res = (await invoke('install_extension', {
      extensions,
    })) as ExtensionManifest[]
    return res.map(async (ext: ExtensionManifest) => {
      const extension = new Extension(ext.name, ext.url)
      await this.activateExtension(extension)
      return extension
    })
  }

  /**
   * Uninstall provided extensions
   * @param {Array.<string>} extensions List of names of extensions to uninstall.
   * @param {boolean} reload Whether to reload all renderers after updating the extensions.
   * @returns {Promise.<boolean>} Whether uninstalling the extensions was successful.
   */
  uninstall(extensions: string[], reload = true) {
    if (typeof window === 'undefined') {
      return
    }
    return invoke('uninstall_extension', { extensions, reload })
  }

  /**
   * Shared instance of ExtensionManager.
   */
  static getInstance() {
    if (!window.core.extensionManager)
      window.core.extensionManager = new ExtensionManager()
    return window.core.extensionManager as ExtensionManager
  }
}
