import { ConnectorDto } from '@logto/schemas';

import { getConnectorDetails, listConnectors } from '@/connector-api';

describe('list connectors and get details before setting up', () => {
  it('should succeed to get all connectors and they are all disabled', async () => {
    const response = await listConnectors();
    expect(response).toHaveProperty('statusCode', 200);
    expect(() => {
      for (const connectorDto of JSON.parse(response.body) as ConnectorDto[]) {
        expect(connectorDto.enabled).toBeFalsy();
        expect(connectorDto.config).toEqual({});
      }
    }).not.toThrow();
  });

  it('should succeed to get connector details', async () => {
    const response = await getConnectorDetails('facebook-universal');
    expect(response).toHaveProperty('statusCode', 200);
    expect(() => {
      const connectorDto = JSON.parse(response.body) as ConnectorDto;
      expect(connectorDto.enabled).toBeFalsy();
      expect(connectorDto.config).toEqual({});
    }).not.toThrow();
  });
});
