export default {   
    MINE_SWEEPER_API: {
      URL: `http://${process.env.REACT_APP_HOST}/api/v1/`,
      RESOURCES: {
        AUTH_TOKEN: "auth/token/",
        USER: "users/",
        GAME: "game/"
      }
    }
}