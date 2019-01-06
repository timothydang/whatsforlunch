let actions = store => ({
  startLoading: (state) => {
    return { isLoading: true };
  },

  stopLoading: (state) => {
    return { isLoading: false };
  },

  setup: () => {
    return { airtable: new Airtable({apiKey: 'keynEkg9mTCqUEmeS'}).base('appPGJjIg85b7mOdc') };
  },

  toggleSuggesting: (state) => {
    return { isSuggesting: !state.isSuggesting };
  },

  getSuggestion: (state) => {
    const optionCount = state.currentOptions.length;    
    return { suggested: Math.floor(Math.random() * optionCount) };
  },

  async loadLocations(state) {
    await state.airtable('Locations').select().firstPage((error, records) => {
      store.setState({ workplaces: records, isLoading: false });
    });
  },

  async loadLunchOptions (state, locationName) {
    await state.airtable(locationName).select({
      sort: [{field: "rating", direction: "desc"}],
      filterByFormula: "NOT({active} = '')"
    }).firstPage((error, records) => {
      store.setState({ currentOptions: records, isLoading: false });
    });
  }
});

export default actions;
