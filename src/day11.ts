// AoC Day 11 Challenge

import { getAdjacentPoints, Map, mapCopyShape, mapFromLines, Point, pointFromMapIndex, logMap } from "./shared";

/*
// Test values
const initialValues: string[] = [
    "5483143223",
    "2745854711",
    "5264556173",
    "6141336146",
    "6357385478",
    "4167524645",
    "2176841721",
    "6882881134",
    "4846848554",
    "5283751526"
];
*/

// Real values
const initialValues: string[] = [
    "1443668646",
    "7686735716",
    "4261576231",
    "3361258654",
    "4852532611",
    "5587113732",
    "1224426757",
    "5155565133",
    "6488377862",
    "8267833811"
];

export { dayElevenPartOne, dayElevenPartTwo };

function getFlashIndex(map: Map, flashed: number[]) {
    return map.values.findIndex((value: number, index: number) => {
        return value > 9 && flashed.indexOf(index) === -1;
    });
}

function dayElevenPartOne(): void {
    const energyLevelMap: Map = mapFromLines(initialValues);
    logMap(energyLevelMap);
    let flashCount: number = 0;
    for (let step = 0; step < 100; step++) {
        console.log("Step: " + step);
        for (let i = 0; i < energyLevelMap.values.length; i++) {
            energyLevelMap.values[i] = Math.min(10, energyLevelMap.values[i] + 1);
        }
        //logMap(energyLevelMap);
        const flashed: number[] = [];
        let flashIndex: number = getFlashIndex(energyLevelMap, flashed);
        while (flashIndex !== -1) {
            flashed.push(flashIndex);
            const flashPoint: Point = pointFromMapIndex(energyLevelMap, flashIndex);
            const adjacentIndices = getAdjacentPoints(flashPoint, true).reduce((indices: number[], point: Point) => {
                const index = energyLevelMap.getIndexAtPoint(point);
                if (index !== undefined) {
                    indices.push(index);
                }
                return indices;
            }, []);
            for (const index of adjacentIndices) {
                energyLevelMap.values[index] = Math.min(10, energyLevelMap.values[index] + 1);
            }
            //logMap(energyLevelMap);
            flashIndex = getFlashIndex(energyLevelMap, flashed);
        }
        for (let i = 0; i < energyLevelMap.values.length; i++) {
            if (energyLevelMap.values[i] > 9) {
                energyLevelMap.values[i] = 0;
                flashCount++;
            }
        }
        logMap(energyLevelMap);
    }
    console.log("Flash Count: " + flashCount);
}

function dayElevenPartTwo(): void {}