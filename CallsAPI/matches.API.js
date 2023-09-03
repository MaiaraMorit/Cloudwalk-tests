const URL = 'https://gist.githubusercontent.com/cloudwalk-tests/be1b636e58abff14088c8b5309f575d8/raw/df6ef4a9c0b326ce3760233ef24ae8bfa8e33940/qgames.log';

const getMatchesFromAPI = async () => {
  try {
    const log = await fetch(URL)
  const response = await log.text();
  return response;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw new Error('API request failed');
  }
  
};

module.exports = { getMatchesFromAPI };