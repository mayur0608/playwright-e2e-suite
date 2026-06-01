export const TEST_USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

export const EXPECTED_MESSAGES = {
  lockedError: 'Sorry, this user has been locked out.',
  invalidError: 'Username and password do not match any user in this service',
  emptyUsername: 'Username is required',
  emptyPassword: 'Password is required',
};

export const INVENTORY = {
  expectedTitle: 'Products',
  expectedItemCount: 6,
  sortOptions: {
    nameAZ: 'az',
    nameZA: 'za',
    priceLowHigh: 'lohi',
    priceHighLow: 'hilo',
  },
};
