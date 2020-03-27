export type ChangeHandler<T = { name?: string; value: unknown }> = (
  event: React.ChangeEvent<T>
) => void;
