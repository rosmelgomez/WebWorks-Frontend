export interface SubscriptionCheck {
  status: boolean;
  amount: number;
  maxNumberRepository: number;
  maxNumberProject: number;
  planName?: string;
}
