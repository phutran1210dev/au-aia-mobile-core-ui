import { ConfigProvider } from '@au-aia/mobile-core-ui';

import { Playground } from './Playground';

export default function App() {
  return (
    <ConfigProvider>
      <Playground />
    </ConfigProvider>
  );
}
