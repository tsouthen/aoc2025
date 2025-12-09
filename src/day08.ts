const sampleData = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

export function solve(input: string) {
  const p1 = solve1(input);
  const p2 = solve2(input);
  return { part1: p1, part2: p2 };
}

interface Distance {
  from: number;
  to: number;
  distance: number;
}

interface Circuit {
  connections: number[];
}

const distanceSquared = (a: number[], b: number[]) => a.reduce((acc, val, idx) => acc + Math.pow(val - b[idx], 2), 0);

function solve1(input: string, part2 = false) {
  const junctions = input
    .split("\n")
    .map((line) => line.split(",").map(Number))
    .filter((coords) => coords.length === 3);
  const distances = new Array<Distance>();

  for (let i = 0; i < junctions.length; i++) {
    for (let j = i + 1; j < junctions.length; j++) {
      distances.push({
        from: i,
        to: j,
        distance: distanceSquared(junctions[i], junctions[j]),
      });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);

  const circuits = new Array<Circuit>();

  // fill circuits, one for each junction initially
  for (let i = 0; i < junctions.length; i++) {
    circuits.push({ connections: [i] });
  }

  const maxIterations = part2 ? distances.length : junctions.length === 20 ? 10 : junctions.length;
  for (let i = 0; i < maxIterations; i++) {
    const currDist = distances[i];
    const fromCircuit = circuits.find((circuit) => circuit.connections.includes(currDist.from));
    const toCircuit = circuits.find((circuit) => circuit.connections.includes(currDist.to));

    if (fromCircuit && toCircuit && fromCircuit !== toCircuit) {
      fromCircuit.connections.push(...toCircuit.connections);
      const toIndex = circuits.indexOf(toCircuit);
      circuits.splice(toIndex, 1);

      if (part2 && circuits.length === 1) {
        return junctions[currDist.from][0] * junctions[currDist.to][0];
      }
    }
  }

  circuits.sort((a, b) => b.connections.length - a.connections.length);
  const topThree = circuits.slice(0, 3);
  if (topThree.length === 3) {
    return topThree.reduce((acc, circuit) => acc * circuit.connections.length, 1);
  }
  return 0;
}

function solve2(input: string) {
  return solve1(input, true);
}
