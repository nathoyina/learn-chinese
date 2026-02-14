import type { Scenario } from "../../types/scenario";
import greetings from "./greetings.json";
import orderTea from "./order-tea.json";
import designReview from "./design-review.json";
import sprintPlanning from "./sprint-planning.json";
import scopeNegotiation from "./scope-negotiation.json";
import bugTriage from "./bug-triage.json";
import requirementsClarify from "./requirements-clarify.json";
import statusUpdate from "./status-update.json";
import techFeasibility from "./tech-feasibility.json";
import timelinePushback from "./timeline-pushback.json";
import crossTeamAlignment from "./cross-team-alignment.json";
import askingDirections from "./asking-directions.json";
import makingPlans from "./making-plans.json";
import apiIntegration from "./api-integration.json";
import databaseMigration from "./database-migration.json";
import frontendPerformance from "./frontend-performance.json";
import deployment from "./deployment.json";
import codeReview from "./code-review.json";
import monitoringAlerts from "./monitoring-alerts.json";

const scenarios: Scenario[] = [
  greetings as Scenario,
  orderTea as Scenario,
  designReview as Scenario,
  sprintPlanning as Scenario,
  scopeNegotiation as Scenario,
  bugTriage as Scenario,
  requirementsClarify as Scenario,
  statusUpdate as Scenario,
  techFeasibility as Scenario,
  timelinePushback as Scenario,
  crossTeamAlignment as Scenario,
  askingDirections as Scenario,
  makingPlans as Scenario,
  apiIntegration as Scenario,
  databaseMigration as Scenario,
  frontendPerformance as Scenario,
  deployment as Scenario,
  codeReview as Scenario,
  monitoringAlerts as Scenario,
];

export function getAllScenarios(): Scenario[] {
  return scenarios;
}

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}

export function getScenariosByCategory(
  category: Scenario["category"]
): Scenario[] {
  return scenarios.filter((s) => s.category === category);
}
