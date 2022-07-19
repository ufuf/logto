import { authedAdminApi } from '@/api';

export const listConnectors = async () => authedAdminApi.get('connectors');

export const getConnectorDetails = async (connectorId: string) =>
  authedAdminApi.get(`connectors/${connectorId}`);
