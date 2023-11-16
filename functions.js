//function fetch with async await 
const fetchCountry = async (country) => {
    const url = `https://restcountries.com/v3.1/name/${country}?fields=name,flags,capital,population,languages,borders,latlng`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const [data] = await response.json();
        return data;

    } catch (error) {
        return null;
    }
}

const fetchSearchCountry = async (country) => {
    const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const [data] = await response.json();
        return data;

    } catch (error) {
        return null;
    }
}

const fetchCountryCode = async (country) => {
    const url = `https://restcountries.com/v3.1/alpha/${country}?fields=name,flags,capital,population,languages,borders,latlng`;
    try {
        console.log('url', url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.log("in fetchCountryCode");
        console.error(error); // Use console.error for errors
        return null;
    }
};

const fetchFlags = async (country) => {
    const url=`https://restcountries.com/v3.1/all?fields=name,flags`

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const fetchHome = async () => {
    const url = `https://restcountries.com/v3.1/alpha?codes=IL,USA,TH,FR?fields=flags`

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
export { fetchCountry, fetchFlags, fetchHome, fetchSearchCountry, fetchCountryCode }
