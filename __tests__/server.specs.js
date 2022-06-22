const router = require('../routes');

const useSpy = jest.fn();


jest.doMock('express', () => {
  return () => ({
    use: useSpy,
  });
});

describe('it should test the server configuration', () => {
  test('it should run the express server', () => {
    require('../server');
    expect(useSpy).toHaveBeenCalledWith(router);
  });
});