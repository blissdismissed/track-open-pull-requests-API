const controller = require('../controller');

const getSpy = jest.fn();

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: getSpy,
      };
    },
  };
});

describe('it should test router', () => {
  test('it should test get pulls', () => {
    require('../routes');
    expect(getSpy).toHaveBeenCalledWith('/', controller.fetchPulls);
  });
});