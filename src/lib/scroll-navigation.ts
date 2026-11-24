/** Pick the last section reached by the reading line, without skipping short sections. */
export function activeScrollSection(positions: readonly number[], scrollY: number): number {
  let active = 0;
  positions.forEach((position, index) => {
    if (position <= scrollY + 48) active = index;
  });
  return active;
}