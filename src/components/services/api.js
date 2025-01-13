export const fetchLeagueChampions = async () => {
    const patchVersion = '13.1.1'; // Use the latest patch version
    const url = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion.json`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // Extract champions and select 12 randomly
      const champions = Object.values(data.data);
      const selectedChampions = champions.sort(() => 0.5 - Math.random()).slice(0, 12);
  
      // Format data for your app
      return selectedChampions.map(champion => ({
        id: champion.key,
        name: champion.name,
        image: `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champion.image.full}`,
        title: champion.title
      }));
    } catch (error) {
      console.error('Error fetching League of Legends champions:', error);
      return [];
    }
  };
  