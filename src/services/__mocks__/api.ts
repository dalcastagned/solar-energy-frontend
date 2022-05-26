import axios from 'axios';

export type Error = {
  status?: number;
  data?: Record<string, unknown>;
  message?: string;
};

export type HttpResponse<DataType> = {
  data?: DataType;
  error?: Error;
};

const api = jest.genMockFromModule('axios') as jest.MockedFunction<
  typeof axios
>;

api.create = jest.fn(() => api);

export default api;
