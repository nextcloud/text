export declare type EventTypes = {
  /* Document state */
  opened: unknown;
  loaded: unknown;

  /* All initial steps fetched */
  fetched: unknown;

  /* received new steps */
  sync: unknown;

  /* state changed (dirty) */
  stateChange: unknown;

  /* error */
  error: unknown;

  /* Events for session and document meta data */
  change: unknown;

  /* Emitted after successful save */
  save: unknown;

  /* Emitted once a document becomes idle */
  idle: unknown;
};
