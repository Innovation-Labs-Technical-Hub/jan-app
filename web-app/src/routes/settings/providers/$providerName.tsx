import { Card, CardItem } from '@/containers/Card'
import HeaderPage from '@/containers/HeaderPage'
import SettingsMenu from '@/containers/SettingsMenu'
import { useModelProvider } from '@/hooks/useModelProvider'
import { cn, getProviderTitle } from '@/lib/utils'
import { open } from '@tauri-apps/plugin-dialog'
import {
  getActiveModels,
  importModel,
  startModel,
  stopAllModels,
  stopModel,
} from '@/services/models'
import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
  useSearch,
} from '@tanstack/react-router'
import { useTranslation } from '@/i18n/react-i18next-compat'
import Capabilities from '@/containers/Capabilities'
import { DynamicControllerSetting } from '@/containers/dynamicControllerSetting'
import { RenderMarkdown } from '@/containers/RenderMarkdown'
import { DialogEditModel } from '@/containers/dialogs/EditModel'
import { DialogAddModel } from '@/containers/dialogs/AddModel'
import { ModelSetting } from '@/containers/ModelSetting'
import { DialogDeleteModel } from '@/containers/dialogs/DeleteModel'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'
import { CustomTooltipJoyRide } from '@/containers/CustomeTooltipJoyRide'
import { route } from '@/constants/routes'
import DeleteProvider from '@/containers/dialogs/DeleteProvider'
import { updateSettings, fetchModelsFromProvider } from '@/services/providers'
import { Button } from '@/components/ui/button'
import { IconFolderPlus, IconLoader, IconRefresh } from '@tabler/icons-react'
import { getProviders } from '@/services/providers'
import { toast } from 'sonner'
import { ActiveModel } from '@/types/models'
import { useEffect, useState } from 'react'
import { predefinedProviders } from '@/mock/data'

// as route.threadsDetail
export const Route = createFileRoute('/settings/providers/$providerName')({
  component: ProviderDetail,
  validateSearch: (search: Record<string, unknown>): { step?: string } => {
    // validate and parse the search params into a typed state
    return {
      step: String(search?.step),
    }
  },
})

function ProviderDetail() {
  const { t } = useTranslation()
  const steps = [
    {
      target: '.first-step-setup-remote-provider',
      title: t('providers:joyride.chooseProviderTitle'),
      disableBeacon: true,
      content: t('providers:joyride.chooseProviderContent'),
    },
    {
      target: '.second-step-setup-remote-provider',
      title: t('providers:joyride.getApiKeyTitle'),
      disableBeacon: true,
      content: t('providers:joyride.getApiKeyContent'),
    },
    {
      target: '.third-step-setup-remote-provider',
      title: t('providers:joyride.insertApiKeyTitle'),
      disableBeacon: true,
      content: t('providers:joyride.insertApiKeyContent'),
    },
  ]
  const { step } = useSearch({ from: Route.id })
  const [activeModels, setActiveModels] = useState<ActiveModel[]>([])
  const [loadingModels, setLoadingModels] = useState<string[]>([])
  const [refreshingModels, setRefreshingModels] = useState(false)
  const { providerName } = useParams({ from: Route.id })
  const { getProviderByName, setProviders, updateProvider } = useModelProvider()
  const provider = getProviderByName(providerName)
  const isSetup = step === 'setup_remote_provider'
  const navigate = useNavigate()

  useEffect(() => {
    // Initial data fetch
    getActiveModels().then(setActiveModels)

    // Set up interval for real-time updates
    const intervalId = setInterval(() => {
      getActiveModels().then(setActiveModels)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [setActiveModels])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data

    if (status === STATUS.FINISHED) {
      navigate({
        to: route.home,
      })
    }
  }

  const handleRefreshModels = async () => {
    if (!provider || !provider.base_url) {
      toast.error(t('providers:models'), {
        description: t('providers:refreshModelsError'),
      })
      return
    }

    setRefreshingModels(true)
    try {
      const modelIds = await fetchModelsFromProvider(provider)

      // Create new models from the fetched IDs
      const newModels: Model[] = modelIds.map((id) => ({
        id,
        model: id,
        name: id,
        capabilities: ['completion'], // Default capability
        version: '1.0',
      }))

      // Filter out models that already exist
      const existingModelIds = provider.models.map((m) => m.id)
      const modelsToAdd = newModels.filter(
        (model) => !existingModelIds.includes(model.id)
      )

      if (modelsToAdd.length > 0) {
        // Update the provider with new models
        const updatedModels = [...provider.models, ...modelsToAdd]
        updateProvider(providerName, {
          ...provider,
          models: updatedModels,
        })

        toast.success(t('providers:models'), {
          description: t('providers:refreshModelsSuccess', {
            count: modelsToAdd.length,
            provider: provider.provider,
          }),
        })
      } else {
        toast.success(t('providers:models'), {
          description: t('providers:noNewModels'),
        })
      }
    } catch (error) {
      console.error(
        t('providers:refreshModelsFailed', { provider: provider.provider }),
        error
      )
      toast.error(t('providers:models'), {
        description: t('providers:refreshModelsFailed', {
          provider: provider.provider,
        }),
      })
    } finally {
      setRefreshingModels(false)
    }
  }

  const handleStartModel = (modelId: string) => {
    // Add model to loading state
    setLoadingModels((prev) => [...prev, modelId])
    if (provider)
      startModel(provider, modelId)
        .then(() => {
          setActiveModels((prevModels) => [
            ...prevModels,
            { id: modelId } as ActiveModel,
          ])
        })
        .catch((error) => {
          console.error('Error starting model:', error)
        })
        .finally(() => {
          // Remove model from loading state
          setLoadingModels((prev) => prev.filter((id) => id !== modelId))
        })
  }

  const handleStopModel = (modelId: string) => {
    stopModel(modelId)
      .then(() => {
        setActiveModels((prevModels) =>
          prevModels.filter((model) => model.id !== modelId)
        )
      })
      .catch((error) => {
        console.error('Error stopping model:', error)
      })
  }

  return (
    <>
      <Joyride
        run={isSetup}
        floaterProps={{
          hideArrow: true,
        }}
        steps={steps}
        tooltipComponent={CustomTooltipJoyRide}
        spotlightPadding={0}
        continuous={true}
        showSkipButton={true}
        hideCloseButton={true}
        spotlightClicks={true}
        disableOverlay={IS_LINUX}
        disableOverlayClose={true}
        callback={handleJoyrideCallback}
        locale={{
          back: t('providers:joyride.back'),
          close: t('providers:joyride.close'),
          last: t('providers:joyride.last'),
          next: t('providers:joyride.next'),
          skip: t('providers:joyride.skip'),
        }}
      />
      <div className="flex flex-col h-full">
        <HeaderPage>
          <h1 className="font-medium">{t('common:settings')}</h1>
        </HeaderPage>
        <div className="flex h-full w-full">
          <SettingsMenu />
          <div className="p-4 w-full h-[calc(100%-32px)] overflow-y-auto">
            <div className="flex flex-col justify-between gap-4 gap-y-3 w-full">
              <div className="flex items-center justify-between">
                <h1 className="font-medium text-base">
                  {getProviderTitle(providerName)}
                </h1>
              </div>

              <div
                className={cn(
                  'flex flex-col gap-3',
                  provider &&
                    provider.provider === 'llama.cpp' &&
                    'flex-col-reverse'
                )}
              >
                {/* Settings */}
                <Card>
                  {provider?.settings.map((setting, settingIndex) => {
                    // Use the DynamicController component
                    const actionComponent = (
                      <div className="mt-2">
                        <DynamicControllerSetting
                          controllerType={setting.controller_type}
                          controllerProps={setting.controller_props}
                          className={cn(
                            setting.key === 'api-key' &&
                              'third-step-setup-remote-provider'
                          )}
                          onChange={(newValue) => {
                            if (provider) {
                              const newSettings = [...provider.settings]
                              // Handle different value types by forcing the type
                              // Use type assertion to bypass type checking

                              ;(
                                newSettings[settingIndex].controller_props as {
                                  value: string | boolean | number
                                }
                              ).value = newValue

                              // Create update object with updated settings
                              const updateObj: Partial<ModelProvider> = {
                                settings: newSettings,
                              }
                              // Check if this is an API key or base URL setting and update the corresponding top-level field
                              const settingKey = setting.key
                              if (
                                settingKey === 'api-key' &&
                                typeof newValue === 'string'
                              ) {
                                updateObj.api_key = newValue
                              } else if (
                                settingKey === 'base-url' &&
                                typeof newValue === 'string'
                              ) {
                                updateObj.base_url = newValue
                              }
                              updateSettings(
                                providerName,
                                updateObj.settings ?? []
                              )
                              updateProvider(providerName, {
                                ...provider,
                                ...updateObj,
                              })

                              stopAllModels()
                            }
                          }}
                        />
                      </div>
                    )

                    return (
                      <CardItem
                        key={settingIndex}
                        title={setting.title}
                        column={
                          setting.controller_type === 'input' &&
                          setting.controller_props.type !== 'number'
                            ? true
                            : false
                        }
                        description={
                          <RenderMarkdown
                            className="![>p]:text-main-view-fg/70 select-none"
                            content={setting.description}
                            components={{
                              // Make links open in a new tab
                              a: ({ ...props }) => {
                                return (
                                  <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                      setting.key === 'api-key' &&
                                        'second-step-setup-remote-provider'
                                    )}
                                  />
                                )
                              },
                              p: ({ ...props }) => (
                                <p {...props} className="!mb-0" />
                              ),
                            }}
                          />
                        }
                        actions={actionComponent}
                      />
                    )
                  })}

                  <DeleteProvider provider={provider} />
                </Card>

                {/* Models */}
                <Card
                  header={
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-main-view-fg font-medium text-base">
                        {t('providers:models')}
                      </h1>
                      <div className="flex items-center gap-2">
                        {provider && provider.provider !== 'llama.cpp' && (
                          <>
                            {!predefinedProviders.some(
                              (p) => p.provider === provider.provider
                            ) && (
                              <Button
                                variant="link"
                                size="sm"
                                className="hover:no-underline"
                                onClick={handleRefreshModels}
                                disabled={refreshingModels}
                              >
                                <div className="cursor-pointer flex items-center justify-center rounded hover:bg-main-view-fg/15 bg-main-view-fg/10 transition-all duration-200 ease-in-out px-1.5 py-1 gap-1">
                                  {refreshingModels ? (
                                    <IconLoader
                                      size={18}
                                      className="text-main-view-fg/50 animate-spin"
                                    />
                                  ) : (
                                    <IconRefresh
                                      size={18}
                                      className="text-main-view-fg/50"
                                    />
                                  )}
                                  <span className="text-main-view-fg/70">
                                    {refreshingModels
                                      ? t('providers:refreshing')
                                      : t('providers:refresh')}
                                  </span>
                                </div>
                              </Button>
                            )}
                            <DialogAddModel provider={provider} />
                          </>
                        )}
                        {provider && provider.provider === 'llama.cpp' && (
                          <Button
                            variant="link"
                            size="sm"
                            className="hover:no-underline"
                            onClick={async () => {
                              const selectedFile = await open({
                                multiple: false,
                                directory: false,
                                filters: [
                                  {
                                    name: 'GGUF',
                                    extensions: ['gguf'],
                                  },
                                ],
                              })

                              if (selectedFile) {
                                try {
                                  await importModel(selectedFile)
                                } catch (error) {
                                  console.error(
                                    t('providers:importModelError'),
                                    error
                                  )
                                } finally {
                                  // Refresh the provider to update the models list
                                  getProviders().then(setProviders)
                                  toast.success(t('providers:import'), {
                                    id: `import-model-${provider.provider}`,
                                    description: t(
                                      'providers:importModelSuccess',
                                      { provider: provider.provider }
                                    ),
                                  })
                                }
                              }
                            }}
                          >
                            <div className="cursor-pointer flex items-center justify-center rounded hover:bg-main-view-fg/15 bg-main-view-fg/10 transition-all duration-200 ease-in-out p-1.5 py-1 gap-1 -mr-2">
                              <IconFolderPlus
                                size={18}
                                className="text-main-view-fg/50"
                              />
                              <span className="text-main-view-fg/70">
                                {t('providers:import')}
                              </span>
                            </div>
                          </Button>
                        )}
                      </div>
                    </div>
                  }
                >
                  {provider?.models.length ? (
                    provider?.models.map((model, modelIndex) => {
                      const capabilities = model.capabilities || []
                      return (
                        <CardItem
                          key={modelIndex}
                          title={
                            <div className="flex items-center gap-2">
                              <h1
                                className="font-medium line-clamp-1"
                                title={model.id}
                              >
                                {model.id}
                              </h1>
                              <Capabilities capabilities={capabilities} />
                            </div>
                          }
                          actions={
                            <div className="flex items-center gap-1">
                              <DialogEditModel
                                provider={provider}
                                modelId={model.id}
                              />
                              {model.settings && (
                                <ModelSetting
                                  provider={provider}
                                  model={model}
                                />
                              )}
                              <DialogDeleteModel
                                provider={provider}
                                modelId={model.id}
                              />
                              {provider &&
                                provider.provider === 'llama.cpp' && (
                                  <div className="ml-2">
                                    {activeModels.some(
                                      (activeModel) =>
                                        activeModel.id === model.id
                                    ) ? (
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() =>
                                          handleStopModel(model.id)
                                        }
                                      >
                                        {t('providers:stop')}
                                      </Button>
                                    ) : (
                                      <Button
                                        size="sm"
                                        disabled={loadingModels.includes(
                                          model.id
                                        )}
                                        onClick={() =>
                                          handleStartModel(model.id)
                                        }
                                      >
                                        {loadingModels.includes(model.id) ? (
                                          <div className="flex items-center gap-2">
                                            <IconLoader
                                              size={16}
                                              className="animate-spin"
                                            />
                                          </div>
                                        ) : (
                                          t('providers:start')
                                        )}
                                      </Button>
                                    )}
                                  </div>
                                )}
                            </div>
                          }
                        />
                      )
                    })
                  ) : (
                    <div className="-mt-2">
                      <div className="flex items-center gap-2 text-main-view-fg/80">
                        <h6 className="font-medium text-base">
                          {t('providers:noModelFound')}
                        </h6>
                      </div>
                      <p className="text-main-view-fg/70 mt-1 text-xs leading-relaxed">
                        {t('providers:noModelFoundDesc')}
                        &nbsp;
                        <Link to={route.hub}>{t('common:hub')}</Link>
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
