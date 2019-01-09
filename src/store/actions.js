let actions = store => ({
  startLoading: (state) => {
    return { isLoading: true };
  },

  stopLoading: (state) => {
    return { isLoading: false };
  },

  // setup: () => {
  //   return { airtable: new Airtable({apiKey: 'keynEkg9mTCqUEmeS'}).base('appPGJjIg85b7mOdc') };
  // },

  toggleSuggesting: (state) => {
    return { isSuggesting: !state.isSuggesting };
  },

  getSuggestion: (state) => {
    const optionCount = state.currentOptions.length;    
    return { suggested: Math.floor(Math.random() * optionCount) };
  },

  async loadLocations(state) {
    await fetch(`https://whatsforlunch.glitch.me/api/locations`).then((response) => {
      return response.json();
    }).then((records) => {
      store.setState({ workplaces: records, isLoading: false });
    });
  },

  async loadLunchOptions (state, locationName) {
    await fetch(`https://whatsforlunch.glitch.me/api/${locationName}/list`).then((response) => {
      return response.json();
    }).then((records) => {
      store.setState({ currentOptions: records, isLoading: false });
    });
  }
});

export default actions;
