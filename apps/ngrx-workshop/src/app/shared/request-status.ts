
export enum LoadingState {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
}

export interface ErrorState {
  errorMessage: string;
}

export type RequestStatus = LoadingState | ErrorState;

export function getErrorMessage(callState: RequestStatus): string | undefined {
  if ((callState as ErrorState).errorMessage !== undefined) {
    return (callState as ErrorState).errorMessage;
  }
  return undefined;
}
