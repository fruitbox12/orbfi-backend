# Orb.fi

### API Endpoints

### User Routes

    GET /api/v1/user/vpa/:vpa
    @return  Object
    @desc    find if the given vpa is available

    GET /api/v1/user/me
    @return  Object
    @desc    Return the current User's Model

    PATCH /api/v1/user/me/
    @return  Object
    @desc    updates the current given user
    @body    { user's model keys }

    GET /api/v1/user/me/transactions
    @return  Object
    @desc    Return the list of user's transactions

    GET /api/v1/user/me/pool
    @return  Object
    @desc    Return the list of user's pool interactions

    GET /api/v1/user/vpa/:vpa
    @return  Object
    @desc    find if the given vpa is available

### Auth Routes

    GET /api/v1/auth/login/getMessage/:address
    @return  nonce
    @desc    returns a unique nonce for given address for authentication

    POST /api/v1/auth/login/:address/:signature
    @return  new User Object
    @desc    create's a new user entry in database

    GET /api/v1/auth/logout
    @return   object, status
    @desc    used to logout the given user

### Transaction Routes

    GET /api/v1/transaction
    @return  Object
    @desc    get all the transaction of all users

    POST /api/v1/transaction
    @return  new Transaction Object
    @desc    creates a  payment Intent in database

    PATCH /api/v1/transaction/:id
    @return  updated transaction
    @desc    updates the existing transaction
    @note    only fromTx, toTx  can be updated
