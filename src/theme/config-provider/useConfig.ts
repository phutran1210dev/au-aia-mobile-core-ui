import { use } from 'react';

import { ComponentConfigContext, type ConfigConsumerProps } from './context';

/**
 * The nearest `componentSize` and `componentDisabled`, or the library defaults
 * (`'medium'`, `false`) when no provider sets them. Exposed as `ConfigProvider.useConfig`.
 */
export function useConfig(): ConfigConsumerProps {
  return use(ComponentConfigContext);
}
