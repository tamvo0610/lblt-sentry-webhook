export interface SentryWebhookData {
  action: string;
  data: {
    issue: {
      id: string;
      shortId: string;
      title: string;
      level: string;
      culprit: string;
      project: {
        id: string;
        name: string;
        slug: string;
        platform: string;
      };
      metadata: {
        value: string;
        filename: string;
        type: string;
      };
    };
  };
}
