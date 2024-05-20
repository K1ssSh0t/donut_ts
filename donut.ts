let A: number = 1;
let B: number = 1;

const Ascii_Frame = () => {
  const b: string[] = [];
  const z: number[] = [];
  A += 0.07;
  B += 0.03;

  const cA: number = Math.cos(A),
    sA: number = Math.sin(A),
    cB: number = Math.cos(B),
    sB: number = Math.sin(B);

  for (let k: number = 0; k < 1760; k++) {
    b[k] = k % 80 == 79 ? "\n" : " ";
    z[k] = 0;
  }
  //j <=> theta
  for (let j: number = 0; j < 6.28; j += 0.07) {
    const ct: number = Math.cos(j),
      st: number = Math.sin(j);
    // i <=> phi
    for (let i: number = 0; i < 6.28; i += 0.02) {
      const sp: number = Math.sin(i),
        cp: number = Math.cos(i),
        h: number = ct + 2, // R1 + R2*cos(theta)
        D: number = 1 / (sp * h * sA + st * cA + 5), // this is 1/z
        t: number = sp * h * cA - st * sA; // this is a clever factoring of some of the terms in x' and y'

      const x: number = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
        y: number = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
        o: number = x + 80 * y,
        N: number =
          0 |
          (8 *
            ((st * sA - sp * ct * cA) * cB -
              sp * ct * sA -
              st * cA -
              cp * ct * sB));

      if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
        z[o] = D;
        b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
      }
    }
  }
  console.log("\x1b[H" + b.join(""));
};
setInterval(Ascii_Frame, 50);
