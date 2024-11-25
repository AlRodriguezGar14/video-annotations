const fetchVideos = async () => {
    const response = await fetch('/api.json');
    const data = await response.json();
    return data.db;
}

export default fetchVideos;
