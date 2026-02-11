'use client';

import { useEffect } from 'react';

export default function VisualEditsMessenger() {
  useEffect(() => {
    // This component helps the visual editor communicate with the app
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'ORCHIDS_VISUAL_EDIT') {
        // Handle visual edit message
        console.log('Received visual edit message:', event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return null;
}
