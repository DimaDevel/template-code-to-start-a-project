module.exports = {
  path: [
    {
      url: '/',
      methods: ['GET']
    },
    {
      url: '/auth/signin/refresh/:refreshTokenId',
      methods: ['POST']
    },
    {
      url: '/auth/signup',
      methods: ['POST']
    },
    {
      url: '/auth/signin',
      methods: ['POST']
    },
    {
      url: '/auth/facebook',
      methods: ['POST']
    },
    {
      url: '/auth/google',
      methods: ['POST']
    },
    {
      url: '/auth/apple',
      methods: ['POST']
    },
    {
      url: /^\/auth\/verify-email*/,
      methods: ['GET']
    },
    {
      url: /^\/auth\/forgot-password*/,
      methods: ['GET', 'POST']
    },
    {
      url: '/devices/types',
      methods: ['GET']
    }
  ]
};
