type LoopState = { break: boolean };

export function forEachAsync<TSource>(
  source: Iterable<TSource>,
  body: (element: TSource, loopState: LoopState) => void
): Promise<LoopState>;

export function forEachAsync<TSource, TLoopState extends LoopState>(
  source: Iterable<TSource>,
  body: (element: TSource, loopState: TLoopState) => void,
  initialLoopState: TLoopState
): Promise<TLoopState>;

export function forAsync(
  fromInclusive: number,
  toExclusive: number,
  body: (index: number, loopState: LoopState) => void
): Promise<LoopState>;

export function forAsync<TLoopState extends LoopState>(
  fromInclusive: number,
  toExclusive: number,
  body: (index: number, loopState: TLoopState) => void,
  initialLoopState: TLoopState
): Promise<TLoopState>;
