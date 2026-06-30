/** Tiny classnames joiner — filters out falsy values. */
export function clsx(
  ...args: Array<string | false | null | undefined>
): string {
  return args.filter(Boolean).join(" ");
}
