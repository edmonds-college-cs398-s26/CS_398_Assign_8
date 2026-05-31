import { clearOutput, printSummary } from "./toolkit/test.js";
import { runTests as runWeightedIntervalsTests } from "./week8/WeightedIntervals.test.js";

clearOutput();
runWeightedIntervalsTests();
printSummary();
