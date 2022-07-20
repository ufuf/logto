import { ConnectorDto } from '@logto/schemas';

import {
  enableConnector,
  getConnectorDetails,
  listConnectors,
  updateConnectorConfig,
} from '@/connector-api';

const facebookConnectorId = 'facebook-universal';

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
    const response = await getConnectorDetails(facebookConnectorId);
    expect(response).toHaveProperty('statusCode', 200);
    expect(() => {
      const connectorDto = JSON.parse(response.body) as ConnectorDto;
      expect(connectorDto.enabled).toBeFalsy();
      expect(connectorDto.config).toEqual({});
    }).not.toThrow();
  });
});

describe('set up connectors', () => {
  describe('set up social connectors', () => {
    it('should succeed to update the social connector config and enable it', async () => {
      const facebookConfig = {
        clientId: 'application_foo',
        clientSecret: 'secret_bar',
      };

      const updatedConfigResponse = await updateConnectorConfig(
        facebookConnectorId,
        facebookConfig
      );
      expect(updatedConfigResponse).toHaveProperty('statusCode', 200);
      expect(() => {
        const updatedConnectorDto = JSON.parse(updatedConfigResponse.body) as ConnectorDto;
        expect(updatedConnectorDto.config).toEqual(facebookConfig);
      }).not.toThrow();

      const enabledResponse = await enableConnector(facebookConnectorId);
      expect(enabledResponse).toHaveProperty('statusCode', 200);
      expect(() => {
        const enabledConnectorDto = JSON.parse(enabledResponse.body) as ConnectorDto;
        expect(enabledConnectorDto.enabled).toBeTruthy();
      }).not.toThrow();
    });
  });

  describe('set up sms connectors', () => {
    // Next up
  });

  describe('set up email connectors', () => {
    // Next up
  });
});
